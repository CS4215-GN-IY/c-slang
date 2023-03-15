import {
  type BlockStatement,
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type VariableDeclaration
} from '../ast/types';
import { type VirtualMemory } from '../memory/virtualMemory';
import { type Closure, type Environment } from './types/interpreter';
import { type Value } from './types/evaluationResults';
import { isConstant, isVariableDeclaration } from '../ast/typeGuards';
import { InvalidFunctionApplication } from './errors';

const allocateUninitializedVariable = (memory: VirtualMemory): number => {
  const valueWhenUninitialized = 0;
  return memory.stackAllocate(valueWhenUninitialized);
};

export const getExternalDeclarationNames = (
  declarations: ExternalDeclaration[]
): string[] => {
  const allNames: string[] = [];
  declarations.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const name = getFunctionDeclarationName(declaration);
        allNames.push(name);
        break;
      }
      case 'VariableDeclaration': {
        const names = getVariableDeclarationNames(declaration);
        allNames.push(...names);
        break;
      }
    }
  });
  return allNames;
};

export const getFunctionDeclarationName = (
  functionDeclaration: FunctionDeclaration
): string => {
  return getIdentifierName(functionDeclaration.id);
};

export const allocateStackAddresses = (
  numOfVariables: number,
  memory: VirtualMemory
): number[] => {
  const addresses: number[] = [];
  for (let i = 0; i < numOfVariables; i++) {
    addresses.push(allocateUninitializedVariable(memory));
  }
  return addresses;
};

export const getBlockVariableDeclarationNames = (
  block: BlockStatement
): string[] => {
  const allNames: string[] = [];
  block.body.forEach((blockItem) => {
    if (isVariableDeclaration(blockItem)) {
      const names = getVariableDeclarationNames(blockItem);
      allNames.push(...names);
    }
  });
  return allNames;
};

export const getVariableDeclarationNames = (
  variableDeclaration: VariableDeclaration
): string[] => {
  return variableDeclaration.declarations.map((declarator) =>
    getIdentifierName(declarator.id)
  );
};

export const getIdentifierName = (identifier: Identifier): string => {
  return identifier.name;
};

export const constructClosure = (
  functionDeclaration: FunctionDeclaration,
  environment: Environment
): Closure => {
  return {
    // TODO: Change this when parameter list is supported
    params: [],
    body: functionDeclaration.body,
    environment
  };
};

// Arguments should either be an integer constant, floating constant, character constant or identifier.
export const getArgNumbers = (args: Value[]): number[] => {
  const numbers: number[] = args.map((arg) => {
    if (isConstant(arg) && !isNaN(Number(arg.value))) {
      return Number(arg.value);
    }
    // TODO: Add support for character and address later
    throw new InvalidFunctionApplication(`Encountered an unhandled argument.`);
  });
  return numbers;
};
