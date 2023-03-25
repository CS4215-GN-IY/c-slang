import { type Instr } from '../interpreter/types/instructions';

export class TextMemory {
  private readonly instructions: Instr[];
  private rip: number = 0;

  constructor(instructions: Instr[]) {
    this.instructions = instructions;
  }

  public getCurrentInstr(): Instr {
    return this.instructions[this.rip];
  }

  public getNextInstrAddress(): number {
    return this.rip + 1;
  }

  public moveToNextInstr(): void {
    this.rip += 1;
  }

  public moveToInstr(instrAddress: number): void {
    this.rip = instrAddress;
  }

  public isDone(): boolean {
    return this.instructions[this.rip].type === 'Done';
  }
}
