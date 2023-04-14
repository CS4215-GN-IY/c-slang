import { MemoryRegion } from './memoryRegion';

export class DataViewMemoryRegion extends MemoryRegion {
  private readonly dataView: DataView;

  public constructor(sizeInBytes: number) {
    super();
    const buffer = new ArrayBuffer(sizeInBytes);
    this.dataView = new DataView(buffer);
  }

  public setInt8(byteOffset: number, value: number): void {
    this.dataView.setInt8(byteOffset, value);
  }

  public getInt8(byteOffset: number): number {
    return this.dataView.getInt8(byteOffset);
  }

  public setUint8(byteOffset: number, value: number): void {
    this.dataView.setUint8(byteOffset, value);
  }

  public getUint8(byteOffset: number): number {
    return this.dataView.getUint8(byteOffset);
  }

  public setInt16(byteOffset: number, value: number): void {
    this.dataView.setInt16(byteOffset, value);
  }

  public getInt16(byteOffset: number): number {
    return this.dataView.getInt16(byteOffset);
  }

  public setUint16(byteOffset: number, value: number): void {
    this.dataView.setUint16(byteOffset, value);
  }

  public getUint16(byteOffset: number): number {
    return this.dataView.getUint16(byteOffset);
  }

  public setInt32(byteOffset: number, value: number): void {
    this.dataView.setInt32(byteOffset, value);
  }

  public getInt32(byteOffset: number): number {
    return this.dataView.getInt32(byteOffset);
  }

  public setUint32(byteOffset: number, value: number): void {
    this.dataView.setUint32(byteOffset, value);
  }

  public getUint32(byteOffset: number): number {
    return this.dataView.getUint32(byteOffset);
  }

  public setInt64(byteOffset: number, value: bigint): void {
    this.dataView.setBigInt64(byteOffset, value);
  }

  public getInt64(byteOffset: number): bigint {
    return this.dataView.getBigInt64(byteOffset);
  }

  public setUint64(byteOffset: number, value: bigint): void {
    this.dataView.setBigUint64(byteOffset, value);
  }

  public getUint64(byteOffset: number): bigint {
    return this.dataView.getBigUint64(byteOffset);
  }

  public setFloat32(byteOffset: number, value: number): void {
    this.dataView.setFloat32(byteOffset, value);
  }

  public getFloat32(byteOffset: number): number {
    return this.dataView.getFloat32(byteOffset);
  }

  public setFloat64(byteOffset: number, value: number): void {
    this.dataView.setFloat64(byteOffset, value);
  }

  public getFloat64(byteOffset: number): number {
    return this.dataView.getFloat64(byteOffset);
  }
}
