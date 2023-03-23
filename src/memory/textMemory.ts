import { type Instr } from '../interpreter/types/vmInstruction';

export class TextMemory {
  private readonly instructions: Instr[] = [];

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
}
