import { type Instr } from './vmInstruction';
import { type Memory } from '../../memory/memory';
import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import { type SymbolTableEntry } from './symbolTable';

export type EvaluatorMapping = {
  [InstrType in Instr['type']]: (
    command: Extract<Instr, { type: InstrType }>,
    state: EvaluatorState
  ) => void;
};

export interface EvaluatorState {
  memory: Memory;
  pc: number;
  stash: Stack<Value>;
  symbolTable: SymbolTableEntry[][];
}
