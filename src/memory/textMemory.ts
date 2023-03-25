import { type Instr } from '../interpreter/types/instruction';

export class TextMemory {
  private readonly instructions: Instr[] = [];
  private rip: number = 0;

  public allocate(instruction: Instr): number {
    this.instructions.push(instruction);
    return this.instructions.length - 1;
  }

  public get(address: number): Instr {
    return this.instructions[address];
  }

  public getNextFreeAddress(): number {
    return this.instructions.length;
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
