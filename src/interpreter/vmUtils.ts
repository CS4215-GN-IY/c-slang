import {
  type FunctionSymbolTableEntry,
  type SymbolTable,
  type SymbolTableEntry,
  type SymbolTableEntryPosition
} from './types/virtualMachine';
import {
  type BlockStatement,
  type FunctionDeclaration,
  type Program,
  type VariableDeclaration
} from '../ast/types';
import { getIdentifierName } from './utils';
import { isVariableDeclaration } from '../ast/typeGuards';
import { UndeclaredNameError } from './errors';

export const isFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is FunctionSymbolTableEntry => {
  return entry.nameType === 'Function';
};

export const extendSymbolTable = (
  symbolTable: SymbolTable,
  entries: SymbolTableEntry[]
): SymbolTable => {
  return [...symbolTable, entries];
};

export const getSymbolTableEntryPosition = (
  symbolTable: SymbolTable,
  name: string
): SymbolTableEntryPosition => {
  let frameIdx = symbolTable.length - 1;
  while (frameIdx >= 0) {
    const frame = symbolTable[frameIdx];
    for (let i = 0; i < frame.length; i++) {
      if (frame[i].name === name) {
        return {
          frameIdx,
          entryIdx: i
        };
      }
    }
    frameIdx--;
  }
  throw new UndeclaredNameError();
};

export const getNextSymbolTableOffset = (symbolTable: SymbolTable): number => {
  if (symbolTable.length === 0) {
    return 0;
  }
  const lastFrame = symbolTable[symbolTable.length - 1];
  if (lastFrame.length === 0) {
    return 0;
  }
  return lastFrame[lastFrame.length - 1].offset + 1;
};

export const getSymbolTableEntry = (
  symbolTable: SymbolTable,
  position: SymbolTableEntryPosition
): SymbolTableEntry => {
  return symbolTable[position.frameIdx][position.entryIdx];
};

export const constructProgramSymbolTableEntries = (
  program: Program,
  startingOffset: number
): SymbolTableEntry[] => {
  let offset = startingOffset;
  const allNames: SymbolTableEntry[] = [];
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const name = constructFunctionDeclarationSymbolTableEntry(
          declaration,
          offset
        );
        allNames.push(name);
        break;
      }
      case 'VariableDeclaration': {
        const names = constructVariableDeclarationSymbolTableEntries(
          declaration,
          offset
        );
        allNames.push(...names);
        break;
      }
    }
    offset += 1;
  });
  return allNames;
};

export const constructBlockSymbolTableEntries = (
  block: BlockStatement,
  startingOffset: number
): SymbolTableEntry[] => {
  let offset = startingOffset;
  const allNames: SymbolTableEntry[] = [];
  block.items.forEach((blockItem) => {
    if (isVariableDeclaration(blockItem)) {
      const names = constructVariableDeclarationSymbolTableEntries(
        blockItem,
        offset
      );
      allNames.push(...names);
    }
    offset += 1;
  });
  return allNames;
};

const constructFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration,
  offset: number
): SymbolTableEntry => {
  return {
    name: getIdentifierName(functionDeclaration.id),
    nameType: 'Function',
    offset,
    // TODO: Update this when function declaration parameters are supported.
    numOfParams: 0
  };
};

const constructVariableDeclarationSymbolTableEntries = (
  variableDeclaration: VariableDeclaration,
  startingOffset: number
): SymbolTableEntry[] => {
  let offset = startingOffset;
  const allNames: SymbolTableEntry[] = [];
  variableDeclaration.declarations.forEach((declarator) => {
    allNames.push({
      name: getIdentifierName(declarator.id),
      nameType: 'Variable',
      offset
    });
    offset += 1;
  });
  return allNames;
};
