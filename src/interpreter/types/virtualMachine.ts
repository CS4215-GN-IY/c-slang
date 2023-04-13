import { type Instr } from './instructions';
import { type Stack } from '../../utils/stack';
import { type VirtualMemory } from '../../memory/virtualMemory';
import { type Registers } from '../../memory/registers';
import { type DataType } from '../../ast/types/dataTypes';

export type VirtualMachineMapping = {
  [InstrType in Instr['type']]: (
    command: Extract<Instr, { type: InstrType }>,
    state: VirtualMachineState
  ) => void;
};

export interface VirtualMachineState {
  memory: VirtualMemory;
  registers: Registers;
  stash: Stack<Value>;
}

export type Value = any;

export interface ValueWithDataType {
  value: Value;
  dataType: DataType;
}
