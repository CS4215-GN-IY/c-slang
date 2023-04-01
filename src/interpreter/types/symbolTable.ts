export interface SymbolTable {
  head: SymbolTableFrame;
  tail: SymbolTable | null;
  parent: FunctionSymbolTableEntry | null;
}

export type SymbolTableFrame = Record<string, SymbolTableEntry>;
export type SymbolTableEntry =
  | ArraySymbolTableEntry
  | FunctionSymbolTableEntry
  | VariableSymbolTableEntry;
export type SymbolTableEntryScope = 'Block' | 'Function' | 'Global';

export interface BaseSymbolTableEntry {
  // The nameType property allows us to
  // make use of TypeScript's discriminated unions.
  nameType: string;
  name: string;
  offset: number;
  scope: SymbolTableEntryScope;
}

export interface ArraySymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Array';
  multipliers: number[];
  numOfDimensions: number;
}

export interface FunctionSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Function';
  numOfParams: number;
  numOfEntriesForVariables: number;
}

interface VariableSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Variable';
}

export type LabelFrame = Record<string, LabelEntry>;

export interface LabelEntry {
  name: string;
  instrAddress: number;
}
