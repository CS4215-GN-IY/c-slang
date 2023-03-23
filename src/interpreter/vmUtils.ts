import {
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

export const extendSymbolTable = (
  symbolTable: SymbolTableEntry[][],
  entries: SymbolTableEntry[]
): SymbolTableEntry[][] => {
  return [...symbolTable, entries];
};

export const getSymbolTableEntryPosition = (
  symbolTable: SymbolTableEntry[][],
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

export const getProgramSymbolTableEntries = (
  program: Program
): SymbolTableEntry[] => {
  const allNames: SymbolTableEntry[] = [];
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const name = getFunctionDeclarationSymbolTableEntry(declaration);
        allNames.push(name);
        break;
      }
      case 'VariableDeclaration': {
        const names = getVariableDeclarationSymbolTableEntries(declaration);
        allNames.push(...names);
        break;
      }
    }
  });
  return allNames;
};

export const getBlockSymbolTableEntries = (
  block: BlockStatement
): SymbolTableEntry[] => {
  const allNames: SymbolTableEntry[] = [];
  block.items.forEach((blockItem) => {
    if (isVariableDeclaration(blockItem)) {
      const names = getVariableDeclarationSymbolTableEntries(blockItem);
      allNames.push(...names);
    }
  });
  return allNames;
};

const getFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration
): SymbolTableEntry => {
  return {
    name: getIdentifierName(functionDeclaration.id),
    nameType: 'Function'
  };
};

const getVariableDeclarationSymbolTableEntries = (
  variableDeclaration: VariableDeclaration
): SymbolTableEntry[] => {
  return variableDeclaration.declarations.map((declarator) => ({
    name: getIdentifierName(declarator.id),
    nameType: 'Variable'
  }));
};
