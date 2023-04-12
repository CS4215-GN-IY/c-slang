import { MappedMemoryRegion } from './mappedMemoryRegion';
import { OverlappingMemoryRegionsError, SegmentationFault } from './errors';
import { type Segments } from './types';
import { type Instr } from '../interpreter/types/instructions';

export interface VirtualMemoryConfig {
  instructions: Instr[];
  dataSizeInBytes: number;
  stackSizeInBytes: number;
  heapSizeInBytes: number;
  textBaseAddress: number;
  dataBaseAddress: number;
  stackBaseAddress: number;
  heapBaseAddress: number;
}

export class VirtualMemory {
  private readonly segments: Segments;

  constructor(config: VirtualMemoryConfig) {
    this.segments = {
      text: new MappedMemoryRegion({
        type: 'Text',
        baseAddress: config.textBaseAddress,
        instructions: config.instructions
      }),
      data: new MappedMemoryRegion({
        type: 'DataView',
        baseAddress: config.dataBaseAddress,
        sizeInBytes: config.dataSizeInBytes
      }),
      stack: new MappedMemoryRegion({
        type: 'DataView',
        baseAddress: config.stackBaseAddress,
        sizeInBytes: config.stackSizeInBytes
      }),
      heap: new MappedMemoryRegion({
        type: 'DataView',
        baseAddress: config.heapBaseAddress,
        sizeInBytes: config.heapSizeInBytes
      })
    };

    this.checkMemoryRegionsDoNotOverlap();
  }

  private checkMemoryRegionsDoNotOverlap(): void {
    const memoryRegions = Object.values(this.segments);
    // Sort by ascending base address.
    memoryRegions.sort((a, b) => a.baseAddress - b.baseAddress);
    // Check that the memory regions do not overlap.
    for (let i = 1; i < memoryRegions.length; i++) {
      const previousMemoryRegion = memoryRegions[i - 1];
      const currentMemoryRegion = memoryRegions[i];
      if (previousMemoryRegion.topAddress > currentMemoryRegion.baseAddress) {
        throw new OverlappingMemoryRegionsError(
          previousMemoryRegion.baseAddress,
          previousMemoryRegion.topAddress,
          currentMemoryRegion.baseAddress,
          currentMemoryRegion.topAddress
        );
      }
    }
  }

  private getMappedMemoryRegion(
    address: number,
    sizeInBytes: number
  ): MappedMemoryRegion {
    for (const mappedMemoryRegion of Object.values(this.segments)) {
      if (mappedMemoryRegion.containsAddressRange(address, sizeInBytes)) {
        return mappedMemoryRegion;
      }
    }
    throw new SegmentationFault(address, sizeInBytes);
  }

  public setInt8(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 1);
    memoryRegion.setInt8(address, value);
  }

  public getInt8(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 1);
    return memoryRegion.getInt8(address);
  }

  public setUint8(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 1);
    memoryRegion.setUint8(address, value);
  }

  public getUint8(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 1);
    return memoryRegion.getUint8(address);
  }

  public setInt16(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 2);
    memoryRegion.setInt16(address, value);
  }

  public getInt16(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 2);
    return memoryRegion.getInt16(address);
  }

  public setUint16(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 2);
    memoryRegion.setUint16(address, value);
  }

  public getUint16(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 2);
    return memoryRegion.getUint16(address);
  }

  public setInt32(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    memoryRegion.setInt32(address, value);
  }

  public getInt32(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    return memoryRegion.getInt32(address);
  }

  public setUint32(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    memoryRegion.setUint32(address, value);
  }

  public getUint32(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    return memoryRegion.getUint32(address);
  }

  public setInt64(address: number, value: bigint): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    memoryRegion.setInt64(address, value);
  }

  public getInt64(address: number): bigint {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    return memoryRegion.getInt64(address);
  }

  public setUint64(address: number, value: bigint): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    memoryRegion.setUint64(address, value);
  }

  public getUint64(address: number): bigint {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    return memoryRegion.getUint64(address);
  }

  public setFloat32(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    memoryRegion.setFloat32(address, value);
  }

  public getFloat32(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 4);
    return memoryRegion.getFloat32(address);
  }

  public setFloat64(address: number, value: number): void {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    memoryRegion.setFloat64(address, value);
  }

  public getFloat64(address: number): number {
    const memoryRegion = this.getMappedMemoryRegion(address, 8);
    return memoryRegion.getFloat64(address);
  }
}
