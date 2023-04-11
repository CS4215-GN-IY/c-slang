import { type DataType } from '../../ast/types/dataTypes';

export interface SymbolTable {
  head: SymbolTableFrame;
  tail: SymbolTable | null;
  parent: UserDeclaredFunctionSymbolTableEntry | null;
}

export type SymbolTableFrame = Record<string, SymbolTableEntry>;
export type SymbolTableEntry =
  | SymbolTableEntryWithAddress
  | BuiltInFunctionSymbolTableEntry;
export type SymbolTableEntryWithAddress =
  | ArraySymbolTableEntry
  | UserDeclaredFunctionSymbolTableEntry
  | VariableSymbolTableEntry;
export type SymbolTableEntryScope = 'Block' | 'Function' | 'Global';

export interface BaseSymbolTableEntry {
  // The nameType property allows us to
  // make use of TypeScript's discriminated unions.
  nameType: string;
  name: string;
}

export interface BaseSymbolTableEntryWithAddress extends BaseSymbolTableEntry {
  offset: number;
  scope: SymbolTableEntryScope;
}

export interface ArraySymbolTableEntry extends BaseSymbolTableEntryWithAddress {
  nameType: 'Array';
  dataType: DataType;
  multipliers: number[];
  maxNumOfItems: number;
}

export interface UserDeclaredFunctionSymbolTableEntry
  extends BaseSymbolTableEntryWithAddress {
  nameType: 'UserDeclaredFunction';
  returnDataType: DataType;
  numOfParams: number;
  numOfEntriesForVariables: number;
}

export interface BuiltInFunctionSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'BuiltInFunction';
  numOfParams: number;
}

export interface VariableSymbolTableEntry
  extends BaseSymbolTableEntryWithAddress {
  nameType: 'Variable';
  dataType: DataType;
}

export type LabelFrame = Record<string, LabelEntry>;

export interface LabelEntry {
  name: string;
  instrAddress: number;
}
