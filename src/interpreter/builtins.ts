import { type SymbolTableFrame } from './types/symbolTable';
import {
  BUILTIN,
  constructAddressDataType,
  FLOAT64
} from '../ast/types/dataTypes';
import { type VirtualMemory } from '../memory/virtualMemory';
import {
  constructValueWithDataType,
  isValueWithDataType
} from './virtualMachineUtils';

export const getBuiltInFunctions = (
  memory: VirtualMemory
): Record<string, (...args: any[]) => any> => {
  return {
    free: (address: number) => {
      if (isValueWithDataType(address)) {
        memory.heapFree(address.value);
        return;
      }
      memory.heapFree(address);
    },
    malloc: (sizeInBytes: number) =>
      constructValueWithDataType(
        memory.heapAllocate(sizeInBytes),
        constructAddressDataType(FLOAT64)
      ),
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
