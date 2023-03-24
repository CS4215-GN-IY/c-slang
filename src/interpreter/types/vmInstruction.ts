import { type SymbolTableEntryPosition } from './virtualMachine';
import { type Value } from './evaluationResults';

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
  symbolTableEntryPosition: SymbolTableEntryPosition;
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
  symbolTableEntryPosition: SymbolTableEntryPosition;
}

export interface TeardownInstr extends BaseInstr {
  type: 'Teardown';
  returnAddressOffset: number;
}
