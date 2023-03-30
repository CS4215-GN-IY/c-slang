import {
  type BlockStatement,
  type FunctionDeclaration,
  type Program,
  type VariableDeclaration
} from '../ast/types';
import {
  type FunctionSymbolTableEntry,
  type SymbolTable,
  type SymbolTableEntry,
  type SymbolTableEntryScope,
  type SymbolTableFrame
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
  isEmptyStatement,
  isForStatement,
  isVariableDeclaration
} from '../ast/typeGuards';
import { Segment } from '../memory/segment';
import { isNotNull, isNotUndefined } from '../utils/typeGuards';
import { getDeclaratorName } from './compilerUtils';

export const addProgramSymbolTableEntries = (
  program: Program,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame = symbolTable.head;
  let offset = getNumOfEntriesInFrame(frame);
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const entry = constructFunctionDeclarationSymbolTableEntry(
          declaration,
          'Global',
          offset
        );
        addToFrame(frame, entry);
        offset += 1;
        break;
      }
      case 'VariableDeclaration': {
        const entries = constructVariableDeclarationSymbolTableEntries(
          declaration,
          'Global',
          offset
        );
        addToFrame(frame, ...entries);
        offset += entries.length;
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
  paramDeclarations: VariableDeclaration[],
  node: FunctionDeclaration,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  // Params offset from below the rbp, start from -2 to leave a space for return address.
  let offset = -2;
  paramDeclarations.forEach((declaration) => {
    const entries = constructVariableDeclarationSymbolTableEntries(
      declaration,
      'Function',
      offset
    );
    addToFrame(frame, ...entries);
    offset -= entries.length;
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
        const entries = constructVariableDeclarationSymbolTableEntries(
          declaration,
          'Function',
          offset
        );
        addToFrame(frame, ...entries);
        offset += entries.length;
      }
    });
  }

  const functionEntry = getFunctionSymbolTableEntry(node.id.name, symbolTable);
  functionEntry.numOfVariables += offset;

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
  let offset = symbolTable.parent.numOfVariables;
  block.items.forEach((item) => {
    const declaration = isVariableDeclaration(item)
      ? item
      : isForStatement(item) &&
        isNotUndefined(item.init) &&
        isVariableDeclaration(item.init)
      ? item.init
      : undefined;
    if (isNotUndefined(declaration)) {
      const entries = constructVariableDeclarationSymbolTableEntries(
        declaration,
        'Block',
        offset
      );
      addToFrame(frame, ...entries);
      offset += entries.length;
    }
  });

  symbolTable.parent.numOfVariables = offset;

  return {
    head: frame,
    tail: symbolTable,
    parent: symbolTable.parent
  };
};

export const getFunctionSymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): FunctionSymbolTableEntry => {
  const functionEntry = getSymbolTableEntry(name, symbolTable);
  if (!isFunctionSymbolTableEntry(functionEntry)) {
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

export const isFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is FunctionSymbolTableEntry => {
  return entry.nameType === 'Function';
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
      throw new RedeclaredNameError(`Tried to redeclare name ${entry.name}`);
    }
    frame[entry.name] = entry;
  });
};

const constructFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration,
  scope: SymbolTableEntryScope,
  offset: number
): SymbolTableEntry => {
  return {
    name: functionDeclaration.id.name,
    nameType: 'Function',
    offset,
    scope,
    // TODO: Update this when function declaration parameters are supported.
    numOfParams: 0,
    numOfVariables: 0
  };
};

const constructVariableDeclarationSymbolTableEntries = (
  variableDeclaration: VariableDeclaration,
  scope: SymbolTableEntryScope,
  startingOffset: number
): SymbolTableEntry[] => {
  let offset = startingOffset;
  const allNames: SymbolTableEntry[] = [];
  variableDeclaration.declarations.forEach((declarator) => {
    allNames.push({
      name: getDeclaratorName(declarator),
      nameType: 'Variable',
      offset,
      scope
    });
    offset += 1;
  });
  return allNames;
};
