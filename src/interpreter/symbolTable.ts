import {
  type BlockStatement,
  type FunctionDeclaration,
  type ParameterDeclaration,
  type Program,
  type VariableDeclaration
} from '../ast/types';
import {
  type ArraySymbolTableEntry,
  type BuiltInFunctionSymbolTableEntry,
  type FunctionSymbolTableEntry,
  type SymbolTable,
  type SymbolTableEntry,
  type SymbolTableEntryScope,
  type SymbolTableFrame,
  type VariableSymbolTableEntry
} from './types/symbolTable';
import {
  InvalidScopeError,
  RedeclaredNameError,
  TypeError,
  TypeErrorContext,
  UndeclaredNameError,
  UnsupportedDeclarationError
} from './errors';
import {
  isArrayPattern,
  isEmptyStatement,
  isForStatement,
  isParameterDeclaratorDeclaration,
  isVariableDeclaration
} from '../ast/typeGuards';
import { Segment } from '../memory/segment';
import { isNotNull, isNotUndefined } from '../utils/typeGuards';
import {
  getArrayMaxNumOfItems,
  getArrayPatternMultipliers,
  getFixedNumOfEntriesOfDeclaratorPattern,
  getNameFromDeclaratorPattern
} from './compilerUtils';
import { BrokenInvariantError } from '../ast/errors';

export const addProgramSymbolTableEntries = (
  program: Program,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame = symbolTable.head;
  let offset = getNumOfEntriesInFrame(frame);
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        offset = addFunctionDeclarationSymbolTableEntry(
          declaration,
          'Global',
          offset,
          frame
        );
        break;
      }
      case 'VariableDeclaration': {
        offset = addVariableDeclarationSymbolTableEntries(
          declaration,
          'Global',
          offset,
          frame
        );
        break;
      }
      default: {
        throw new UnsupportedDeclarationError();
      }
    }
  });
  return symbolTable;
};

export const addFunctionSymbolTableEntries = (
  node: FunctionDeclaration,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  // The parameters of the current stack frame can be found via an offset of -4
  // from the current rbp. See `stackFunctionCallSetup` for more information.
  let offset = -4;
  node.params.forEach((param) => {
    offset = addParameterDeclarationSymbolTableEntries(
      param,
      'Function',
      offset,
      frame
    );
  });

  offset = 0;
  if (!isEmptyStatement(node.body)) {
    node.body.items.forEach((item) => {
      const declaration = isVariableDeclaration(item)
        ? item
        : isForStatement(item) &&
          isNotUndefined(item.init) &&
          isVariableDeclaration(item.init)
        ? item.init
        : undefined;
      if (isNotUndefined(declaration)) {
        offset = addVariableDeclarationSymbolTableEntries(
          declaration,
          'Function',
          offset,
          frame
        );
      }
    });
  }

  const functionEntry = getFunctionSymbolTableEntry(
    getNameFromDeclaratorPattern(node.id),
    symbolTable
  );
  if (!isFunctionSymbolTableEntry(functionEntry)) {
    throw new BrokenInvariantError(
      'Symbol table entry should always be for a function here.'
    );
  }
  functionEntry.numOfParams = node.params.length;
  functionEntry.numOfEntriesForVariables += offset;

  return {
    head: frame,
    tail: symbolTable,
    parent: functionEntry
  };
};

export const addBlockSymbolTableEntries = (
  block: BlockStatement,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  if (!isNotNull(symbolTable.parent)) {
    throw new InvalidScopeError('Block is not inside a function.');
  }
  let offset = symbolTable.parent.numOfEntriesForVariables;
  block.items.forEach((item) => {
    const declaration = isVariableDeclaration(item)
      ? item
      : isForStatement(item) &&
        isNotUndefined(item.init) &&
        isVariableDeclaration(item.init)
      ? item.init
      : undefined;
    if (isNotUndefined(declaration)) {
      offset = addVariableDeclarationSymbolTableEntries(
        declaration,
        'Block',
        offset,
        frame
      );
    }
  });

  symbolTable.parent.numOfEntriesForVariables = offset;

  return {
    head: frame,
    tail: symbolTable,
    parent: symbolTable.parent
  };
};

export const getArraySymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): ArraySymbolTableEntry => {
  const arrayEntry = getSymbolTableEntry(name, symbolTable);
  if (!isArraySymbolTableEntry(arrayEntry)) {
    throw new TypeError('array', arrayEntry.nameType, TypeErrorContext.NAME);
  }
  return arrayEntry;
};

export const getFunctionSymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): FunctionSymbolTableEntry | BuiltInFunctionSymbolTableEntry => {
  const functionEntry = getSymbolTableEntry(name, symbolTable);
  if (
    !(
      isFunctionSymbolTableEntry(functionEntry) ||
      isBuiltinFunctionSymbolTableEntry(functionEntry)
    )
  ) {
    throw new TypeError(
      'function',
      functionEntry.nameType,
      TypeErrorContext.NAME
    );
  }
  return functionEntry;
};

export const getSymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): SymbolTableEntry => {
  let currentTable: SymbolTable | null = symbolTable;

  while (currentTable !== null) {
    const frame = currentTable.head;
    if (name in frame) {
      return frame[name];
    }
    currentTable = currentTable.tail;
  }

  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

export const getSymbolTableEntryInFrame = (
  name: string,
  frame: SymbolTableFrame
): SymbolTableEntry => {
  if (name in frame) {
    return frame[name];
  }
  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

export const getSegmentScope = (scope: SymbolTableEntryScope): Segment => {
  switch (scope) {
    case 'Block':
      return Segment.STACK;
    case 'Function':
      return Segment.STACK;
    case 'Global':
      return Segment.DATA;
    default:
      throw new InvalidScopeError('Encountered an invalid symbol table scope.');
  }
};

export const isArraySymbolTableEntry = (
  entry: SymbolTableEntry
): entry is ArraySymbolTableEntry => {
  return entry.nameType === 'Array';
};

export const isFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is FunctionSymbolTableEntry => {
  return entry.nameType === 'Function';
};

export const isBuiltinFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is BuiltInFunctionSymbolTableEntry => {
  return entry.nameType === 'BuiltInFunction';
};

export const isVariableSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is VariableSymbolTableEntry => {
  return entry.nameType === 'Variable';
};

export const getNumOfEntriesInFrame = (frame: SymbolTableFrame): number => {
  return Object.keys(frame).length;
};

const addToFrame = (
  frame: SymbolTableFrame,
  ...entries: SymbolTableEntry[]
): void => {
  entries.forEach((entry) => {
    if (entry.name in frame) {
      throw new RedeclaredNameError(`Tried to redeclare name '${entry.name}'`);
    }
    frame[entry.name] = entry;
  });
};

const addFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration,
  scope: SymbolTableEntryScope,
  offset: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  const entry: SymbolTableEntry = {
    name: getNameFromDeclaratorPattern(functionDeclaration.id),
    nameType: 'Function',
    offset,
    scope,
    // TODO: Update this when function declaration parameters are supported.
    numOfParams: 0,
    numOfEntriesForVariables: 0
  };
  offset += getFixedNumOfEntriesOfDeclaratorPattern(functionDeclaration.id);
  addToFrame(symbolTableFrame, entry);
  return offset;
};

const addVariableDeclarationSymbolTableEntries = (
  variableDeclaration: VariableDeclaration,
  scope: SymbolTableEntryScope,
  startingOffset: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  let offset = startingOffset;
  variableDeclaration.declarations.forEach((declarator) => {
    let entry: ArraySymbolTableEntry | VariableSymbolTableEntry;
    if (isArrayPattern(declarator.pattern)) {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Array',
        offset,
        scope,
        multipliers: getArrayPatternMultipliers(declarator.pattern),
        maxNumOfItems: getArrayMaxNumOfItems(declarator.pattern)
      };
    } else {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Variable',
        offset,
        scope
      };
    }
    offset += getFixedNumOfEntriesOfDeclaratorPattern(declarator.pattern);
    addToFrame(symbolTableFrame, entry);
  });
  return offset;
};

const addParameterDeclarationSymbolTableEntries = (
  parameterDeclaration: ParameterDeclaration,
  scope: SymbolTableEntryScope,
  startingOffset: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  let offset = startingOffset;
  let entry: SymbolTableEntry;
  if (isParameterDeclaratorDeclaration(parameterDeclaration)) {
    const declaratorPattern = parameterDeclaration.declarator;
    if (isArrayPattern(declaratorPattern)) {
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Array',
        offset,
        scope,
        multipliers: getArrayPatternMultipliers(declaratorPattern),
        maxNumOfItems: getArrayMaxNumOfItems(declaratorPattern)
      };
    } else {
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Variable',
        offset,
        scope
      };
    }
    offset -= getFixedNumOfEntriesOfDeclaratorPattern(declaratorPattern);
  } else {
    // TODO: Handle ParameterAbstractDeclaratorDeclaration.
    throw new Error(
      'Handling of ParameterAbstractDeclaratorDeclaration not implemented yet.'
    );
  }
  addToFrame(symbolTableFrame, entry);
  return offset;
};
