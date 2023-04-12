import { TextMemoryRegion } from './textMemoryRegion';

export class Registers {
  // Instruction pointer
  public rip: number;
  // Base pointer - points to the base of the current stack frame
  public rbp: number;
  // Stack pointer - points to the top of the stack
  public rsp: number;

  public constructor(textBaseAddress: number, stackBaseAddress: number) {
    this.rip = textBaseAddress;
    this.rbp = stackBaseAddress;
    this.rsp = stackBaseAddress;
  }

  public moveToNextInstruction(): void {
    this.rip += TextMemoryRegion.BYTES_PER_INSTRUCTION;
  }
}
