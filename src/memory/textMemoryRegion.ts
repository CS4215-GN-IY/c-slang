import { type Instr } from '../interpreter/types/instructions';
import { MemoryRegion } from './memoryRegion';
import { IllegalInstructionError, UnwritableMemoryRegionError } from './errors';
import { encodeInstruction } from '../encoding/instructions';

export class TextMemoryRegion extends MemoryRegion {
  public static readonly BYTES_PER_INSTRUCTION = 8;

  private readonly instructions: Instr[];

  public constructor(instructions: Instr[]) {
    super();
    this.instructions = instructions;
  }

  public get sizeInBytes(): number {
    return this.instructions.length * TextMemoryRegion.BYTES_PER_INSTRUCTION;
  }

  public setInt8(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getInt8(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setUint8(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getUint8(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setInt16(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getInt16(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setUint16(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getUint16(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setInt32(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getInt32(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setUint32(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getUint32(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setInt64(byteOffset: number, value: bigint): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getInt64(byteOffset: number): bigint {
    throw new IllegalInstructionError();
  }

  public setUint64(byteOffset: number, value: bigint): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getUint64(byteOffset: number): bigint {
    if (byteOffset % TextMemoryRegion.BYTES_PER_INSTRUCTION !== 0) {
      throw new IllegalInstructionError();
    }
    const instructionIndex =
      byteOffset / TextMemoryRegion.BYTES_PER_INSTRUCTION;
    const instruction = this.instructions[instructionIndex];
    return encodeInstruction(instruction);
  }

  public setFloat32(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getFloat32(byteOffset: number): number {
    throw new IllegalInstructionError();
  }

  public setFloat64(byteOffset: number, value: number): void {
    throw new UnwritableMemoryRegionError('text');
  }

  public getFloat64(byteOffset: number): number {
    throw new IllegalInstructionError();
  }
}
