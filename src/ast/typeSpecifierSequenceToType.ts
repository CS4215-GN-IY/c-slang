import {
  type DataType,
  FLOAT32,
  FLOAT64,
  INT16,
  INT32,
  INT64,
  INT8,
  UINT16,
  UINT32,
  UINT64,
  UINT8
} from './types/dataTypes';

/**
 * A mapping from valid type specifier sequences to their corresponding type.
 */
export const TYPE_SPECIFIER_SEQUENCE_TO_TYPE: Partial<
  Record<string, DataType>
> = {
  char: INT8,
  'signed char': INT8,
  'unsigned char': UINT8,
  short: INT16,
  'short int': INT16,
  'signed short': INT16,
  'signed short int': INT16,
  'unsigned short': UINT16,
  'unsigned short int': UINT16,
  int: INT32,
  signed: INT32,
  'signed int': INT32,
  unsigned: UINT32,
  'unsigned int': UINT32,
  long: INT64,
  'long int': INT64,
  'signed long': INT64,
  'signed long int': INT64,
  'unsigned long': UINT64,
  'unsigned long int': UINT64,
  'long long': INT64,
  'long long int': INT64,
  'signed long long': INT64,
  'signed long long int': INT64,
  'unsigned long long': UINT64,
  'unsigned long long int': UINT64,
  float: FLOAT32,
  double: FLOAT64,
  // Unfortunately, JavaScript's `DataView` does not support 128-bit operations
  // so we have to fallback on 64-bit operations for `long double`.
  'long double': FLOAT64
};
