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
import { type Value } from './types/evaluationResults';
import { type SymbolTableEntry } from './types/symbolTable';
import { convertToNameScope } from './symbolTable';

export const PLACEHOLDER_ADDRESS = -1;

export const constructAssignInstr = (entry: SymbolTableEntry): AssignInstr => ({
  type: 'Assign',
  scope: convertToNameScope(entry.scope),
  offset: entry.offset
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
  entry: SymbolTableEntry
): LoadSymbolInstr => ({
  type: 'LoadSymbol',
  scope: convertToNameScope(entry.scope),
  offset: entry.offset
});

export const constructTeardownInstr = (
  returnAddressOffset: number
): TeardownInstr => ({
  type: 'Teardown',
  returnAddressOffset
});
