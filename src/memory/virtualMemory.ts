import { PageTable } from './pageTable';
import { AddressIndex } from './addressIndex';
import { Segment } from './segment';
import { SegmentAddress } from './segmentAddress';
import { MemoryError, MemoryErrorType } from './memoryError';
import {
  type DeclarationNameWithAddress,
  type DeclarationNameWithValue
} from '../interpreter/types/interpreter';

export class VirtualMemory {
  readonly l1PageTable: PageTable = new PageTable();
  readonly l2PageTables: PageTable[] = [];
  readonly l3PageTables: PageTable[] = [];
  readonly l4PageTables: PageTable[] = [];
  readonly l5PageTables: PageTable[] = [];

  readonly segmentAddresses: Map<Segment, SegmentAddress> = new Map<
    Segment,
    SegmentAddress
  >();

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
        dataBaseAddress + dataSize * PageTable.ENTRY_SIZE
      )
    );
    this.segmentAddresses.set(
      Segment.STACK,
      new SegmentAddress(
        stackBaseAddress,
        stackBaseAddress,
        stackBaseAddress + stackSize * PageTable.ENTRY_SIZE
      )
    );
    this.segmentAddresses.set(
      Segment.HEAP,
      new SegmentAddress(
        heapBaseAddress,
        heapBaseAddress,
        heapBaseAddress + heapSize * PageTable.ENTRY_SIZE
      )
    );
    this.rbp = stackBaseAddress;
    this.rsp = stackBaseAddress - PageTable.ENTRY_SIZE;
  }

  public stackAllocate(data: number): number {
    this.rsp += PageTable.ENTRY_SIZE;
    this.setFree(this.rsp, data);
    return this.rsp;
  }

  public stackGetByOffset(offset: number): number {
    const address = this.rbp + offset * PageTable.ENTRY_SIZE;
    return this.get(address);
  }

  public stackFunctionCallSetup(args: number[]): number[] {
    this.stackAllocate(this.rbp);
    this.stackAllocate(this.rsp);
    this.rbp = this.rsp + PageTable.ENTRY_SIZE;

    this.rsp += args.length > 0 ? (args.length - 1) * PageTable.ENTRY_SIZE : 0;
    const addresses: number[] = [];
    for (let i = 0; i < args.length; i++) {
      const address = this.rbp + i * PageTable.ENTRY_SIZE;
      this.setFree(address, args[i]);
      addresses.push(address);
    }
    return addresses;
  }

  public stackFunctionCallTeardown(): void {
    let fp = this.rsp;
    // Get saved rsp and subtract space taken to store rbp
    this.rsp = this.get(this.rbp - PageTable.ENTRY_SIZE) - PageTable.ENTRY_SIZE;
    this.rbp = this.get(this.rbp - 2 * PageTable.ENTRY_SIZE);
    while (fp > this.rbp) {
      this.free(fp);
      fp -= PageTable.ENTRY_SIZE;
    }
  }

  // Sets up stack for function call and returns address of parameters
  public stackFunctionCallAllocate(
    paramsWithValues: DeclarationNameWithValue[]
  ): DeclarationNameWithAddress[] {
    this.stackAllocate(this.rbp);
    this.stackAllocate(this.rsp);
    this.rbp = this.rsp;

    const paramWithAddresses: DeclarationNameWithAddress[] = [];
    this.rsp += paramsWithValues.length * PageTable.ENTRY_SIZE;
    for (let i = 0; i < paramsWithValues.length; i++) {
      const address = this.rbp + i * PageTable.ENTRY_SIZE;
      this.setFree(address, paramsWithValues[i].value);
      paramWithAddresses.push({
        name: paramsWithValues[i].name,
        nameType: paramsWithValues[i].nameType,
        address
      });
    }
    return paramWithAddresses;
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
