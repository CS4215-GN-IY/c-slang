import { PageTable } from './pageTable';
import { AddressIndex } from './addressIndex';
import { Segment } from './segment';
import { SegmentAddress } from './segmentAddress';
import { type ValueWithDataType } from '../interpreter/types/virtualMachine';
import {
  ADDRESS_SIZE_IN_BYTES,
  constructAddressDataType,
  type DataType,
  FLOAT64
} from '../ast/types/dataTypes';

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
    return this.segmentAddresses[Segment.DATA].baseAddress + offset;
  }

  public stackGetAddressAtOffset(offset: number): number {
    return this.rbp + offset;
  }

  public dataGetByOffset(offset: number, dataType: DataType): number {
    const address = this.segmentAddresses[Segment.DATA].baseAddress + offset;
    return this.get(address, dataType);
  }

  public dataSetByOffset(
    offset: number,
    data: number,
    dataType: DataType
  ): void {
    const address = this.segmentAddresses[Segment.DATA].baseAddress + offset;
    this.set(address, data, dataType);
  }

  public stackGetByOffset(offset: number, dataType: DataType): number {
    const address = this.rbp + offset;
    return this.get(address, dataType);
  }

  public stackSetByOffset(
    offset: number,
    data: number,
    dataType: DataType
  ): void {
    const address = this.rbp + offset;
    this.set(address, data, dataType);
  }

  public stackAllocate(data: number): void {
    this.setFree(this.rsp, data);
    this.rsp += PageTable.ENTRY_SIZE;
  }

  public stackFunctionCallSetup(
    args: ValueWithDataType[],
    numOfEntriesForArgs: number,
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
    const placeholderData = 0;
    for (let i = 0; i < numOfEntriesForArgs; i++) {
      this.stackAllocate(placeholderData);
    }
    this.stackAllocate(this.rbp);
    this.stackAllocate(savedRsp);
    this.stackAllocate(returnAddress);
    this.rbp = this.rsp;
    for (let i = 0; i < numOfEntriesForVars; i++) {
      this.stackAllocate(placeholderData);
    }
    let argAddress = this.rbp - 3 * PageTable.ENTRY_SIZE;
    args.forEach((arg) => {
      argAddress = argAddress - arg.dataType.sizeInBytes;
      this.set(argAddress, arg.value, arg.dataType);
    });
  }

  public getReturnAddress(): number {
    return this.get(
      this.rbp - ADDRESS_SIZE_IN_BYTES,
      constructAddressDataType(FLOAT64)
    );
  }

  public stackFunctionCallTeardown(): void {
    const savedRbp = this.get(
      this.rbp - 3 * ADDRESS_SIZE_IN_BYTES,
      constructAddressDataType(FLOAT64)
    );
    const savedRsp = this.get(
      this.rbp - 2 * ADDRESS_SIZE_IN_BYTES,
      constructAddressDataType(FLOAT64)
    );
    let fp = this.rsp;
    while (fp > savedRsp) {
      fp -= PageTable.ENTRY_SIZE;
      this.free(fp);
    }
    this.rsp = savedRsp;
    this.rbp = savedRbp;
  }

  public getByOffsetFromAddress(
    baseAddress: number,
    offset: number,
    dataType: DataType
  ): number {
    const address = baseAddress + offset;
    return this.get(address, dataType);
  }

  public getAddressByOffset(baseAddress: number, offset: number): number {
    return baseAddress + offset;
  }

  public get(address: number, dataType: DataType): number {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    const offset = addressIndex.l5Idx;
    switch (dataType.type) {
      case 'Integer':
        if (dataType.isSigned) {
          switch (dataType.sizeInBytes) {
            case 1:
              return l5PageTable.getInt8(offset);
            case 2:
              return l5PageTable.getInt16(offset);
            case 4:
              return l5PageTable.getInt32(offset);
            case 8:
              // FIXME: Only up to 53-bit integers are supported.
              return Number(l5PageTable.getInt64(offset));
            default:
              throw new TypeError(
                `Tried to get an invalid Int size in the memory: ${dataType.sizeInBytes}`
              );
          }
        } else {
          switch (dataType.sizeInBytes) {
            case 1:
              return l5PageTable.getUint8(offset);
            case 2:
              return l5PageTable.getUint16(offset);
            case 4:
              return l5PageTable.getUint32(offset);
            case 8:
              // FIXME: Only up to 53-bit integers are supported.
              return Number(l5PageTable.getUint64(offset));
            default:
              throw new TypeError(
                `Tried to get an invalid Uint size in the memory: ${dataType.sizeInBytes}`
              );
          }
        }
      case 'FloatingPoint':
        switch (dataType.sizeInBytes) {
          case 4:
            return l5PageTable.getFloat32(offset);
          case 8:
            return l5PageTable.getFloat64(offset);
          default:
            throw new TypeError(
              `Tried to get an invalid FloatingPoint size in the memory: ${dataType.sizeInBytes}`
            );
        }
      case 'Address':
        switch (dataType.sizeInBytes) {
          case 8:
            return l5PageTable.getFloat64(offset);
          default:
            throw new TypeError(
              `Tried to get an invalid Address size in the memory`
            );
        }
      default:
        throw new TypeError(
          `Tried to get an invalid type in the memory: ${dataType.type}`
        );
    }
  }

  private setFree(address: number, data: number): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.setFreeEntryAt(addressIndex.getL5EntryOffset(), data);
  }

  public set(address: number, value: number, dataType: DataType): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    const offset = addressIndex.l5Idx;
    switch (dataType.type) {
      case 'Integer':
        if (dataType.isSigned) {
          switch (dataType.sizeInBytes) {
            case 1:
              l5PageTable.setInt8(offset, value);
              break;
            case 2:
              l5PageTable.setInt16(offset, value);
              break;
            case 4:
              l5PageTable.setInt32(offset, value);
              break;
            case 8:
              l5PageTable.setInt64(offset, BigInt(value));
              break;
            default:
              throw new TypeError(
                `Tried to set an invalid Int size in the memory: ${dataType.sizeInBytes}`
              );
          }
        } else {
          switch (dataType.sizeInBytes) {
            case 1:
              l5PageTable.setUint8(offset, value);
              break;
            case 2:
              l5PageTable.setUint16(offset, value);
              break;
            case 4:
              l5PageTable.setUint32(offset, value);
              break;
            case 8:
              l5PageTable.setUint64(offset, BigInt(value));
              break;
            default:
              throw new TypeError(
                `Tried to set an invalid Uint size in the memory: ${dataType.sizeInBytes}`
              );
          }
        }
        break;
      case 'FloatingPoint':
        switch (dataType.sizeInBytes) {
          case 4:
            l5PageTable.setFloat32(offset, value);
            break;
          case 8:
            l5PageTable.setFloat64(offset, value);
            break;
          default:
            throw new TypeError(
              `Tried to set an invalid FloatingPoint size in the memory: ${dataType.sizeInBytes}`
            );
        }
        break;
      case 'Address':
        switch (dataType.sizeInBytes) {
          case 8:
            l5PageTable.setFloat64(offset, value);
            break;
          default:
            throw new TypeError(
              `Tried to set an invalid Address size in the memory`
            );
        }
        break;
      default:
        throw new TypeError(
          `Tried to set an invalid type in the memory: ${dataType.type}`
        );
    }
  }

  /**
   * Frees address.
   */
  public free(address: number): void {
    const addressIndex = AddressIndex.fromAddress(address);
    const l5PageTable = this.getL5PageTable(addressIndex);
    l5PageTable.freeEntry(addressIndex.getL5EntryOffset());
  }

  private getL5PageTable(addressIndex: AddressIndex): PageTable {
    const l2PageTableIdx = this.l1PageTable.getFloat64(addressIndex.l1Idx);
    const l3PageTableIdx = this.l2PageTables[l2PageTableIdx].getFloat64(
      addressIndex.l2Idx * PageTable.ENTRY_SIZE
    );
    const l4PageTableIdx = this.l3PageTables[l3PageTableIdx].getFloat64(
      addressIndex.l3Idx * PageTable.ENTRY_SIZE
    );
    const l5PageTableIdx = this.l4PageTables[l4PageTableIdx].getFloat64(
      addressIndex.l4Idx * PageTable.ENTRY_SIZE
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
