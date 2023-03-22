import {
  type ResetEnvironmentInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr,
  type ResetInstr,
  type BinaryOpInstr,
  type BranchInstr
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

export const constructBinaryOpInstr = (
  symbol: BinaryOperator
): BinaryOpInstr => ({
  type: 'BinaryOp',
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

export const constructEnvironmentInstr = (
  environment: SymbolTable
): ResetEnvironmentInstr => ({
  type: 'ResetEnvironment',
  environment
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
