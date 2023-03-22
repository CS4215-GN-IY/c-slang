import { type BinaryOperator, type Identifier } from '../../ast/types';
import { type SymbolTable } from './interpreter';

interface BaseInstr {
  type: string;
}

export type Instr =
  | BinaryOpInstr
  | FunctionApplicationInstr
  | FunctionAssigmentInstr
  | FunctionMarkInstr
  | ResetEnvironmentInstr
  | ResetInstr;

export interface BinaryOpInstr extends BaseInstr {
  type: 'BinaryOp';
  symbol: BinaryOperator;
}

export interface FunctionApplicationInstr extends BaseInstr {
  type: 'FunctionApplication';
  functionId: Identifier;
  numOfArgs: number;
}

export interface FunctionAssigmentInstr extends BaseInstr {
  type: 'FunctionAssignment';
  nameAddress: number;
  closureIdx: number;
}

export interface FunctionMarkInstr extends BaseInstr {
  type: 'FunctionMark';
}

export interface ResetEnvironmentInstr extends BaseInstr {
  type: 'ResetEnvironment';
  environment: SymbolTable;
}

export interface ResetInstr extends BaseInstr {
  type: 'Reset';
}
