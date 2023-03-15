import {
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type VariableDeclaration
} from '../ast/types';
import { type VirtualMemory } from '../memory/virtualMemory';
import { type Closure, type Environment } from './types/interpreter';
import { type Value } from './types/evaluationResults';
import { isConstant } from '../ast/typeGuards';
import { InvalidFunctionApplication } from './errors';

export const allocateExternalDeclaration = (
  declarations: ExternalDeclaration[],
  memory: VirtualMemory
): number[] => {
  const allAddresses: number[] = [];
  declarations.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const address = allocateUninitializedVariable(memory);
        allAddresses.push(address);
        break;
      }
      case 'VariableDeclaration': {
        const addresses = allocateVariableDeclaration(declaration, memory);
        allAddresses.push(...addresses);
        break;
      }
    }
  });
  return allAddresses;
};

const allocateVariableDeclaration = (
  variableDeclaration: VariableDeclaration,
  memory: VirtualMemory
): number[] => {
  return variableDeclaration.declarations.map((variable) =>
    allocateUninitializedVariable(memory)
  );
};

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
