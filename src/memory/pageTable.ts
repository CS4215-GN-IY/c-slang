import assert from 'assert';
import { MemoryError, MemoryErrorType } from './memoryError';

export class PageTable {
  public static readonly NUM_OF_ENTRIES: number = 512;
  public static readonly ENTRY_SIZE: number = 8;
  private static readonly EMPTY_FREE_LIST: number = -1;

  private readonly memory: DataView;
  private freeList: number;

  constructor() {
    const data = new ArrayBuffer(
      PageTable.NUM_OF_ENTRIES * PageTable.ENTRY_SIZE
    );
    this.memory = new DataView(data);

    // The free list is made of entries, where each free entry carries the offset of the next free entry
    this.freeList = 0;
    let i;
    for (i = this.freeList; i < PageTable.NUM_OF_ENTRIES - 1; i++) {
      this.memory.setFloat64(i * PageTable.ENTRY_SIZE, i + 1);
    }
    this.memory.setFloat64(i * PageTable.ENTRY_SIZE, PageTable.EMPTY_FREE_LIST);
  }

  /**
   * Sets a free entry to contain data.
   */
  public setFreeEntryAt(entryOffset: number, data: number): number {
    if (!this.isValidEntryOffset(entryOffset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, entryOffset);
    }

    assert(this.isFreeEntry(entryOffset), 'Offset must be free.');

    this.removeEntryFromFreeList(entryOffset);
    this.memory.setFloat64(entryOffset * PageTable.ENTRY_SIZE, data);
    return entryOffset;
  }

  public getInt8(offset: number): number {
    return this.memory.getInt8(offset);
  }

  public getUint8(offset: number): number {
    return this.memory.getUint8(offset);
  }

  public getInt16(offset: number): number {
    return this.memory.getInt16(offset);
  }

  public getUint16(offset: number): number {
    return this.memory.getUint16(offset);
  }

  public getInt32(offset: number): number {
    return this.memory.getInt32(offset);
  }

  public getUint32(offset: number): number {
    return this.memory.getUint32(offset);
  }

  public getInt64(offset: number): bigint {
    return this.memory.getBigInt64(offset);
  }

  public getUint64(offset: number): bigint {
    return this.memory.getBigUint64(offset);
  }

  public getFloat32(offset: number): number {
    return this.memory.getFloat32(offset);
  }

  public getFloat64(offset: number): number {
    return this.memory.getFloat64(offset);
  }

  public setInt8(offset: number, data: number): void {
    this.memory.setInt8(offset, data);
  }

  public setUint8(offset: number, data: number): void {
    this.memory.setUint8(offset, data);
  }

  public setInt16(offset: number, data: number): void {
    this.memory.setInt16(offset, data);
  }

  public setUint16(offset: number, data: number): void {
    this.memory.setUint16(offset, data);
  }

  public setInt32(offset: number, data: number): void {
    this.memory.setInt32(offset, data);
  }

  public setUint32(offset: number, data: number): void {
    this.memory.setUint32(offset, data);
  }

  public setInt64(offset: number, data: bigint): void {
    this.memory.setBigInt64(offset, data);
  }

  public setUint64(offset: number, data: bigint): void {
    this.memory.setBigUint64(offset, data);
  }

  public setFloat32(offset: number, data: number): void {
    this.memory.setFloat32(offset, data);
  }

  public setFloat64(offset: number, data: number): void {
    this.memory.setFloat64(offset, data);
  }

  public freeEntry(entryOffset: number): void {
    if (!this.isValidEntryOffset(entryOffset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, entryOffset);
    }

    assert(
      !this.isFreeEntry(entryOffset),
      'Only allocated entries can be freed.'
    );

    this.memory.setFloat64(entryOffset * PageTable.ENTRY_SIZE, this.freeList);
    this.freeList = entryOffset;
  }

  private removeEntryFromFreeList(entryOffset: number): void {
    let prevFreeEntryOffset = PageTable.EMPTY_FREE_LIST;
    let freeEntryOffset = this.freeList;
    while (
      freeEntryOffset !== entryOffset &&
      freeEntryOffset !== PageTable.EMPTY_FREE_LIST
    ) {
      prevFreeEntryOffset = freeEntryOffset;
      freeEntryOffset = this.memory.getFloat64(
        freeEntryOffset * PageTable.ENTRY_SIZE
      );
    }

    if (freeEntryOffset === PageTable.EMPTY_FREE_LIST) {
      return;
    }

    if (prevFreeEntryOffset === PageTable.EMPTY_FREE_LIST) {
      this.freeList = this.memory.getFloat64(
        freeEntryOffset * PageTable.ENTRY_SIZE
      );
    }

    if (prevFreeEntryOffset !== PageTable.EMPTY_FREE_LIST) {
      this.memory.setFloat64(
        prevFreeEntryOffset * PageTable.ENTRY_SIZE,
        this.memory.getFloat64(freeEntryOffset * PageTable.ENTRY_SIZE)
      );
    }
  }

  private isValidEntryOffset(entryOffset: number): boolean {
    return (
      this.entryIsWithinBounds(entryOffset) && Number.isInteger(entryOffset)
    );
  }

  private entryIsWithinBounds(entryOffset: number): boolean {
    return entryOffset >= 0 && entryOffset <= PageTable.NUM_OF_ENTRIES - 1;
  }

  private isFreeEntry(entryOffset: number): boolean {
    let freeEntryOffset = this.freeList;
    while (freeEntryOffset !== PageTable.EMPTY_FREE_LIST) {
      if (entryOffset === freeEntryOffset) {
        return true;
      }
      freeEntryOffset = this.memory.getFloat64(
        freeEntryOffset * PageTable.ENTRY_SIZE
      );
    }
    return false;
  }
}
