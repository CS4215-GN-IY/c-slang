import { VirtualMemory } from './virtualMemory';
import { TextMemory } from './textMemory';
import { type Instr } from '../interpreter/types/instructions';
import { Segment } from './segment';
import { MemoryError, MemoryErrorType } from './memoryError';
import { type DataType } from '../ast/types/dataTypes';
import { type ValueWithDataType } from '../interpreter/types/virtualMachine';
import { PageTable } from './pageTable';

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

  public get(address: number, dataType: DataType): number {
    return this.virtualMemory.get(address, dataType);
  }

  public set(address: number, data: number, dataType: DataType): void {
    this.virtualMemory.set(address, data, dataType);
  }

  public dataAllocate(sizeOfDeclarationsInBytes: number): void {
    const numOfEntries = Math.ceil(
      sizeOfDeclarationsInBytes / PageTable.ENTRY_SIZE
    );
    this.virtualMemory.dataAllocate(numOfEntries);
  }

  public getByOffset(
    segment: Segment,
    offset: number,
    dataType: DataType
  ): number {
    switch (segment) {
      case Segment.DATA:
        return this.virtualMemory.dataGetByOffset(offset, dataType);
      case Segment.STACK:
        return this.virtualMemory.stackGetByOffset(offset, dataType);
      default:
        throw new MemoryError(MemoryErrorType.INVALID_SEGMENT, segment);
    }
  }

  public getByOffsetFromAddress(
    address: number,
    offset: number,
    dataType: DataType
  ): number {
    return this.virtualMemory.getByOffsetFromAddress(address, offset, dataType);
  }

  public getAddressByOffset(address: number, offset: number): number {
    return this.virtualMemory.getAddressByOffset(address, offset);
  }

  public setByOffset(
    segment: Segment,
    offset: number,
    data: number,
    dataType: DataType
  ): void {
    switch (segment) {
      case Segment.DATA:
        this.virtualMemory.dataSetByOffset(offset, data, dataType);
        break;
      case Segment.STACK:
        this.virtualMemory.stackSetByOffset(offset, data, dataType);
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
    args: ValueWithDataType[],
    totalSizeOfVariablesInBytes: number,
    returnAddress: number
  ): void {
    const totalSizeOfArgsInBytes = args.reduce(
      (totalSize, currArg) => totalSize + currArg.dataType.sizeInBytes,
      0
    );
    const numOfEntriesForArgs = Math.ceil(
      totalSizeOfArgsInBytes / PageTable.ENTRY_SIZE
    );
    const numOfEntriesForVars = Math.ceil(
      totalSizeOfVariablesInBytes / PageTable.ENTRY_SIZE
    );
    this.virtualMemory.stackFunctionCallSetup(
      args,
      numOfEntriesForArgs,
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
