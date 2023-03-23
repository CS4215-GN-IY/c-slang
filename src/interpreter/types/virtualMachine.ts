import { type Memory } from '../../memory/memory';
import { type Node } from '../../ast/types';

export type CompilerMapping = {
  [NodeType in Node['type']]: (
    node: Extract<Node, { type: NodeType }>,
    state: CompilerState
  ) => void;
};

export interface CompilerState {
  symbolTable: SymbolTableEntry[][];
  memory: Memory;
}

export interface SymbolTableEntry {
  name: string;
  nameType: 'Function' | 'Variable';
}

export interface SymbolTableEntryPosition {
  frameIdx: number;
  entryIdx: number;
}
