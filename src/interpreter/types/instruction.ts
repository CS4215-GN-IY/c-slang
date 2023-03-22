import {
  type BinaryOperator,
  type Expression,
  type Identifier,
  type Statement
} from '../../ast/types';
import { type SymbolTable } from './interpreter';

interface BaseInstr {
  type: string;
}

export type Instr =
  | BinaryOpInstr
  | BranchInstr
  | FunctionApplicationInstr
  | FunctionAssigmentInstr
  | FunctionMarkInstr
  | ResetEnvironmentInstr
  | ResetInstr
  | VariableAssignmentInstr;

export interface BinaryOpInstr extends BaseInstr {
  type: 'BinaryOp';
  symbol: BinaryOperator;
}

export interface BranchInstr extends BaseInstr {
  type: 'Branch';
  consequent: Expression | Statement;
  alternate: Expression | Statement;
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

export interface VariableAssignmentInstr extends BaseInstr {
  type: 'VariableAssignment';
  name: string;
}
