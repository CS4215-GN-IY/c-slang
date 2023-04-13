import {
  type BlockStatement,
  type FunctionDeclaration,
  type ParameterDeclaration,
  type Program,
  type Declaration
} from '../ast/types/ast';
import {
  type ArraySymbolTableEntry,
  type BuiltInFunctionSymbolTableEntry,
  type UserDeclaredFunctionSymbolTableEntry,
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
  isDeclaration
} from '../ast/types/typeGuards';
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
  let offsetInBytes = getFrameSize(frame);
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        offsetInBytes = addFunctionDeclarationSymbolTableEntry(
          declaration,
          'Global',
          offsetInBytes,
          frame
        );
        break;
      }
      case 'Declaration': {
        offsetInBytes = addDeclarationSymbolTableEntries(
          declaration,
          'Global',
          offsetInBytes,
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
  let offsetInBytes = -4;
  node.params.forEach((param) => {
    offsetInBytes = addParameterDeclarationSymbolTableEntries(
      param,
      'Function',
      offsetInBytes,
      frame
    );
  });

  offsetInBytes = 0;
  if (!isEmptyStatement(node.body)) {
    node.body.items.forEach((item) => {
      const declaration = isDeclaration(item)
        ? item
        : isForStatement(item) &&
          isNotUndefined(item.init) &&
          isDeclaration(item.init)
        ? item.init
        : undefined;
      if (isNotUndefined(declaration)) {
        offsetInBytes = addDeclarationSymbolTableEntries(
          declaration,
          'Function',
          offsetInBytes,
          frame
        );
      }
    });
  }

  const functionEntry = getFunctionSymbolTableEntry(
    getNameFromDeclaratorPattern(node.id),
    symbolTable
  );
  if (!isUserDeclaredFunctionSymbolTableEntry(functionEntry)) {
    throw new BrokenInvariantError(
      'Symbol table entry should always be for a user-declared function here.'
    );
  }
  functionEntry.sizeOfEntriesInBytes += offsetInBytes;

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
  let offsetInBytes = symbolTable.parent.sizeOfEntriesInBytes;
  block.items.forEach((item) => {
    const declaration = isDeclaration(item)
      ? item
      : isForStatement(item) &&
        isNotUndefined(item.init) &&
        isDeclaration(item.init)
      ? item.init
      : undefined;
    if (isNotUndefined(declaration)) {
      offsetInBytes = addDeclarationSymbolTableEntries(
        declaration,
        'Block',
        offsetInBytes,
        frame
      );
    }
  });

  symbolTable.parent.sizeOfEntriesInBytes = offsetInBytes;

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
): UserDeclaredFunctionSymbolTableEntry | BuiltInFunctionSymbolTableEntry => {
  const functionEntry = getSymbolTableEntry(name, symbolTable);
  if (
    !(
      isUserDeclaredFunctionSymbolTableEntry(functionEntry) ||
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

export const isUserDeclaredFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is UserDeclaredFunctionSymbolTableEntry => {
  return entry.nameType === 'UserDeclaredFunction';
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

export const getFrameSize = (frame: SymbolTableFrame): number => {
  let sizeInBytes = 0;
  for (const entry of Object.values(frame)) {
    if (isBuiltinFunctionSymbolTableEntry(entry)) {
      continue;
    }
    if (isUserDeclaredFunctionSymbolTableEntry(entry)) {
      sizeInBytes += entry.sizeOfEntriesInBytes;
      continue;
    }
    sizeInBytes += entry.dataType.sizeInBytes;
  }
  return sizeInBytes;
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
  offsetInBytes: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  const entry: UserDeclaredFunctionSymbolTableEntry = {
    nameType: 'UserDeclaredFunction',
    name: getNameFromDeclaratorPattern(functionDeclaration.id),
    returnDataType: functionDeclaration.returnDataType,
    offsetInBytes,
    scope,
    numOfParams: functionDeclaration.params.length,
    sizeOfEntriesInBytes: 0
  };
  offsetInBytes += getFixedNumOfEntriesOfDeclaratorPattern(
    functionDeclaration.returnDataType,
    functionDeclaration.id
  );
  addToFrame(symbolTableFrame, entry);
  return offsetInBytes;
};

const addDeclarationSymbolTableEntries = (
  declaration: Declaration,
  scope: SymbolTableEntryScope,
  startingOffsetInBytes: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  let offsetInBytes = startingOffsetInBytes;
  declaration.declarations.forEach((declarator) => {
    let entry: ArraySymbolTableEntry | VariableSymbolTableEntry;
    if (isArrayPattern(declarator.pattern)) {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Array',
        dataType: declaration.dataType,
        offsetInBytes,
        scope,
        multipliers: getArrayPatternMultipliers(declarator.pattern),
        maxNumOfItems: getArrayMaxNumOfItems(declarator.pattern)
      };
    } else {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Variable',
        dataType: declaration.dataType,
        offsetInBytes,
        scope
      };
    }
    offsetInBytes += getFixedNumOfEntriesOfDeclaratorPattern(
      declaration.dataType,
      declarator.pattern
    );
    addToFrame(symbolTableFrame, entry);
  });
  return offsetInBytes;
};

const addParameterDeclarationSymbolTableEntries = (
  parameterDeclaration: ParameterDeclaration,
  scope: SymbolTableEntryScope,
  startingOffsetInBytes: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  let offsetInBytes = startingOffsetInBytes;
  let entry: SymbolTableEntry;
  if (isParameterDeclaratorDeclaration(parameterDeclaration)) {
    const declaratorPattern = parameterDeclaration.declarator;
    if (isArrayPattern(declaratorPattern)) {
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Array',
        dataType: parameterDeclaration.dataType,
        offsetInBytes,
        scope,
        multipliers: getArrayPatternMultipliers(declaratorPattern),
        maxNumOfItems: getArrayMaxNumOfItems(declaratorPattern)
      };
    } else {
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Variable',
        dataType: parameterDeclaration.dataType,
        offsetInBytes,
        scope
      };
    }
    offsetInBytes -= getFixedNumOfEntriesOfDeclaratorPattern(
      parameterDeclaration.dataType,
      declaratorPattern
    );
  } else {
    // TODO: Handle ParameterAbstractDeclaratorDeclaration.
    throw new Error(
      'Handling of ParameterAbstractDeclaratorDeclaration not implemented yet.'
    );
  }
  addToFrame(symbolTableFrame, entry);
  return offsetInBytes;
};
