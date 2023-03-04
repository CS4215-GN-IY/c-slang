import { PageTable } from './pageTable';
import { AddressIndex } from './addressIndex';
import { Segment } from './segment';
import { SegmentAddress } from './segmentAddress';

export class virtualMemory {
  private readonly l1PageTable: PageTable = new PageTable();
  private readonly l2PageTables: PageTable[] = [];
  private readonly l3PageTables: PageTable[] = [];
  private readonly l4PageTables: PageTable[] = [];
  private readonly l5PageTables: PageTable[] = [];

  private readonly segmentAddresses: Map<Segment, SegmentAddress> = new Map<
    Segment,
    SegmentAddress
  >();

  /**
   * Initializes the size of each segment. Size is the number of entries allocated to the segment.
   */
  constructor(
    textSize: number,
    dataSize: number,
    stackSize: number,
    heapSize: number
  ) {
    const textBaseAddress = this.allocateEntries(textSize);
    const dataBaseAddress = this.allocateEntries(dataSize);
    const stackBaseAddress = this.allocateEntries(stackSize);
    const heapBaseAddress = this.allocateEntries(heapSize);

    this.segmentAddresses.set(
      Segment.TEXT,
      new SegmentAddress(
        textBaseAddress,
        textBaseAddress,
        textBaseAddress + textSize * PageTable.ENTRY_SIZE
      )
    );
    this.segmentAddresses.set(
      Segment.DATA,
      new SegmentAddress(
        dataBaseAddress,
        dataBaseAddress,
        dataBaseAddress + dataSize * PageTable.NUM_OF_ENTRIES
      )
    );
    this.segmentAddresses.set(
      Segment.STACK,
      new SegmentAddress(
        stackBaseAddress,
        stackBaseAddress,
        stackBaseAddress + stackSize * PageTable.NUM_OF_ENTRIES
      )
    );
    this.segmentAddresses.set(
      Segment.HEAP,
      new SegmentAddress(
        heapBaseAddress,
        heapBaseAddress,
        heapBaseAddress + heapSize * PageTable.NUM_OF_ENTRIES
      )
    );
  }

  /**
   * Gets data from entry at address.
   */
  public get(address: number): number {
    const ids = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(ids);
    return l5PageTable.get(ids.getL5EntryOffset());
  }

  /**
   * Allocates data to the top of the segment.
   */
  public allocate(data: number, segment: Segment): number {
    const segmentAddress = this.segmentAddresses.get(segment);
    if (segmentAddress === undefined) {
      return -1;
    }
    if (segmentAddress.hasReachedTop()) {
      return -1;
    }
    const address = segmentAddress.getFreeAddress();
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.setFreeEntryAt(addressIndex.getL5EntryOffset(), data);
    segmentAddress.updateFreeAddress(address + PageTable.ENTRY_SIZE);
    return address;
  }

  /**
   * Updates entry at address to store data.
   * The address must have been allocated previously. It cannot be a free address.
   */
  public set(address: number, data: number): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.setAllocatedEntry(addressIndex.getL5EntryOffset(), data);
  }

  /**
   * Frees address.
   */
  public free(address: number): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.free(addressIndex.getL5EntryOffset());
  }

  private getL5PageTable(addressIndex: AddressIndex): PageTable {
    const l2PageTableIdx = this.l1PageTable.get(addressIndex.l1Idx);
    const l3PageTableIdx = this.l2PageTables[l2PageTableIdx].get(
      addressIndex.l2Idx
    );
    const l4PageTableIdx = this.l3PageTables[l3PageTableIdx].get(
      addressIndex.l3Idx
    );
    return this.l4PageTables[l4PageTableIdx];
  }

  private allocateEntries(numOfEntries: number): number {
    const l5AllocationData = this.allocateNewPageTables(
      this.l5PageTables,
      numOfEntries
    );
    const l4AllocationData = this.allocateNewPageTables(
      this.l4PageTables,
      l5AllocationData.numOfNewPageTables,
      l5AllocationData.newPageTablesStartIdx
    );
    const l3AllocationData = this.allocateNewPageTables(
      this.l3PageTables,
      l4AllocationData.numOfNewPageTables,
      l4AllocationData.newPageTablesStartIdx
    );
    const l2AllocationData = this.allocateNewPageTables(
      this.l2PageTables,
      l3AllocationData.numOfNewPageTables,
      l3AllocationData.newPageTablesStartIdx
    );
    const l1NewEntriesStartIdx = this.allocateNewEntriesInPageTable(
      this.l1PageTable,
      l2AllocationData.numOfNewPageTables,
      l2AllocationData.newPageTablesStartIdx
    );

    const addressIndex = AddressIndex.fromIds(
      l1NewEntriesStartIdx,
      l2AllocationData.newEntriesStartIdx,
      l3AllocationData.newEntriesStartIdx,
      l4AllocationData.newEntriesStartIdx,
      l5AllocationData.newEntriesStartIdx
    );
    return addressIndex.getAddress();
  }

  private allocateNewEntriesInPageTable(
    pageTable: PageTable,
    numOfEntries: number,
    newEntriesStartIdx: number
  ): number {
    const firstNewEntryIdx = pageTable.getFreeOffset();
    for (
      let i = newEntriesStartIdx;
      i < newEntriesStartIdx + numOfEntries;
      i++
    ) {
      pageTable.setFreeEntry(i);
    }
    return firstNewEntryIdx;
  }

  private allocateNewPageTables(
    pageTables: PageTable[],
    numOfEntries: number,
    newEntriesStartValue?: number
  ): PageTablesAllocationData {
    const newPageTablesStartIdx = pageTables.length;
    const numOfFreeEntriesInLastPageTable =
      pageTables[pageTables.length - 1].getNumOfFreeEntries();
    const numOfNewPageTables = Math.ceil(
      (numOfEntries - numOfFreeEntriesInLastPageTable) /
        PageTable.NUM_OF_ENTRIES
    );
    this.addNewPageTables(numOfNewPageTables, pageTables);
    const firstNewEntryIdx =
      numOfFreeEntriesInLastPageTable > 0
        ? pageTables[newPageTablesStartIdx - 1].getFreeOffset()
        : pageTables[newPageTablesStartIdx].getFreeOffset();

    if (newEntriesStartValue === undefined) {
      return new PageTablesAllocationData(
        firstNewEntryIdx,
        newPageTablesStartIdx,
        numOfNewPageTables
      );
    }

    this.storeChildPageTableIds(
      pageTables,
      newPageTablesStartIdx - 1,
      newEntriesStartValue,
      numOfEntries
    );
    return new PageTablesAllocationData(
      firstNewEntryIdx,
      newPageTablesStartIdx,
      numOfNewPageTables
    );
  }

  private addNewPageTables(
    numOfPageTables: number,
    levelPageTables: PageTable[]
  ): void {
    for (let i = 0; i < numOfPageTables; i++) {
      levelPageTables.push(new PageTable());
    }
  }

  /**
   * Stores the index of each child (lower level) page table,
   * in an entry of the parent (higher level) page table.
   *
   * @return index to the first allocated entry in the parent page table.
   */
  private storeChildPageTableIds(
    parentPageTables: PageTable[],
    parentPageTableStartIdx: number,
    childPageTableStartIdx: number,
    numOfNewChildIds: number
  ): void {
    let parentPageTableIdx = parentPageTableStartIdx;
    for (
      let i = childPageTableStartIdx;
      i < childPageTableStartIdx + numOfNewChildIds;
      i++
    ) {
      if (parentPageTables[parentPageTableIdx].isFull()) {
        parentPageTableIdx += 1;
      }

      const parentPageTable = parentPageTables[parentPageTableIdx];
      parentPageTable.setFreeEntry(i);
    }
  }
}

class PageTablesAllocationData {
  readonly newEntriesStartIdx: number;
  readonly newPageTablesStartIdx: number;
  readonly numOfNewPageTables: number;

  constructor(
    newEntriesStartIdx: number,
    newPageTableStartIdx: number,
    numOfNewPageTables: number
  ) {
    this.newEntriesStartIdx = newEntriesStartIdx;
    this.newPageTablesStartIdx = newPageTableStartIdx;
    this.numOfNewPageTables = numOfNewPageTables;
  }
}
