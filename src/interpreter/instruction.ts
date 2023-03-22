import {
  type ResetSymbolTableInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr,
  type ResetInstr,
  type BinaryOperationInstr,
  type BranchInstr,
  type VariableAssignmentInstr
} from './types/instruction';
import {
  type BinaryOperator,
  type CallExpression,
  type Expression,
  type Statement
} from '../ast/types';
import { type SymbolTable } from './types/interpreter';
import { isIdentifier } from '../ast/typeGuards';
import { InvalidFunctionApplicationError } from './errors';

export const constructBinaryOperationInstr = (
  symbol: BinaryOperator
): BinaryOperationInstr => ({
  type: 'BinaryOperation',
  symbol
});

export const constructBranchInstr = (
  consequent: Expression | Statement,
  alternate: Expression | Statement
): BranchInstr => ({
  type: 'Branch',
  consequent,
  alternate
});

export const constructResetSymbolTableInstr = (
  environment: SymbolTable
): ResetSymbolTableInstr => ({
  type: 'ResetSymbolTable',
  symbolTable: environment
});

export const constructFunctionAssignmentInstr = (
  nameAddress: number,
  idx: number
): FunctionAssigmentInstr => ({
  type: 'FunctionAssignment',
  nameAddress,
  closureIdx: idx
});

export const constructFunctionApplicationInstr = (
  numOfArgs: number,
  srcNode: CallExpression
): FunctionApplicationInstr => {
  const callee = srcNode.callee;
  if (!isIdentifier(callee)) {
    throw new InvalidFunctionApplicationError('Cannot call non-identifier.');
  }
  return {
    type: 'FunctionApplication',
    functionId: callee,
    numOfArgs: srcNode.arguments.length
  };
};

export const constructFunctionMarkInstr = (): FunctionMarkInstr => ({
  type: 'FunctionMark'
});

export const constructResetInstr = (): ResetInstr => ({
  type: 'Reset'
});

export const constructVariableAssignmentInstr = (
  name: string
): VariableAssignmentInstr => ({
  type: 'VariableAssignment',
  name
});
