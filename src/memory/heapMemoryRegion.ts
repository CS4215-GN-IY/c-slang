import { DataViewMemoryRegion } from './dataViewMemoryRegion';

interface AllocatedBlock {
  base: number;
  top: number;
}

/**
 * Heap memory region with a first-fit allocator.
 */
export class HeapMemoryRegion extends DataViewMemoryRegion {
  private readonly highestByteOffset: number;
  private allocatedBlocks: AllocatedBlock[];

  public constructor(sizeInBytes: number) {
    super(sizeInBytes);
    this.highestByteOffset = sizeInBytes;
    this.allocatedBlocks = [];
  }

  /**
   * Attempts to allocate a block of the specified size.
   * Returns the offset of the block if the allocation
   * is successful and -1 otherwise.
   *
   * @param sizeInBytes The size of the block to allocate.
   */
  public allocate(sizeInBytes: number): number {
    let currentBase = 0;
    let i = 0;
    // Loop over the allocated blocks to find the next free space
    // which can hold the new block.
    for (; i < this.allocatedBlocks.length; i++) {
      const nextBlock = this.allocatedBlocks[i];
      if (nextBlock.base - currentBase >= sizeInBytes) {
        break;
      }
      currentBase = nextBlock.top;
    }
    // Return -1 since we were unable to find a sufficiently large
    // free space.
    if (this.highestByteOffset - currentBase < sizeInBytes) {
      return -1;
    }
    // Otherwise, we found a sufficiently large free space.
    const newBlock = {
      base: currentBase,
      top: currentBase + sizeInBytes
    };
    // Add the new block to the allocated blocks list then return
    // the base address.
    this.allocatedBlocks.splice(i, 0, newBlock);
    return currentBase;
  }

  /**
   * Deallocates the block starting at the specified offset
   * if it is allocated.
   *
   * @param byteOffset The offset of the block to deallocate.
   */
  public free(byteOffset: number): void {
    this.allocatedBlocks = this.allocatedBlocks.filter(
      (block) => block.base !== byteOffset
    );
  }
}
