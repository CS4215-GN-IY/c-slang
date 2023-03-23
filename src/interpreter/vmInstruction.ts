import {
  type AssignInstr,
  type DoneInstr,
  type ExitFunctionInstr,
  type GotoInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type SetupBlockInstr,
  type TeardownBlockInstr
} from './types/vmInstruction';
import { type SymbolTableEntryPosition } from './types/virtualMachine';
import { type Value } from './types/evaluationResults';

export const PLACEHOLDER_ADDRESS = -1;

export const constructAssignInstr = (
  position: SymbolTableEntryPosition
): AssignInstr => ({
  type: 'Assign',
  symbolTableEntryPosition: position
});

export const constructDoneInstr = (): DoneInstr => ({
  type: 'Done'
});

export const constructExitFunctionInstr = (): ExitFunctionInstr => ({
  type: 'ExitFunctionInstr'
});

export const constructGotoInstr = (instrAddress: number): GotoInstr => ({
  type: 'Goto',
  instrAddress
});

export const constructLoadConstantInstr = (
  value: Value
): LoadConstantInstr => ({
  type: 'LoadConstant',
  value
});

export const constructLoadFunctionInstr = (
  functionInstrAddress: number
): LoadFunctionInstr => ({
  type: 'LoadFunction',
  functionInstrAddress
});

export const constructSetupBlockInstr = (
  numOfVariables: number
): SetupBlockInstr => ({
  type: 'SetupBlock',
  numOfVariables
});

export const constructTeardownBlockInstr = (): TeardownBlockInstr => ({
  type: 'TeardownBlock'
});
