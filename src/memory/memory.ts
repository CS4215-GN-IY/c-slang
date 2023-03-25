import { VirtualMemory } from './virtualMemory';
import { TextMemory } from './textMemory';
import { type Instr } from '../interpreter/types/instructions';
import { Segment } from './segment';
import { MemoryError, MemoryErrorType } from './memoryError';

export class Memory {
  private readonly virtualMemory;
  private readonly textMemory;

  constructor(
    instructions: Instr[],
    dataSize: number,
    stackSize: number,
    heapSize: number
  ) {
    // Instructions are stored in a separate text memory as encoding is too difficult.
    this.virtualMemory = new VirtualMemory(0, dataSize, stackSize, heapSize);
    this.textMemory = new TextMemory(instructions);
  }

  public get(address: number): number {
    return this.virtualMemory.get(address);
  }

  public set(address: number, data: number): void {
    this.virtualMemory.set(address, data);
  }

  public dataAllocate(numOfEntries: number): void {
    this.virtualMemory.dataAllocate(numOfEntries);
  }

  public getByOffset(segment: Segment, offset: number): number {
    switch (segment) {
      case Segment.DATA:
        return this.virtualMemory.dataGetByOffset(offset);
      case Segment.STACK:
        return this.virtualMemory.stackGetByOffset(offset);
      default:
        throw new MemoryError(MemoryErrorType.INVALID_SEGMENT, segment);
    }
  }

  public setByOffset(segment: Segment, offset: number, data: number): void {
    switch (segment) {
      case Segment.DATA:
        this.virtualMemory.dataSetByOffset(offset, data);
        break;
      case Segment.STACK:
        this.virtualMemory.stackSetByOffset(offset, data);
        break;
      default:
        throw new MemoryError(MemoryErrorType.INVALID_SEGMENT, segment);
    }
  }

  public stackFunctionCallAllocate(args: number[], numOfVars: number): void {
    const returnAddress = this.textMemory.getNextInstrAddress();
    this.virtualMemory.stackFunctionCallSetup(args, numOfVars, returnAddress);
  }

  public getReturnAddress(): number {
    return this.virtualMemory.getReturnAddress();
  }

  public stackFunctionCallTeardown(): void {
    this.virtualMemory.stackFunctionCallTeardown();
  }

  public getCurrentInstr(): Instr {
    return this.textMemory.getCurrentInstr();
  }

  public moveToNextInstr(): void {
    this.textMemory.moveToNextInstr();
  }

  public moveToInstr(instrAddress: number): void {
    this.textMemory.moveToInstr(instrAddress);
  }

  public isAtDoneInstr(): boolean {
    return this.textMemory.isDone();
  }
}
