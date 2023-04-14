export class MemoryError extends Error {}

export class OverlappingMemoryRegionsError extends MemoryError {
  constructor(
    firstBaseAddress: number,
    firstTopAddress: number,
    secondBaseAddress: number,
    secondTopAddress: number
  ) {
    super(
      `The memory region at address ${firstBaseAddress} - ${firstTopAddress} overlaps the memory region at address ${secondBaseAddress} - ${secondTopAddress}.`
    );
  }
}

export class UnwritableMemoryRegionError extends MemoryError {
  constructor(segment: string) {
    super(`Unable to write to memory region in ${segment} segment.`);
  }
}

export class IllegalInstructionError extends MemoryError {
  constructor() {
    super('Encountered illegal argument.');
  }
}

export class SegmentationFault extends MemoryError {
  constructor(address: number, sizeInBytes: number) {
    super(
      `Segmentation fault occurred while accessing address range ${address} - ${
        address + sizeInBytes
      }.`
    );
  }
}

export class InvalidSegmentError extends MemoryError {}
