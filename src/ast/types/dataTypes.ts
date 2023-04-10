export type DataType = IntegerDataType | FloatingPointDataType;

export interface IntegerDataType {
  type: 'Integer';
  sizeInBytes: number;
  isSigned: boolean;
}

export const INT8: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 1,
  isSigned: true
};

export const UINT8: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 1,
  isSigned: false
};

export const INT16: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 2,
  isSigned: true
};

export const UINT16: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 2,
  isSigned: false
};

export const INT32: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 4,
  isSigned: true
};

export const UINT32: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 4,
  isSigned: false
};

export const INT64: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 8,
  isSigned: true
};

export const UINT64: IntegerDataType = {
  type: 'Integer',
  sizeInBytes: 8,
  isSigned: false
};

export interface FloatingPointDataType {
  type: 'FloatingPoint';
  sizeInBytes: number;
}

export const FLOAT32: FloatingPointDataType = {
  type: 'FloatingPoint',
  sizeInBytes: 4
};

export const FLOAT64: FloatingPointDataType = {
  type: 'FloatingPoint',
  sizeInBytes: 8
};