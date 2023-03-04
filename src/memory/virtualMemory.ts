import { PageTable } from './pageTable';

export class virtualMemory {
  private readonly l1PageTable: PageTable = new PageTable();
  private readonly l2PageTables: PageTable[] = [];
  private readonly l3PageTables: PageTable[] = [];
  private readonly l4PageTables: PageTable[] = [];
  private readonly l5PageTables: PageTable[] = [];

  private readonly textBaseAddress: number;
  private readonly dataBaseAddress: number;
  private readonly stackBaseAddress: number;
  private readonly heapBaseAddress: number;

  /**
   * Initializes the size of each segment. Size is the number of entries allocated to the segment.
   */
  constructor(
    textSize: number,
    dataSize: number,
    stackSize: number,
    heapSize: number
  ) {
    this.textBaseAddress = this.allocateEntries(textSize);
    this.dataBaseAddress = this.allocateEntries(dataSize);
    this.stackBaseAddress = this.allocateEntries(stackSize);
    this.heapBaseAddress = this.allocateEntries(heapSize);
  }

  private makeAddress(
    l1Idx: number,
    l2Idx: number,
    l3Idx: number,
    l4Idx: number,
    l5Idx: number
  ): number {
    // l1 to l4 indexes occupy 9 bits each
    const l1ToL4Ids = [l1Idx, l2Idx, l3Idx, l4Idx];
    let address = 0;
    l1ToL4Ids.forEach((idx) => {
      address <<= 9;
      address |= idx;
    });

    // l5 index occupies 12 bits. First 9 bits index to an entry.
    // Last 3 bits index to within the entry.
    address <<= 12;
    address |= l5Idx;
    return address;
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

    return this.makeAddress(
      l1NewEntriesStartIdx,
      l2AllocationData.newEntriesStartIdx,
      l3AllocationData.newEntriesStartIdx,
      l4AllocationData.newEntriesStartIdx,
      l5AllocationData.newEntriesStartIdx
    );
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
