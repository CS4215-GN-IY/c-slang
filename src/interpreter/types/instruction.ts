interface BaseInstr {
  type: string;
}

export type Instr = FunctionAssigmentInstr;

export interface FunctionAssigmentInstr extends BaseInstr {
  type: 'FunctionAssignment';
  nameAddress: number;
  closureIdx: number;
}
