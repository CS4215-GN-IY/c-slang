import { type Memory } from '../../memory/memory';
import { type Node } from '../../ast/types';

export type CompilerMapping = {
  [NodeType in Node['type']]: (
    node: Extract<Node, { type: NodeType }>,
    state: CompilerState
  ) => void;
};

export interface CompilerState {
  memory: Memory;
  symbolTable: SymbolTable;
}

export type SymbolTable = SymbolTableEntry[][];

interface BaseSymbolTableEntry {
  name: string;
  nameType: string;
  // Represents the offset of the variable within a stack frame.
  // Store this for easy access, because calculation can be difficult
  // when there are blocks inside functions.
  offset: number;
}

export type SymbolTableEntry =
  | FunctionSymbolTableEntry
  | VariableSymbolTableEntry;

export interface FunctionSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Function';
  numOfParams: number;
}

export interface VariableSymbolTableEntry extends BaseSymbolTableEntry {
  nameType: 'Variable';
}

export interface SymbolTableEntryPosition {
  frameIdx: number;
  entryIdx: number;
}
