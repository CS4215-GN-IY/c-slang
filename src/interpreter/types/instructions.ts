import { type Segment } from '../../memory/segment';
import { type Value } from './virtualMachine';
import { type DataType } from '../../ast/types/dataTypes';

interface BaseInstr {
  type: string;
}

export type Instr =
  | ArrayAccessInstr
  | AssignInstr
  | AssignToAddressInstr
  | BinaryOperationInstr
  | BreakInstr
  | BreakDoneInstr
  | CallInstr
  | CallBuiltInInstr
  | ContinueInstr
  | ContinueDoneInstr
  | DoneInstr
  | EnterProgramInstr
  | FallthroughInstr
  | FallthroughDoneInstr
  | JumpInstr
  | JumpOnFalseInstr
  | JumpOnTrueInstr
  | LoadAddressInstr
  | LoadConstantInstr
  | LoadFunctionInstr
  | LoadReturnAddressInstr
  | LoadSymbolInstr
  | MatchCaseInstr
  | PopInstr
  | TailCallInstr
  | TeardownInstr
  | UnaryOperationInstr;

export interface ArrayAccessInstr extends BaseInstr {
  type: 'ArrayAccess';
  multiplier: number;
  isAccessingAddress: boolean;
}

export interface AssignInstr extends BaseInstr {
  type: 'Assign';
  scope: Segment;
  offset: number;
  numOfItems: number;
  dataTypeOfEachItem: DataType;
}

export interface AssignToAddressInstr extends BaseInstr {
  type: 'AssignToAddress';
}

export interface BinaryOperationInstr extends BaseInstr {
  type: 'BinaryOperation';
  operator: BinaryOperator;
}

export interface BreakInstr extends BaseInstr {
  type: 'Break';
}

export interface BreakDoneInstr extends BaseInstr {
  type: 'BreakDone';
}

export interface CallInstr extends BaseInstr {
  type: 'Call';
  numOfArgs: number;
  paramDataTypes: DataType[];
  totalSizeOfVariablesInBytes: number;
}

export interface CallBuiltInInstr extends BaseInstr {
  type: 'CallBuiltIn';
  builtInName: string;
  numOfArgs: number;
}

export interface ContinueInstr extends BaseInstr {
  type: 'Continue';
}

export interface ContinueDoneInstr extends BaseInstr {
  type: 'ContinueDone';
}

export interface DoneInstr extends BaseInstr {
  type: 'Done';
}

export interface EnterProgramInstr extends BaseInstr {
  type: 'EnterProgram';
  sizeOfDeclarationsInBytes: number;
}

export interface FallthroughInstr extends BaseInstr {
  type: 'Fallthrough';
}

export interface FallthroughDoneInstr extends BaseInstr {
  type: 'FallthroughDone';
}

export interface JumpInstr extends BaseInstr {
  type: 'Jump';
  instrAddress: number;
}

export interface JumpOnFalseInstr extends BaseInstr {
  type: 'JumpOnFalse';
  instrAddress: number;
}

export interface JumpOnTrueInstr extends BaseInstr {
  type: 'JumpOnTrue';
  instrAddress: number;
}

export interface LoadAddressInstr extends BaseInstr {
  type: 'LoadAddress';
  scope: Segment;
  offset: number;
  dataType: DataType;
}

export interface LoadConstantInstr extends BaseInstr {
  type: 'LoadConstant';
  value: Value;
}

export interface LoadFunctionInstr extends BaseInstr {
  type: 'LoadFunction';
  functionInstrAddress: number;
}

export interface LoadReturnAddressInstr extends BaseInstr {
  type: 'LoadReturnAddress';
}

export interface LoadSymbolInstr extends BaseInstr {
  type: 'LoadSymbol';
  scope: Segment;
  offset: number;
  dataType: DataType;
}

export interface MatchCaseInstr extends BaseInstr {
  type: 'MatchCase';
}

export interface PopInstr extends BaseInstr {
  type: 'Pop';
}

export interface TailCallInstr extends BaseInstr {
  type: 'TailCall';
}

export interface TeardownInstr extends BaseInstr {
  type: 'Teardown';
}

export interface UnaryOperationInstr extends BaseInstr {
  type: 'UnaryOperation';
  operator: UnaryOperator;
}

export type BinaryOperator =
  | '*'
  | '/'
  | '%'
  | '+'
  | '-'
  | '<<'
  | '>>'
  | '<'
  | '>'
  | '<='
  | '>='
  | '=='
  | '!='
  | '&'
  | '^'
  | '|';

export const UNARY_OPERATORS = ['+', '-', '~', '!', '*'] as const;
export type UnaryOperator = (typeof UNARY_OPERATORS)[number];
