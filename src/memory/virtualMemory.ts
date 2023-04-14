import { MappedMemoryRegion } from './mappedMemoryRegion';
import {
  InvalidPointerError,
  OverlappingMemoryRegionsError,
  SegmentationFault
} from './errors';
import { type Segments } from './types';
import { type Instr } from '../interpreter/types/instructions';
import { type DataType } from '../ast/types/dataTypes';
import { TextMemoryRegion } from './textMemoryRegion';
import { DataViewMemoryRegion } from './dataViewMemoryRegion';
import { HeapMemoryRegion } from './heapMemoryRegion';

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
  private readonly heap: HeapMemoryRegion;

  constructor(config: VirtualMemoryConfig) {
    const text = new TextMemoryRegion(config.instructions);
    const data = new DataViewMemoryRegion(config.dataSizeInBytes);
    const stack = new DataViewMemoryRegion(config.stackSizeInBytes);
    this.heap = new HeapMemoryRegion(config.heapSizeInBytes);

    this.segments = {
      text: new MappedMemoryRegion(
        text,
        config.textBaseAddress,
        text.sizeInBytes
      ),
      data: new MappedMemoryRegion(
        data,
        config.dataBaseAddress,
        config.dataSizeInBytes
      ),
      stack: new MappedMemoryRegion(
        stack,
        config.stackBaseAddress,
        config.stackSizeInBytes
      ),
      heap: new MappedMemoryRegion(
        this.heap,
        config.heapBaseAddress,
        config.heapSizeInBytes
      )
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

  private setSignedInteger(
    sizeInBytes: number,
    address: number,
    value: number
  ): void {
    switch (sizeInBytes) {
      case 1:
        this.setInt8(address, value);
        break;
      case 2:
        this.setInt16(address, value);
        break;
      case 4:
        this.setInt32(address, value);
        break;
      case 8:
        this.setInt64(address, BigInt(value));
        break;
      default:
        throw new TypeError(
          `Encountered invalid signed integer size: ${sizeInBytes}`
        );
    }
  }

  private setUnsignedInteger(
    sizeInBytes: number,
    address: number,
    value: number
  ): void {
    switch (sizeInBytes) {
      case 1:
        this.setUint8(address, value);
        break;
      case 2:
        this.setUint16(address, value);
        break;
      case 4:
        this.setUint32(address, value);
        break;
      case 8:
        this.setUint64(address, BigInt(value));
        break;
      default:
        throw new TypeError(
          `Encountered invalid unsigned integer size: ${sizeInBytes}`
        );
    }
  }

  public setFloat(sizeInBytes: number, address: number, value: number): void {
    switch (sizeInBytes) {
      case 4:
        this.setFloat32(address, value);
        break;
      case 8:
        this.setFloat64(address, value);
        break;
      default:
        throw new TypeError(
          `Encountered invalid floating point size: ${sizeInBytes}`
        );
    }
  }

  public setAddress(sizeInBytes: number, address: number, value: number): void {
    switch (sizeInBytes) {
      case 8:
        this.setFloat64(address, value);
        break;
      default:
        throw new TypeError(`Encountered invalid address size: ${sizeInBytes}`);
    }
  }

  public set(dataType: DataType, address: number, value: number): void {
    switch (dataType.type) {
      case 'Integer':
        if (dataType.isSigned) {
          this.setSignedInteger(dataType.sizeInBytes, address, value);
        } else {
          this.setUnsignedInteger(dataType.sizeInBytes, address, value);
        }
        break;
      case 'FloatingPoint':
        this.setFloat(dataType.sizeInBytes, address, value);
        break;
      case 'Address':
        this.setAddress(dataType.sizeInBytes, address, value);
        break;
      default:
        throw new TypeError(`Encountered unknown type: ${dataType.type}`);
    }
  }

  private getSignedInteger(sizeInBytes: number, address: number): number {
    switch (sizeInBytes) {
      case 1:
        return this.getInt8(address);
      case 2:
        return this.getInt16(address);
      case 4:
        return this.getInt32(address);
      case 8:
        // FIXME: Not all 64-bit values can be represented because JavaScript's 'number' type
        //        makes use of the IEEE 754 representation. Only 53-bit values can be represented.
        return Number(this.getInt64(address));
      default:
        throw new TypeError(
          `Encountered invalid signed integer size: ${sizeInBytes}`
        );
    }
  }

  private getUnsignedInteger(sizeInBytes: number, address: number): number {
    switch (sizeInBytes) {
      case 1:
        return this.getUint8(address);
      case 2:
        return this.getUint16(address);
      case 4:
        return this.getUint32(address);
      case 8:
        // FIXME: Not all 64-bit values can be represented because JavaScript's 'number' type
        //        makes use of the IEEE 754 representation. Only 53-bit values can be represented.
        return Number(this.getUint64(address));
      default:
        throw new TypeError(
          `Encountered invalid unsigned integer size: ${sizeInBytes}`
        );
    }
  }

  public getFloat(sizeInBytes: number, address: number): number {
    switch (sizeInBytes) {
      case 4:
        return this.getFloat32(address);
      case 8:
        return this.getFloat64(address);
      default:
        throw new TypeError(
          `Encountered invalid floating point size: ${sizeInBytes}`
        );
    }
  }

  public getAddress(sizeInBytes: number, address: number): number {
    switch (sizeInBytes) {
      case 8:
        return this.getFloat64(address);
      default:
        throw new TypeError(`Encountered invalid address size: ${sizeInBytes}`);
    }
  }

  public get(dataType: DataType, address: number): number {
    switch (dataType.type) {
      case 'Integer':
        if (dataType.isSigned) {
          return this.getSignedInteger(dataType.sizeInBytes, address);
        } else {
          return this.getUnsignedInteger(dataType.sizeInBytes, address);
        }
      case 'FloatingPoint':
        return this.getFloat(dataType.sizeInBytes, address);
      case 'Address':
        return this.getAddress(dataType.sizeInBytes, address);
      default:
        throw new TypeError(`Encountered unknown type: ${dataType.type}`);
    }
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

  public heapAllocate(sizeInBytes: number): number {
    const baseAddress = this.heap.allocate(sizeInBytes);
    // If the allocated address is -1, allocation failed.
    if (baseAddress === -1) {
      return -1;
    }
    return baseAddress + this.segments.heap.baseAddress;
  }

  public heapFree(address: number): void {
    if (!this.segments.heap.containsAddress(address)) {
      throw new InvalidPointerError();
    }
    const byteOffset = address - this.segments.heap.baseAddress;
    this.heap.free(byteOffset);
  }
}
