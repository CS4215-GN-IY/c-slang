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
import { type DataType } from '../ast/types/dataTypes';

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

// TODO: This method may be modified once types are introduced.
export const getFixedNumOfEntriesOfDeclaratorPattern = (
  dataType: DataType,
  pattern: DeclaratorPattern
): number => {
  if (isIdentifier(pattern)) {
    return dataType.sizeInBytes;
  }

  if (isArrayPattern(pattern)) {
    // Multiply the sizes of each array dimension to get the total array size.
    return getArrayMaxNumOfItems(pattern) * dataType.sizeInBytes;
  }

  if (isFunctionPattern(pattern)) {
    // Function should point to an address. An address takes 8 bytes.
    return 8;
  }

  if (isPointerPattern(pattern)) {
    // Pointer should point to an address. An address takes 8 bytes.
    return 8;
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
