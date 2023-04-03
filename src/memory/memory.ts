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

  public getByOffsetFromAddress(address: number, offset: number): number {
    return this.virtualMemory.getByOffsetFromAddress(address, offset);
  }

  public getAddressByOffset(address: number, offset: number): number {
    return this.virtualMemory.getAddressByOffset(address, offset);
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

  public getAddressAtOffset(segment: Segment, offset: number): number {
    switch (segment) {
      case Segment.DATA:
        return this.virtualMemory.dataGetAddressAtOffset(offset);
      case Segment.STACK:
        return this.virtualMemory.stackGetAddressAtOffset(offset);
      default:
        throw new MemoryError(MemoryErrorType.INVALID_SEGMENT, segment);
    }
  }

  public stackFunctionCallAllocate(
    args: number[],
    numOfEntriesForVars: number,
    returnAddress: number
  ): void {
    this.virtualMemory.stackFunctionCallSetup(
      args,
      numOfEntriesForVars,
      returnAddress
    );
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

  public getNextInstr(): Instr {
    return this.textMemory.getNextInstr();
  }

  public getInstrAddressByOffset(offset: number): number {
    return this.textMemory.getInstrAddressByOffset(offset);
  }

  public moveToNextInstr(): void {
    this.textMemory.moveToNextInstr();
  }

  public moveToInstr(instrAddress: number): void {
    this.textMemory.moveToInstr(instrAddress);
  }

  public moveToNextInstrAfterType(type: string): void {
    this.textMemory.moveToNextInstrAfterType(type);
  }

  public isAtDoneInstr(): boolean {
    return this.textMemory.isDone();
  }
}
