import { type Instr } from './instruction';
import { type Memory } from '../../memory/memory';
import { type Stack } from '../../utils/stack';

export type EvaluatorMapping = {
  [InstrType in Instr['type']]: (
    command: Extract<Instr, { type: InstrType }>,
    state: EvaluatorState
  ) => void;
};

export interface EvaluatorState {
  memory: Memory;
  stash: Stack<Value>;
}

export type Value = any;

export interface Finished {
  status: 'finished';
  value: Value;
}

export interface Error {
  status: 'error';
}

export type Result = Finished | Error;
