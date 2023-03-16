import { type Identifier } from '../../ast/types';
import { type SymbolTable } from './interpreter';

interface BaseInstr {
  type: string;
}

export type Instr =
  | ResetEnvironmentInstr
  | FunctionApplicationInstr
  | FunctionAssigmentInstr
  | FunctionMarkInstr
  | ResetInstr;

export interface ResetEnvironmentInstr extends BaseInstr {
  type: 'ResetEnvironment';
  environment: SymbolTable;
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
