import { type SymbolTableFrame } from './types/symbolTable';
import { BUILTIN } from '../ast/types/dataTypes';
import { type VirtualMemory } from '../memory/virtualMemory';

export const getBuiltInFunctions = (
  memory: VirtualMemory
): Record<string, (...args: any[]) => any> => {
  return {
    free: (address: number) => {
      memory.heapFree(address);
    },
    malloc: (sizeInBytes: number) => memory.heapAllocate(sizeInBytes),
    sqrt: (x: number) => Math.sqrt(x)
  };
};

export const getBuiltInSymbols = (): SymbolTableFrame => {
  return {
    free: {
      nameType: 'BuiltInFunction',
      name: 'free',
      numOfParams: 1,
      dataType: BUILTIN
    },
    malloc: {
      nameType: 'BuiltInFunction',
      name: 'malloc',
      numOfParams: 1,
      dataType: BUILTIN
    },
    sqrt: {
      nameType: 'BuiltInFunction',
      name: 'sqrt',
      numOfParams: 1,
      dataType: BUILTIN
    }
  };
};
