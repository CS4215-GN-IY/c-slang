import { type MemoryRegion } from './memoryRegion';

export class MappedMemoryRegion {
  private readonly memoryRegion: MemoryRegion;
  public readonly baseAddress: number;
  public readonly sizeInBytes: number;

  constructor(
    memoryRegion: MemoryRegion,
    baseAddress: number,
    sizeInBytes: number
  ) {
    this.memoryRegion = memoryRegion;
    this.baseAddress = baseAddress;
    this.sizeInBytes = sizeInBytes;
  }

  /**
   * Returns the top address of the mapped memory region.
   * Unlike the base address, the top address is exclusive.
   */
  public get topAddress(): number {
    return this.baseAddress + this.sizeInBytes;
  }

  public containsAddressRange(address: number, sizeInBytes: number): boolean {
    return (
      address >= this.baseAddress && address + sizeInBytes <= this.topAddress
    );
  }

  private getByteOffset(address: number): number {
    return address - this.baseAddress;
  }

  public setInt8(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setInt8(byteOffset, value);
  }

  public getInt8(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getInt8(byteOffset);
  }

  public setUint8(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setUint8(byteOffset, value);
  }

  public getUint8(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getUint8(byteOffset);
  }

  public setInt16(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setInt16(byteOffset, value);
  }

  public getInt16(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getInt16(byteOffset);
  }

  public setUint16(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setUint16(byteOffset, value);
  }

  public getUint16(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getUint16(byteOffset);
  }

  public setInt32(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setInt32(byteOffset, value);
  }

  public getInt32(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getInt32(byteOffset);
  }

  public setUint32(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setUint32(byteOffset, value);
  }

  public getUint32(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getUint32(byteOffset);
  }

  public setInt64(address: number, value: bigint): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setInt64(byteOffset, value);
  }

  public getInt64(address: number): bigint {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getInt64(byteOffset);
  }

  public setUint64(address: number, value: bigint): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setUint64(byteOffset, value);
  }

  public getUint64(address: number): bigint {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getUint64(byteOffset);
  }

  public setFloat32(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setFloat32(byteOffset, value);
  }

  public getFloat32(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getFloat32(byteOffset);
  }

  public setFloat64(address: number, value: number): void {
    const byteOffset = this.getByteOffset(address);
    this.memoryRegion.setFloat64(byteOffset, value);
  }

  public getFloat64(address: number): number {
    const byteOffset = this.getByteOffset(address);
    return this.memoryRegion.getFloat64(byteOffset);
  }
}
