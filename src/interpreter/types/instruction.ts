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
  | BinaryOperationInstr
  | BranchInstr
  | FunctionApplicationInstr
  | FunctionAssigmentInstr
  | FunctionMarkInstr
  | ResetSymbolTableInstr
  | ResetInstr
  | VariableAssignmentInstr;

export interface BinaryOperationInstr extends BaseInstr {
  type: 'BinaryOperation';
  operator: BinaryOperator;
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

export interface ResetSymbolTableInstr extends BaseInstr {
  type: 'ResetSymbolTable';
  symbolTable: SymbolTable;
}

export interface ResetInstr extends BaseInstr {
  type: 'Reset';
}

export interface VariableAssignmentInstr extends BaseInstr {
  type: 'VariableAssignment';
  name: string;
}
