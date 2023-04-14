import { type SymbolTableFrame } from './types/symbolTable';
import { BUILTIN } from '../ast/types/dataTypes';
import { type VirtualMemory } from '../memory/virtualMemory';

export const getBuiltInFunctions = (
  memory: VirtualMemory
): Record<string, (...args: any[]) => any> => {
  return {
    sqrt: (x: number) => Math.sqrt(x)
  };
};

export const getBuiltInSymbols = (): SymbolTableFrame => {
  return {
    sqrt: {
      nameType: 'BuiltInFunction',
      name: 'sqrt',
      numOfParams: 1,
      dataType: BUILTIN
    }
  };
};
