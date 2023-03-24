import {
  type AssignInstr,
  type CallInstr,
  type DoneInstr,
  type TeardownInstr,
  type GotoInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type ExitFunctionInstr
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

export const constructCallInstr = (numOfArgs: number): CallInstr => ({
  type: 'Call',
  numOfArgs
});

export const constructDoneInstr = (): DoneInstr => ({
  type: 'Done'
});

export const constructExitFunctionInstr = (): ExitFunctionInstr => ({
  type: 'ExitFunction'
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

export const constructLoadSymbolInstr = (
  symbolTableEntryPosition: SymbolTableEntryPosition
): LoadSymbolInstr => ({
  type: 'LoadSymbol',
  symbolTableEntryPosition
});

export const constructTeardownInstr = (
  returnAddressOffset: number
): TeardownInstr => ({
  type: 'Teardown',
  returnAddressOffset
});
