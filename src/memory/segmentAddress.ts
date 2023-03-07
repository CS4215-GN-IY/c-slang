export class SegmentAddress {
  readonly baseAddress: number;
  private freeAddress: number;
  readonly topAddress: number;

  constructor(baseAddress: number, freeAddress: number, topAddress: number) {
    this.baseAddress = baseAddress;
    this.freeAddress = freeAddress;
    this.topAddress = topAddress;
  }

  hasReachedTop(): boolean {
    return this.freeAddress >= this.topAddress;
  }

  public getFreeAddress(): number {
    return this.freeAddress;
  }

  public updateFreeAddress(newAddress: number): void {
    this.freeAddress = newAddress;
  }
}
