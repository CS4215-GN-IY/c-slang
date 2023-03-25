import {
  type BlockOrEmptyStatement,
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
import { getIdentifierName } from './utils';
import {
  UnhandledScopeError,
  RedeclaredNameError,
  UndeclaredNameError,
  UnhandledDeclarationError
} from './errors';
import { isEmptyStatement, isVariableDeclaration } from '../ast/typeGuards';
import { type NameScope } from './types/vmInstruction';

export const addProgramSymbolTableEntries = (
  program: Program,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame = symbolTable.head;
  let offset = findLastOffset(frame) + 1;
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
        throw new UnhandledDeclarationError();
      }
    }
  });
  return symbolTable;
};

export const addFunctionSymbolTableEntries = (
  paramDeclarations: VariableDeclaration[],
  body: BlockOrEmptyStatement,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  let offset = 0;
  const bodyDeclarations = !isEmptyStatement(body)
    ? body.items.filter((item): item is VariableDeclaration =>
        isVariableDeclaration(item)
      )
    : [];
  const declarations = [...paramDeclarations, ...bodyDeclarations];
  declarations.forEach((declaration) => {
    const entries = constructVariableDeclarationSymbolTableEntries(
      declaration,
      'Function',
      offset
    );
    addToFrame(frame, ...entries);
    offset += entries.length;
  });
  return {
    head: frame,
    tail: symbolTable
  };
};

export const addBlockSymbolTableEntries = (
  block: BlockStatement,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  let offset = findLastOffset(symbolTable.head) + 1;
  const declarations = block.items.filter((item): item is VariableDeclaration =>
    isVariableDeclaration(item)
  );
  declarations.forEach((declaration) => {
    const entries = constructVariableDeclarationSymbolTableEntries(
      declaration,
      'Block',
      offset
    );
    addToFrame(frame, ...entries);
    offset += entries.length;
  });
  return {
    head: frame,
    tail: symbolTable
  };
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

export const convertToNameScope = (scope: SymbolTableEntryScope): NameScope => {
  switch (scope) {
    case 'Block':
      return 'Stack';
    case 'Function':
      return 'Stack';
    case 'Global':
      // TODO: Replace with data scope when allocation to data segment is supported
      return 'Stack';
    default:
      throw new UnhandledScopeError('Encountered an invalid scope.');
  }
};

export const isFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is FunctionSymbolTableEntry => {
  return entry.nameType === 'Function';
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

// TODO: Make this more efficient. This is low priority.
const findLastOffset = (frame: SymbolTableFrame): number => {
  let lastOffset = -1;
  Object.values(frame).forEach((entry) => {
    lastOffset = Math.max(entry.offset, lastOffset);
  });
  return lastOffset;
};

const constructFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration,
  scope: SymbolTableEntryScope,
  offset: number
): SymbolTableEntry => {
  return {
    name: getIdentifierName(functionDeclaration.id),
    nameType: 'Function',
    offset,
    scope,
    // TODO: Update this when function declaration parameters are supported.
    numOfParams: 0
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
      name: getIdentifierName(declarator.id),
      nameType: 'Variable',
      offset,
      scope
    });
    offset += 1;
  });
  return allNames;
};
