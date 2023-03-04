export class AddressIndex {
  readonly l1Idx: number;
  readonly l2Idx: number;
  readonly l3Idx: number;
  readonly l4Idx: number;
  readonly l5Idx: number;

  private constructor(
    l1Idx: number,
    l2Idx: number,
    l3Idx: number,
    l4Idx: number,
    l5Idx: number
  ) {
    this.l1Idx = l1Idx;
    this.l2Idx = l2Idx;
    this.l3Idx = l3Idx;
    this.l4Idx = l4Idx;
    this.l5Idx = l5Idx;
  }

  public static fromIds(
    l1Idx: number,
    l2Idx: number,
    l3Idx: number,
    l4Idx: number,
    l5Idx: number
  ): AddressIndex {
    return new AddressIndex(l1Idx, l2Idx, l3Idx, l4Idx, l5Idx);
  }

  public static fromAddress(address: number): AddressIndex {
    const l5Mask = 0b111111111111;
    const l5Idx = address & l5Mask;
    address >>= 12;

    const l1Tol4Mask = 0b111111111;
    const l4Idx = address & l1Tol4Mask;
    address >>= 9;
    const l3Idx = address & l1Tol4Mask;
    address >>= 9;
    const l2Idx = address & l1Tol4Mask;
    address >>= 9;
    const l1Idx = address & l1Tol4Mask;
    return new AddressIndex(l1Idx, l2Idx, l3Idx, l4Idx, l5Idx);
  }

  public getL5EntryOffset(): number {
    return this.l5Idx >> 3;
  }

  public getAddress(): number {
    // l1 to l4 indexes occupy 9 bits each
    const l1ToL4Ids = [this.l1Idx, this.l2Idx, this.l3Idx, this.l4Idx];
    let address = 0;
    l1ToL4Ids.forEach((idx) => {
      address <<= 9;
      address |= idx;
    });

    // l5 index occupies 12 bits. First 9 bits index to an entry.
    // Last 3 bits index to within the entry.
    address <<= 12;
    address |= this.l5Idx;
    return address;
  }
}
