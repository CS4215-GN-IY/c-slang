import { type Value } from './evaluationResults';
import { type Segment } from '../../memory/segment';

interface BaseInstr {
  type: string;
}

export type Instr =
  | AssignInstr
  | BinaryOperationInstr
  | CallInstr
  | DoneInstr
  | EnterProgramInstr
  | GotoInstr
  | LoadConstantInstr
  | LoadFunctionInstr
  | LoadSymbolInstr
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

export interface CallInstr extends BaseInstr {
  type: 'Call';
  numOfArgs: number;
  numOfVars: number;
}

export interface DoneInstr extends BaseInstr {
  type: 'Done';
}

export interface EnterProgramInstr extends BaseInstr {
  type: 'EnterProgram';
  numOfDeclarations: number;
}

export interface GotoInstr extends BaseInstr {
  type: 'Goto';
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
