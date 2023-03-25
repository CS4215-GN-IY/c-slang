export interface SymbolTable {
  head: SymbolTableFrame;
  tail: SymbolTable | null;
  parent: FunctionSymbolTableEntry | null;
}

export type SymbolTableFrame = Record<string, SymbolTableEntry>;
export type SymbolTableEntry =
  | FunctionSymbolTableEntry
  | VariableSymbolTableEntry;
export type SymbolTableEntryScope = 'Block' | 'Function' | 'Global';

export interface BaseSymbolTableEntry {
  name: string;
  nameType: string;
  offset: number;
  scope: SymbolTableEntryScope;
}

export interface FunctionSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Function';
  numOfParams: number;
  numOfVariables: number;
}

interface VariableSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Variable';
}
