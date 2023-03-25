import { type Value } from './evaluationResults';

// TODO: Add data scope when allocation to data segment is supported
export type NameScope = 'Stack';

interface BaseInstr {
  type: string;
}

export type Instr =
  | AssignInstr
  | CallInstr
  | DoneInstr
  | ExitFunctionInstr
  | GotoInstr
  | LoadConstantInstr
  | LoadFunctionInstr
  | LoadSymbolInstr
  | TeardownInstr;

export interface AssignInstr extends BaseInstr {
  type: 'Assign';
  scope: NameScope;
  offset: number;
}

export interface CallInstr extends BaseInstr {
  type: 'Call';
  numOfArgs: number;
}

export interface DoneInstr extends BaseInstr {
  type: 'Done';
}

export interface ExitFunctionInstr extends BaseInstr {
  type: 'ExitFunction';
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
  scope: NameScope;
  offset: number;
}

export interface TeardownInstr extends BaseInstr {
  type: 'Teardown';
  returnAddressOffset: number;
}
