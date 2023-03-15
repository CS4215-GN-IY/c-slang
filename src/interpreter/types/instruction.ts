import { type Identifier } from '../../ast/types';
import { type Environment } from './interpreter';

interface BaseInstr {
  type: string;
}

export type Instr =
  | EnvironmentInstr
  | FunctionApplicationInstr
  | FunctionAssigmentInstr
  | FunctionMarkInstr
  | ResetInstr;

export interface EnvironmentInstr extends BaseInstr {
  type: 'Environment';
  environment: Environment;
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

export interface ResetInstr extends BaseInstr {
  type: 'Reset';
}