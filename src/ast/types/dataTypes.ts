export interface IntegerDataType {
  type: 'Integer';
  sizeInBytes: number;
  isSigned: boolean;
}

export interface Int8 extends IntegerDataType {
  sizeInBytes: 1;
  isSigned: true;
}

export interface UInt8 extends IntegerDataType {
  sizeInBytes: 1;
  isSigned: false;
}

export interface Int16 extends IntegerDataType {
  sizeInBytes: 2;
  isSigned: true;
}

export interface UInt16 extends IntegerDataType {
  sizeInBytes: 2;
  isSigned: false;
}

export interface Int32 extends IntegerDataType {
  sizeInBytes: 4;
  isSigned: true;
}

export interface UInt32 extends IntegerDataType {
  sizeInBytes: 4;
  isSigned: false;
}

export interface Int64 extends IntegerDataType {
  sizeInBytes: 8;
  isSigned: true;
}

export interface UInt64 extends IntegerDataType {
  sizeInBytes: 8;
  isSigned: false;
}

export interface FloatingPointDataType {
  type: 'FloatingPoint';
  sizeInBytes: number;
}

export interface Float32 extends FloatingPointDataType {
  sizeInBytes: 4;
}

export interface Float64 extends FloatingPointDataType {
  sizeInBytes: 8;
}
