import { type Node } from '../../ast/types';
import { type SymbolTable } from './symbolTable';
import { type Instr } from './instructions';

export type CompilerMapping = {
  [NodeType in Node['type']]: (
    node: Extract<Node, { type: NodeType }>,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => void;
};
