export type DataType =
  | AddressDataType
  | BuiltInDataType
  | IntegerDataType
  | FloatingPointDataType
  | VoidDataType;

export interface VoidDataType {
  type: 'Void';
  sizeInBytes: number;
}

export const VOID: VoidDataType = {
  type: 'Void',
  sizeInBytes: 0
};

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

export interface AddressDataType {
  type: 'Address';
  sizeInBytes: 8;
  valueDataType: DataType;
}

export const ADDRESS_SIZE_IN_BYTES = 8;

export const constructAddressDataType = (
  valueDataType: DataType
): AddressDataType => ({
  type: 'Address',
  sizeInBytes: ADDRESS_SIZE_IN_BYTES,
  valueDataType
});

export const isAddressDataType = (
  dataType: DataType
): dataType is AddressDataType => {
  return dataType.type === 'Address';
};

export interface BuiltInDataType {
  type: 'Builtin';
  sizeInBytes: 0;
}

export const BUILTIN: BuiltInDataType = {
  type: 'Builtin',
  sizeInBytes: 0
};
