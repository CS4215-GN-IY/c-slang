import { type Segment } from '../../memory/segment';
import { type Value } from './virtualMachine';

interface BaseInstr {
  type: string;
}

export type Instr =
  | AssignInstr
  | BinaryOperationInstr
  | BreakInstr
  | BreakDoneInstr
  | CallInstr
  | ContinueInstr
  | ContinueDoneInstr
  | DoneInstr
  | EnterProgramInstr
  | FallthroughInstr
  | FallthroughDoneInstr
  | JumpInstr
  | JumpOnFalseInstr
  | JumpOnTrueInstr
  | LoadConstantInstr
  | LoadFunctionInstr
  | LoadSymbolInstr
  | MatchCaseInstr
  | PopInstr
  | TeardownInstr;

export interface AssignInstr extends BaseInstr {
  type: 'Assign';
  scope: Segment;
  offset: number;
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
  numOfVars: number;
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
  numOfDeclarations: number;
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

export interface LoadConstantInstr extends BaseInstr {
  type: 'LoadConstant';
  value: Value;
}

export interface LoadFunctionInstr extends BaseInstr {
  type: 'LoadFunction';
  functionInstrAddress: number;
}

export interface LoadSymbolInstr extends BaseInstr {
  type: 'LoadSymbol';
  scope: Segment;
  offset: number;
}

export interface MatchCaseInstr extends BaseInstr {
  type: 'MatchCase';
}

export interface PopInstr extends BaseInstr {
  type: 'Pop';
}

export interface TeardownInstr extends BaseInstr {
  type: 'Teardown';
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
