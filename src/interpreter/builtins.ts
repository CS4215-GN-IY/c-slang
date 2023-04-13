import { type SymbolTableFrame } from './types/symbolTable';
import { BUILTIN } from '../ast/types/dataTypes';

export const BUILT_INS: Record<string, any> = {
  sqrt: (x: number) => Math.sqrt(x)
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
