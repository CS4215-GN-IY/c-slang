import {
  type BlockStatement,
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type VariableDeclaration
} from '../ast/types';
import {
  type Closure,
  type NameAddressMapping,
  type NameValueMapping,
  type SymbolTable
} from './types/interpreter';
import { type Value } from './types/evaluationResults';
import { isConstant, isVariableDeclaration } from '../ast/typeGuards';
import { InvalidFunctionApplication } from './errors';
import { type Memory } from '../memory/memory';

const allocateUninitializedVariable = (memory: Memory): number => {
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
  names: string[],
  memory: Memory
): NameAddressMapping[] => {
  const nameAddressMapping: NameAddressMapping[] = names.map((name) => ({
    name,
    address: allocateUninitializedVariable(memory)
  }));
  return nameAddressMapping;
};

export const getBlockVariableDeclarationNames = (
  block: BlockStatement
): string[] => {
  const allNames: string[] = [];
  block.items.forEach((blockItem) => {
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
  environment: SymbolTable
): Closure => {
  return {
    // TODO: Change this when parameter list is supported
    params: [],
    body: functionDeclaration.body,
    environment
  };
};

// Arguments should either be an integer constant, floating constant, character constant or identifier.
export const setParamArgs = (
  params: Identifier[],
  args: Value[]
): NameValueMapping[] => {
  if (params.length !== args.length) {
    throw new InvalidFunctionApplication(
      `Function takes in ${params.length} arguments but ${args.length} arguments were passed in`
    );
  }

  const nameValueMappings: NameValueMapping[] = [];
  for (let i = 0; i < params.length; i++) {
    const arg = args[i];
    if (isConstant(arg) && !isNaN(Number(arg.value))) {
      nameValueMappings.push({
        name: params[i].name,
        value: Number(arg.value)
      });
      continue;
    }
    // TODO: Add support for character and address later
    throw new InvalidFunctionApplication(`Encountered an unhandled argument.`);
  }
  return nameValueMappings;
};
