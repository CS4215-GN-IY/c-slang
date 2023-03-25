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
  type JumpOnFalseInstr
} from './types/instruction';
import { type SymbolTableEntry } from './types/symbolTable';
import { getSegmentScope } from './symbolTable';
import { type Value } from './types/evaluator';

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

export const constructCallInstr = (
  numOfArgs: number,
  numOfVars: number
): CallInstr => ({
  type: 'Call',
  numOfArgs,
  numOfVars
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

export const constructTeardownInstr = (): TeardownInstr => ({
  type: 'Teardown'
});
