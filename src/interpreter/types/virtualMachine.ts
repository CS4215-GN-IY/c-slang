import { type Memory } from '../../memory/memory';
import { type Node } from '../../ast/types';
import { type SymbolTable } from '../symbolTable';

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
