import { type Instr } from './instructions';
import { type Memory } from '../../memory/memory';
import { type Stack } from '../../utils/stack';
import { type DataType } from '../../ast/types/dataTypes';

export type VirtualMachineMapping = {
  [InstrType in Instr['type']]: (
    command: Extract<Instr, { type: InstrType }>,
    state: VirtualMachineState
  ) => void;
};

export interface VirtualMachineState {
  memory: Memory;
  stash: Stack<Value>;
}

export type Value = any;

export interface ValueWithDataType {
  value: Value;
  dataType: DataType;
}
