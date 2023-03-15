/**
 * Contains function instructions, as encoding it to the virtual memory text section is too difficult
 */
import { type Closure } from '../interpreter/types/interpreter';

export class TextMemory {
  private readonly functionInstructions: Closure[] = [];

  public allocate(functionInstruction: Closure): number {
    this.functionInstructions.push(functionInstruction);
    return this.functionInstructions.length - 1;
  }

  public get(idx: number): Closure {
    return this.functionInstructions[idx];
  }
}
