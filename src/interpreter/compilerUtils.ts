import { type ArrayPattern, type DeclaratorPattern } from '../ast/types/ast';
import {
  isArrayPattern,
  isConstant,
  isExpressionBracketContent,
  isFunctionPattern,
  isIdentifier,
  isPointerPattern
} from '../ast/types/typeGuards';
import { UnsupportedArrayError, UnsupportedDeclarationError } from './errors';
import { isNumber } from '../utils/typeGuards';
import { type Value } from './types/virtualMachine';
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
} from '../ast/types/dataTypes';

export const getNameFromDeclaratorPattern = (
  pattern: DeclaratorPattern
): string => {
  if (isIdentifier(pattern)) {
    return pattern.name;
  }

  if (isPointerPattern(pattern)) {
    return getNameFromDeclaratorPattern(pattern.pattern);
  }

  if (isArrayPattern(pattern) || isFunctionPattern(pattern)) {
    return getNameFromDeclaratorPattern(pattern.id);
  }

  throw new UnsupportedDeclarationError();
};

export const getFixedNumOfItemsOfDeclaratorPattern = (
  pattern: DeclaratorPattern
): number => {
  if (isIdentifier(pattern)) {
    return 1;
  }

  if (isArrayPattern(pattern)) {
    return getArrayMaxNumOfItems(pattern);
  }

  if (isFunctionPattern(pattern)) {
    return 1;
  }

  if (isPointerPattern(pattern)) {
    return 1;
  }

  throw new UnsupportedDeclarationError();
};

export const getArrayPatternDimensionSizes = (
  pattern: ArrayPattern
): number[] => {
  return pattern.bracketContents.map((bracketContent) => {
    if (
      isExpressionBracketContent(bracketContent) &&
      isConstant(bracketContent.expression) &&
      isNumber(bracketContent.expression.value)
    ) {
      return bracketContent.expression.value;
    }
    throw new UnsupportedArrayError('Unsupported array type.');
  });
};

export const getArrayMaxNumOfItems = (pattern: ArrayPattern): number => {
  const sizes = getArrayPatternDimensionSizes(pattern);
  return sizes.reduce((product, size) => product * size, 1);
};

export const getArrayPatternMultipliers = (pattern: ArrayPattern): number[] => {
  const dimensionSizes = getArrayPatternDimensionSizes(pattern);
  const multipliers = [1];
  for (let i = dimensionSizes.length - 1; i > 0; i--) {
    multipliers.push(multipliers[multipliers.length - 1] * dimensionSizes[i]);
  }
  return multipliers.reverse();
};

export const castConstantToDataType = (
  value: Value,
  dataType: DataType
): Value => {
  if (dataType === INT8) {
    return new Int8Array([value])[0];
  } else if (dataType === UINT8) {
    return new Uint8Array([value])[0];
  } else if (dataType === INT16) {
    return new Int16Array([value])[0];
  } else if (dataType === UINT16) {
    return new Uint16Array([value])[0];
  } else if (dataType === INT32) {
    return new Int32Array([value])[0];
  } else if (dataType === UINT32) {
    return new Uint32Array([value])[0];
  } else if (dataType === INT64) {
    return Number(new BigInt64Array([value])[0]);
  } else if (dataType === UINT64) {
    return Number(new BigUint64Array([value])[0]);
  } else if (dataType === FLOAT32) {
    return new Float32Array([value])[0];
  } else if (dataType === FLOAT64) {
    return new Float64Array([value])[0];
  }
  return value;
};
