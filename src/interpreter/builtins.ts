import { type SymbolTableFrame } from './types/symbolTable';

export const BUILT_INS: Record<string, any> = {
  sqrt: (x: number) => Math.sqrt(x)
};

export const getBuiltInSymbols = (): SymbolTableFrame => {
  return {
    sqrt: {
      nameType: 'BuiltInFunction',
      name: 'sqrt',
      numOfParams: 1
    }
  };
};
