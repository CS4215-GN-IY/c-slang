import { PageTable } from './pageTable';
import { AddressIndex } from './addressIndex';
import { Segment } from './segment';
import { SegmentAddress } from './segmentAddress';
import { MemoryError, MemoryErrorType } from './memoryError';

export class VirtualMemory {
  readonly l1PageTable: PageTable = new PageTable();
  readonly l2PageTables: PageTable[] = [];
  readonly l3PageTables: PageTable[] = [];
  readonly l4PageTables: PageTable[] = [];
  readonly l5PageTables: PageTable[] = [];

  readonly segmentAddresses: Record<Segment, SegmentAddress>;

  private rbp: number;
  private rsp: number;

  /**
   * Initializes the size of each segment. Size is the number of entries allocated to the segment.
   */
  constructor(
    textSize: number,
    dataSize: number,
    stackSize: number,
    heapSize: number
  ) {
    const textBaseAddress = 0;
    const dataBaseAddress = textBaseAddress + textSize * PageTable.ENTRY_SIZE;
    const stackBaseAddress = dataBaseAddress + dataSize * PageTable.ENTRY_SIZE;
    const heapBaseAddress = stackBaseAddress + stackSize * PageTable.ENTRY_SIZE;

    this.allocatePageTables(textBaseAddress, textSize);
    this.allocatePageTables(dataBaseAddress, dataSize);
    this.allocatePageTables(stackBaseAddress, stackSize);
    this.allocatePageTables(heapBaseAddress, heapSize);

    const textSegmentAddress = new SegmentAddress(
      textBaseAddress,
      textBaseAddress,
      textBaseAddress + textSize * PageTable.ENTRY_SIZE
    );
    const dataSegmentAddress = new SegmentAddress(
      dataBaseAddress,
      dataBaseAddress,
      dataBaseAddress + dataSize * PageTable.ENTRY_SIZE
    );
    const stackSegmentAddress = new SegmentAddress(
      stackBaseAddress,
      stackBaseAddress,
      stackBaseAddress + stackSize * PageTable.ENTRY_SIZE
    );
    const heapSegmentAddress = new SegmentAddress(
      heapBaseAddress,
      heapBaseAddress,
      heapBaseAddress + heapSize * PageTable.ENTRY_SIZE
    );

    this.segmentAddresses = {
      [Segment.TEXT]: textSegmentAddress,
      [Segment.DATA]: dataSegmentAddress,
      [Segment.STACK]: stackSegmentAddress,
      [Segment.HEAP]: heapSegmentAddress
    };
    this.rbp = stackBaseAddress;
    this.rsp = this.rbp;
  }

  public dataAllocate(numOfEntries: number): void {
    const placeholderData = 0;
    let address = this.segmentAddresses[Segment.DATA].baseAddress;
    for (let i = 0; i < numOfEntries; i++) {
      this.setFree(address, placeholderData);
      address += PageTable.ENTRY_SIZE;
    }
  }

  public dataGetAddressAtOffset(offset: number): number {
    return (
      this.segmentAddresses[Segment.DATA].baseAddress +
      offset * PageTable.ENTRY_SIZE
    );
  }

  public stackGetAddressAtOffset(offset: number): number {
    return this.rbp + offset * PageTable.ENTRY_SIZE;
  }

  public dataGetByOffset(offset: number): number {
    const address =
      this.segmentAddresses[Segment.DATA].baseAddress +
      offset * PageTable.ENTRY_SIZE;
    return this.get(address);
  }

  public dataSetByOffset(offset: number, data: number): void {
    const address =
      this.segmentAddresses[Segment.DATA].baseAddress +
      offset * PageTable.ENTRY_SIZE;
    this.set(address, data);
  }

  public stackGetByOffset(offset: number): number {
    const address = this.rbp + offset * PageTable.ENTRY_SIZE;
    return this.get(address);
  }

  public stackSetByOffset(offset: number, data: number): void {
    const address = this.rbp + offset * PageTable.ENTRY_SIZE;
    this.set(address, data);
  }

  public stackAllocate(data: number): void {
    this.setFree(this.rsp, data);
    this.rsp += PageTable.ENTRY_SIZE;
  }

  public stackFunctionCallSetup(
    args: number[],
    numOfEntriesForVars: number,
    returnAddress: number
  ): void {
    /*
    Structure of frame is as such:
                   <- rsp
    -------------
    Local vars     <- rbp
    -------------
    Return address
    -------------
    Saved rsp
    -------------
    Saved rbp
    -------------
    Params/Args   <- prev rsp which is stored as Saved rsp
    -------------
     */
    const savedRsp = this.rsp;
    args.forEach((arg) => {
      this.stackAllocate(arg);
    });
    this.stackAllocate(this.rbp);
    this.stackAllocate(savedRsp);
    this.stackAllocate(returnAddress);
    this.rbp = this.rsp;
    const placeholderData = 0;
    for (let i = 0; i < numOfEntriesForVars; i++) {
      this.stackAllocate(placeholderData);
    }
  }

  public getReturnAddress(): number {
    return this.get(this.rbp - PageTable.ENTRY_SIZE);
  }

  public stackFunctionCallTeardown(): void {
    const savedRbp = this.get(this.rbp - 3 * PageTable.ENTRY_SIZE);
    const savedRsp = this.get(this.rbp - 2 * PageTable.ENTRY_SIZE);
    let fp = this.rsp;
    while (fp > savedRsp) {
      fp -= PageTable.ENTRY_SIZE;
      this.free(fp);
    }
    this.rsp = savedRsp;
    this.rbp = savedRbp;
  }

  public getByOffsetFromAddress(baseAddress: number, offset: number): number {
    const address = baseAddress + offset * PageTable.ENTRY_SIZE;
    return this.get(address);
  }

  public getAddressByOffset(baseAddress: number, offset: number): number {
    return baseAddress + offset * PageTable.ENTRY_SIZE;
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
    const segmentAddress = this.segmentAddresses[segment];
    if (segmentAddress === undefined) {
      throw new MemoryError(MemoryErrorType.INVALID_SEGMENT, segment);
    }
    if (segmentAddress.hasReachedTop()) {
      throw new MemoryError(
        MemoryErrorType.SEGMENTATION_FAULT,
        segmentAddress.getFreeAddress()
      );
    }
    const address = segmentAddress.getFreeAddress();
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.setFreeEntryAt(addressIndex.getL5EntryOffset(), data);
    segmentAddress.updateFreeAddress(address + PageTable.ENTRY_SIZE);
    return address;
  }

  /**
   * Sets data at a free entry.
   */
  private setFree(address: number, data: number): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.setFreeEntryAt(addressIndex.getL5EntryOffset(), data);
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
    const l5PageTableIdx = this.l4PageTables[l4PageTableIdx].get(
      addressIndex.l4Idx
    );
    return this.l5PageTables[l5PageTableIdx];
  }

  private allocatePageTables(baseAddress: number, numOfEntries: number): void {
    const ids = AddressIndex.fromAddress(baseAddress);
    const numOfNewL5PageTables = this.allocateLevelPageTables(
      ids.getL5EntryOffset(),
      this.l5PageTables,
      numOfEntries
    );
    const numOfNewL4PageTables = this.allocateLevelPageTables(
      ids.l4Idx,
      this.l4PageTables,
      numOfNewL5PageTables,
      ids.getL5EntryOffset(),
      this.l5PageTables.length - numOfNewL5PageTables
    );
    const numOfNewL3PageTables = this.allocateLevelPageTables(
      ids.l3Idx,
      this.l3PageTables,
      numOfNewL4PageTables,
      ids.l4Idx,
      this.l4PageTables.length - numOfNewL4PageTables
    );
    const numOfNewL2PageTables = this.allocateLevelPageTables(
      ids.l2Idx,
      this.l2PageTables,
      numOfNewL3PageTables,
      ids.l3Idx,
      this.l3PageTables.length - numOfNewL3PageTables
    );
    this.updatePageTableEntries(
      this.l1PageTable,
      ids.l1Idx,
      numOfNewL2PageTables,
      ids.l2Idx,
      this.l2PageTables.length - numOfNewL2PageTables
    );
  }

  private allocateLevelPageTables(
    idxInPageTable: number,
    levelPageTables: PageTable[],
    numOfEntries: number,
    firstEntryIdx?: number,
    firstEntryData?: number
  ): number {
    const prevLastTableIdx = levelPageTables.length - 1;
    const numOfEntriesInLastTable =
      idxInPageTable === 0 ? 0 : PageTable.NUM_OF_ENTRIES - idxInPageTable - 1;
    const numOfNewPageTables = Math.max(
      Math.ceil(
        (numOfEntries - numOfEntriesInLastTable) / PageTable.NUM_OF_ENTRIES
      ),
      0
    );
    this.addNewPageTables(numOfNewPageTables, levelPageTables);
    const newEntriesStartIdx =
      firstEntryIdx === 0 ? idxInPageTable : idxInPageTable + 1;
    if (firstEntryData !== undefined) {
      this.updatePageTablesEntries(
        prevLastTableIdx,
        levelPageTables,
        newEntriesStartIdx,
        numOfEntries,
        firstEntryData
      );
    }
    return numOfNewPageTables;
  }

  private addNewPageTables(
    numOfPageTables: number,
    levelPageTables: PageTable[]
  ): void {
    for (let i = 0; i < numOfPageTables; i++) {
      levelPageTables.push(new PageTable());
    }
  }

  private updatePageTableEntries(
    pageTable: PageTable,
    idxInPageTable: number,
    numOfEntries: number,
    firstEntryIdx: number,
    firstEntryData: number
  ): void {
    const newEntriesStartIdx =
      firstEntryIdx === 0 ? idxInPageTable : idxInPageTable + 1;
    for (let i = firstEntryData; i < firstEntryData + numOfEntries; i++) {
      if (newEntriesStartIdx >= PageTable.NUM_OF_ENTRIES) {
        return;
      }
      pageTable.setFreeEntryAt(newEntriesStartIdx, i);
      idxInPageTable = (newEntriesStartIdx + 1) % PageTable.NUM_OF_ENTRIES;
    }
  }

  private updatePageTablesEntries(
    pageTableIdx: number,
    levelPageTables: PageTable[],
    idxInPageTable: number,
    numOfEntries: number,
    firstEntryData: number
  ): void {
    let pageTable = levelPageTables[pageTableIdx];
    for (let i = firstEntryData; i < firstEntryData + numOfEntries; i++) {
      if (idxInPageTable === 0) {
        pageTableIdx += 1;
        pageTable = levelPageTables[pageTableIdx];
      }
      pageTable.setFreeEntryAt(idxInPageTable, i);
      idxInPageTable = (idxInPageTable + 1) % PageTable.NUM_OF_ENTRIES;
    }
  }
}
