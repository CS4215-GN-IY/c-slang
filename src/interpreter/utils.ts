import {
  BaseNode,
  ExternalDeclaration,
  FunctionDeclaration, Identifier,
  VariableDeclaration,
} from "../ast/types";
import {VirtualMemory} from "../memory/virtualMemory";

export const allocateExternalDeclaration = (declarations: ExternalDeclaration[], memory: VirtualMemory): number[] => {
  const allAddresses: number[] = [];
  declarations.forEach((declaration) => {
    switch (declaration.type) {
      case "FunctionDeclaration":
        const address = allocateUninitializedVariable(memory);
        allAddresses.push(address);
        break;
      case "VariableDeclaration":
        const addresses = allocateVariableDeclaration((declaration as VariableDeclaration), memory);
        allAddresses.push(...addresses);
        break;
    }
  });
  return allAddresses;
}

const allocateVariableDeclaration = (variableDeclaration: VariableDeclaration, memory: VirtualMemory): number[] => {
  return variableDeclaration.declarations.map((variable) => allocateUninitializedVariable(memory));
}

const allocateUninitializedVariable = (memory: VirtualMemory): number => {
  const valueWhenUninitialized = 0;
  return memory.stackAllocate(valueWhenUninitialized);
}

export const getExternalDeclarationNames = (declarations: ExternalDeclaration[]): string[] => {
  const allNames: string[] = [];
  declarations.forEach((declaration) => {
    switch (declaration.type) {
      case "FunctionDeclaration":
        const name = getFunctionDeclarationName(declaration as FunctionDeclaration);
        allNames.push(name);
        break;
      case "VariableDeclaration":
        const names = getVariableDeclarationNames(declaration as VariableDeclaration);
        allNames.push(...names);
        break;
    }
  });
  return allNames;
}

export const getFunctionDeclarationName = (functionDeclaration: FunctionDeclaration): string => {
  return getIdentifierName(functionDeclaration.id);
}

export const getVariableDeclarationNames = (variableDeclaration: VariableDeclaration): string[] => {
  return variableDeclaration.declarations.map((declarator) => getIdentifierName(declarator.id));
}

export const getIdentifierName = (identifier: Identifier): string => {
  return identifier.name;
}
