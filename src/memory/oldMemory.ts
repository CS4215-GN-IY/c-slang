import { VirtualMemory } from './virtualMemory';
import { OldTextMemory } from './oldTextMemory';
import {
  type Closure,
  type DeclarationNameWithAddress,
  type DeclarationNameWithValue
} from '../interpreter/types/interpreter';

export class OldMemory {
  private readonly virtualMemory;
  private readonly textMemory;

  constructor(dataSize: number, stackSize: number, heapSize: number) {
    // Instructions are stored in a separate text memory as encoding is too difficult.
    this.virtualMemory = new VirtualMemory(0, dataSize, stackSize, heapSize);
    this.textMemory = new OldTextMemory();
  }

  public get(address: number): number {
    return this.virtualMemory.get(address);
  }

  public set(address: number, data: number): void {
    this.virtualMemory.set(address, data);
  }

  public stackAllocate(data: number): number {
    return this.virtualMemory.stackAllocate(data);
  }

  public stackFunctionCallAllocate(
    paramsWithValues: DeclarationNameWithValue[]
  ): DeclarationNameWithAddress[] {
    return this.virtualMemory.stackFunctionCallAllocate(paramsWithValues);
  }

  public textAllocate(functionInstruction: Closure): number {
    return this.textMemory.allocate(functionInstruction);
  }

  public textGet(idx: number): Closure {
    return this.textMemory.get(idx);
  }
}
