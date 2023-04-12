export abstract class MemoryRegion {
  public abstract setInt8(byteOffset: number, value: number): void;
  public abstract getInt8(byteOffset: number): number;
  public abstract setUint8(byteOffset: number, value: number): void;
  public abstract getUint8(byteOffset: number): number;
  public abstract setInt16(byteOffset: number, value: number): void;
  public abstract getInt16(byteOffset: number): number;
  public abstract setUint16(byteOffset: number, value: number): void;
  public abstract getUint16(byteOffset: number): number;
  public abstract setInt32(byteOffset: number, value: number): void;
  public abstract getInt32(byteOffset: number): number;
  public abstract setUint32(byteOffset: number, value: number): void;
  public abstract getUint32(byteOffset: number): number;
  public abstract setInt64(byteOffset: number, value: bigint): void;
  public abstract getInt64(byteOffset: number): bigint;
  public abstract setUint64(byteOffset: number, value: bigint): void;
  public abstract getUint64(byteOffset: number): bigint;
  public abstract setFloat32(byteOffset: number, value: number): void;
  public abstract getFloat32(byteOffset: number): number;
  public abstract setFloat64(byteOffset: number, value: number): void;
  public abstract getFloat64(byteOffset: number): number;
}
