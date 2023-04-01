import {
  type ArrayPattern,
  type DeclaratorPattern,
  type Expression
} from '../ast/types';
import {
  isArrayPattern,
  isConstant,
  isExpressionBracketContent,
  isFunctionPattern,
  isIdentifier,
  isPointerPattern
} from '../ast/typeGuards';
import { getSymbolTableEntry } from './symbolTable';
import { type SymbolTable, type SymbolTableEntry } from './types/symbolTable';
import { constructAssignInstr } from './instructions';
import {
  InvalidLValueError,
  UnsupportedArrayError,
  UnsupportedDeclarationError
} from './errors';
import { type AssignInstr } from './types/instructions';
import { isNumber } from '../utils/typeGuards';

export const constructAssignmentExpressionAssignInstr = (
  leftNode: Expression,
  symbolTable: SymbolTable
): AssignInstr => {
  const entry = getSymbolTableEntryOfExpression(leftNode, symbolTable);
  return constructAssignInstr(entry);
};

export const getSymbolTableEntryOfExpression = (
  expression: Expression,
  symbolTable: SymbolTable
): SymbolTableEntry => {
  if (isIdentifier(expression)) {
    return getSymbolTableEntry(expression.name, symbolTable);
  }

  // TODO: Support other cases if necessary, leftNode must be an lvalue
  throw new InvalidLValueError();
};

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
  pattern: DeclaratorPattern
): number => {
  if (isIdentifier(pattern)) {
    // Allocate 1 entry space to each identifier for now.
    return 1;
  }

  if (isArrayPattern(pattern)) {
    // Allocate 1 entry space to each item in the array for now.
    // Multiply the sizes of each array dimension to get the total array size.
    const sizes = getArrayPatternDimensionSizes(pattern);
    return sizes.reduce((product, size) => product * size, 1);
  }

  if (isFunctionPattern(pattern)) {
    // Function should point to an address. An address takes 1 entry space.
    return 1;
  }

  if (isPointerPattern(pattern)) {
    // Pointer should point to an address. An address takes 1 entry space.
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

export const getArrayPatternMultipliers = (pattern: ArrayPattern): number[] => {
  const dimensionSizes = getArrayPatternDimensionSizes(pattern);
  const multipliers = [1];
  for (let i = dimensionSizes.length - 1; i > 0; i--) {
    multipliers.push(multipliers[multipliers.length - 1] * dimensionSizes[i]);
  }
  return multipliers.reverse();
};
