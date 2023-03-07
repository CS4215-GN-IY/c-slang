export class MemoryError extends Error {
  constructor(type: MemoryErrorType, value: number) {
    super(MemoryError.formatMessage(type, value));
    this.name = this.constructor.name;
  }

  private static formatMessage(type: MemoryErrorType, value: number): string {
    return `type: ${type}, value: ${value}`;
  }
}

export enum MemoryErrorType {
  INVALID_OFFSET = 'Invalid offset',
  INVALID_SEGMENT = 'Invalid segment',
  SEGMENTATION_FAULT = 'Segmentation fault'
}
