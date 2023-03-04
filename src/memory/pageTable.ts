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
    this.memory.setFloat64(i, PageTable.EMPTY_FREE_LIST);
  }

  /**
   * Gets the data from the entry at the offset.
   * Note: This should be the offset to an entry (9 bits),
   * not an offset to the within the entry (12 bits)
   */
  public get(offset: number): number {
    if (!this.isValidOffset(offset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, offset);
    }

    return this.memory.getFloat64(offset * PageTable.ENTRY_SIZE);
  }

  /**
   * Sets the first free entry in the free list to contain data.
   */
  public setFreeEntry(data: number): number {
    const offset = this.freeList;

    if (!this.isValidOffset(offset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, offset);
    }

    this.freeList = this.get(offset);
    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, data);
    return offset;
  }

  /**
   * Sets a free entry to contain data.
   */
  public setFreeEntryAt(offset: number, data: number): number {
    if (!this.isValidOffset(offset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, offset);
    }

    assert(this.isFree(offset), 'Offset must be free.');

    this.removeFromFreeList(offset);
    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, data);
    return offset;
  }

  /**
   * Updates the data contained in a used entry.
   */
  public setAllocatedEntry(offset: number, data: number): void {
    if (!this.isValidOffset(offset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, offset);
    }

    assert(!this.isFree(offset), 'Only allocated entries can be set.');

    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, data);
  }

  /**
   * Frees entry at offset.
   */
  public free(offset: number): void {
    if (!this.isValidOffset(offset)) {
      throw new MemoryError(MemoryErrorType.INVALID_OFFSET, offset);
    }

    assert(!this.isFree(offset), 'Only allocated entries can be freed.');

    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, this.freeList);
    this.freeList = offset;
  }

  private removeFromFreeList(offset: number): void {
    let prevFreeOffset = PageTable.EMPTY_FREE_LIST;
    let freeOffset = this.freeList;
    while (freeOffset !== offset && freeOffset !== PageTable.EMPTY_FREE_LIST) {
      prevFreeOffset = freeOffset;
      freeOffset = this.get(freeOffset);
    }

    if (freeOffset === PageTable.EMPTY_FREE_LIST) {
      return;
    }

    if (prevFreeOffset === PageTable.EMPTY_FREE_LIST) {
      this.freeList = this.get(freeOffset);
    }

    if (prevFreeOffset !== PageTable.EMPTY_FREE_LIST) {
      this.memory.setFloat64(
        prevFreeOffset * PageTable.ENTRY_SIZE,
        this.get(freeOffset)
      );
    }
  }

  private isValidOffset(offset: number): boolean {
    return this.isWithinBounds(offset) && Number.isInteger(offset);
  }

  private isWithinBounds(offset: number): boolean {
    return offset >= 0 && offset <= PageTable.NUM_OF_ENTRIES - 1;
  }

  private isFree(offset: number): boolean {
    let freeOffset = this.freeList;
    while (freeOffset !== PageTable.EMPTY_FREE_LIST) {
      if (offset === freeOffset) {
        return true;
      }
      freeOffset = this.get(freeOffset);
    }
    return false;
  }
}
