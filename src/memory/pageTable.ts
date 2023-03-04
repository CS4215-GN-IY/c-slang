import assert from 'assert';

export class PageTable {
  public static readonly NUM_OF_ENTRIES: number = 512;
  public static readonly ENTRY_SIZE: number = 8;
  private static readonly EMPTY_FREE_LIST: number = -1;

  private readonly memory: DataView;
  private freeList: number;
  private numOfFreeEntries: number;

  constructor() {
    const data = new ArrayBuffer(
      PageTable.NUM_OF_ENTRIES * PageTable.ENTRY_SIZE
    );
    this.memory = new DataView(data);

    // The free list is made of entries, where each free entry carries the offset of the next free entry
    this.freeList = 0;
    let i;
    for (i = this.freeList; i <= PageTable.NUM_OF_ENTRIES; i++) {
      this.memory.setFloat64(i * PageTable.ENTRY_SIZE, i + 1);
    }
    this.memory.setFloat64(i, PageTable.EMPTY_FREE_LIST);
    this.numOfFreeEntries = PageTable.NUM_OF_ENTRIES;
  }

  /**
   * Gets the data from the entry at the offset.
   * Note: This should be the offset to an entry (9 bits),
   * not an offset to the within the entry (12 bits)
   */
  public get(offset: number): number {
    if (!this.isValidOffset(offset)) {
      return -1;
    }

    return this.memory.getFloat64(offset * PageTable.ENTRY_SIZE);
  }

  /**
   * Sets the first free entry in the free list to contain data.
   */
  public setFreeEntry(data: number): number {
    const offset = this.freeList;

    if (!this.isValidOffset(offset)) {
      return -1;
    }

    this.freeList = this.get(offset);
    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, data);
    this.numOfFreeEntries -= 1;
    return offset;
  }

  /**
   * Updates the data contained in a used entry.
   */
  public setAllocatedEntry(offset: number, data: number): void {
    if (!this.isValidOffset(offset)) {
      return;
    }

    assert(!this.isFree(offset), 'Only allocated entries can be set.');

    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, data);
  }

  /**
   * Frees entry at offset.
   */
  public free(offset: number): void {
    if (!this.isValidOffset(offset)) {
      return;
    }

    assert(!this.isFree(offset), 'Only allocated entries can be freed.');

    this.memory.setFloat64(offset * PageTable.ENTRY_SIZE, this.freeList);
    this.freeList = offset;
    this.numOfFreeEntries += 1;
  }

  public getFreeOffset(): number {
    return this.freeList;
  }

  public getNumOfFreeEntries(): number {
    return this.numOfFreeEntries;
  }

  public isFull(): boolean {
    return this.numOfFreeEntries === 0;
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
        return false;
      }
      freeOffset = this.get(freeOffset);
    }
    return true;
  }
}
