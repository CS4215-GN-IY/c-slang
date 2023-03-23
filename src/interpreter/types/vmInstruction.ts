import { type SymbolTableEntryPosition } from './virtualMachine';
import { type Value } from './evaluationResults';

interface BaseInstr {
  type: string;
}

export type Instr =
  | AssignInstr
  | DoneInstr
  | ExitFunctionInstr
  | GotoInstr
  | LoadConstantInstr
  | LoadFunctionInstr
  | LoadSymbolInstr
  | SetupBlockInstr
  | TeardownBlockInstr;

export interface AssignInstr extends BaseInstr {
  type: 'Assign';
  symbolTableEntryPosition: SymbolTableEntryPosition;
}

export interface DoneInstr extends BaseInstr {
  type: 'Done';
}

export interface ExitFunctionInstr extends BaseInstr {
  type: 'ExitFunctionInstr';
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
  symbol: string;
  address: number;
}

export interface SetupBlockInstr extends BaseInstr {
  type: 'SetupBlock';
  numOfVariables: number;
}

export interface TeardownBlockInstr extends BaseInstr {
  type: 'TeardownBlock';
}
