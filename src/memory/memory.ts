import { VirtualMemory } from './virtualMemory';
import { TextMemory } from './textMemory';
import { type Instr } from '../interpreter/types/vmInstruction';

export class Memory {
  private readonly virtualMemory;
  readonly textMemory;

  constructor(dataSize: number, stackSize: number, heapSize: number) {
    // Instructions are stored in a separate text memory as encoding is too difficult.
    this.virtualMemory = new VirtualMemory(0, dataSize, stackSize, heapSize);
    this.textMemory = new TextMemory();
  }

  public get(address: number): number {
    return this.virtualMemory.get(address);
  }

  public set(address: number, data: number): void {
    this.virtualMemory.set(address, data);
  }

  public stackGetByOffset(offset: number): number {
    return this.virtualMemory.stackGetByOffset(offset);
  }

  public stackAllocate(data: number): number {
    return this.virtualMemory.stackAllocate(data);
  }

  public stackFunctionCallAllocate(args: number[]): number[] {
    return this.virtualMemory.stackFunctionCallSetup(args);
  }

  public stackFunctionCallTeardown(): void {
    this.virtualMemory.stackFunctionCallTeardown();
  }

  public textAllocate(instruction: Instr): number {
    return this.textMemory.allocate(instruction);
  }

  public textGet(address: number): Instr {
    return this.textMemory.get(address);
  }

  public textGetNextFreeAddress(): number {
    return this.textMemory.getNextFreeAddress();
  }
}
