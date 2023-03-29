import {
  type AssignInstr,
  type CallInstr,
  type DoneInstr,
  type TeardownInstr,
  type GotoInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type EnterProgramInstr,
  type BinaryOperationInstr,
  type BinaryOperator,
  type JumpOnFalseInstr,
  type PopInstr,
  type MatchCaseInstr,
  type FallthroughInstr,
  type FallthroughDoneInstr,
  type JumpOnTrueInstr,
  type BreakDoneInstr,
  type BreakInstr,
  type ContinueInstr,
  type ContinueDoneInstr
} from './types/instructions';
import { type SymbolTableEntry } from './types/symbolTable';
import { getSegmentScope } from './symbolTable';
import { type Value } from './types/virtualMachine';

export const PLACEHOLDER_ADDRESS = -1;

export const constructAssignInstr = (entry: SymbolTableEntry): AssignInstr => ({
  type: 'Assign',
  scope: getSegmentScope(entry.scope),
  offset: entry.offset
});

export const constructBinaryOperationInstr = (
  operator: BinaryOperator
): BinaryOperationInstr => ({
  type: 'BinaryOperation',
  operator
});

export const constructBreakInstr = (): BreakInstr => ({
  type: 'Break'
});

export const constructBreakDoneInstr = (): BreakDoneInstr => ({
  type: 'BreakDone'
});

export const constructCallInstr = (
  numOfArgs: number,
  numOfVars: number
): CallInstr => ({
  type: 'Call',
  numOfArgs,
  numOfVars
});

export const constructContinueInstr = (): ContinueInstr => ({
  type: 'Continue'
});

export const constructContinueDoneInstr = (): ContinueDoneInstr => ({
  type: 'ContinueDone'
});

export const constructDoneInstr = (): DoneInstr => ({
  type: 'Done'
});

export const constructEnterProgramInstr = (
  numOfDeclarations: number
): EnterProgramInstr => ({
  type: 'EnterProgram',
  numOfDeclarations
});

export const constructFallthroughInstr = (): FallthroughInstr => ({
  type: 'Fallthrough'
});

export const constructFallthroughDoneInstr = (): FallthroughDoneInstr => ({
  type: 'FallthroughDone'
});

export const constructGotoInstr = (instrAddress: number): GotoInstr => ({
  type: 'Goto',
  instrAddress
});

export const constructJumpOnFalseInstr = (
  instrAddress: number
): JumpOnFalseInstr => ({
  type: 'JumpOnFalse',
  instrAddress
});

export const constructJumpOnTrueInstr = (
  instrAddress: number
): JumpOnTrueInstr => ({
  type: 'JumpOnTrue',
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
  scope: getSegmentScope(entry.scope),
  offset: entry.offset
});

export const constructMatchCaseInstr = (): MatchCaseInstr => ({
  type: 'MatchCase'
});

export const constructPopInstr = (): PopInstr => ({
  type: 'Pop'
});

export const constructTeardownInstr = (): TeardownInstr => ({
  type: 'Teardown'
});
