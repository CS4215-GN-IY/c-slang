import { type Node } from '../../ast/types';
import { type SymbolTable } from './symbolTable';
import { type Instr } from './instruction';

export type CompilerMapping = {
  [NodeType in Node['type']]: (
    node: Extract<Node, { type: NodeType }>,
    state: CompilerState
  ) => void;
};

export interface CompilerState {
  instructions: Instr[];
  symbolTable: SymbolTable;
}
