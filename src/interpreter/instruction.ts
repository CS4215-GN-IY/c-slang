import { type FunctionDeclaration } from '../ast/types';
import { type FunctionAssigmentInstr } from './types/instruction';
import { type Environment } from './environment';
import { type Closure } from './types/interpreter';

export const constructClosure = (
  functionDeclaration: FunctionDeclaration,
  environment: Environment
): Closure => {
  return {
    // TODO: Change this when parameter list is supported
    params: [],
    body: functionDeclaration.body,
    environment
  };
};

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
