import { TextMemoryRegion } from './textMemoryRegion';

export class Registers {
  // Instruction pointer
  public rip: number;
  // Base pointer - points to the base of the current stack frame
  public rbp: number;
  // Stack pointer - points to the top of the stack
  public rsp: number;

  public constructor() {
    // TODO: Link to base address of text memory region.
    this.rip = 0;
    // TODO: Link to base address of stack memory region.
    this.rbp = 200000;
    this.rsp = 200000;
  }

  public moveToNextInstruction(): void {
    this.rip += TextMemoryRegion.BYTES_PER_INSTRUCTION;
  }
}
