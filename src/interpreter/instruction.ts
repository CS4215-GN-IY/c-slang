import {
  type EnvironmentInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr,
  type ResetInstr
} from './types/instruction';
import { type CallExpression } from '../ast/types';
import { type Environment } from './types/interpreter';

export const constructEnvironmentInstr = (
  environment: Environment
): EnvironmentInstr => ({
  type: 'Environment',
  environment
});

export const constructFunctionAssignmentInstr = (
  nameAddress: number,
  idx: number
): FunctionAssigmentInstr => {
  return {
    type: 'FunctionAssignment',
    nameAddress,
    closureIdx: idx
  };
};

export const constructFunctionApplicationInstr = (
  numOfArgs: number,
  srcNode: CallExpression
): FunctionApplicationInstr => ({
  type: 'FunctionApplication',
  functionId: srcNode.id,
  numOfArgs: srcNode.arguments.length
});

export const constructFunctionMarkInstr = (): FunctionMarkInstr => ({
  type: 'FunctionMark'
});

export const constructResetInstr = (): ResetInstr => ({
  type: 'Reset'
});
