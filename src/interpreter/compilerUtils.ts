import { type DeclaratorPattern, type Expression } from '../ast/types';
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
  InvalidScopeError,
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
    const sizes = pattern.bracketContents.map((bracketContent) => {
      if (
        isExpressionBracketContent(bracketContent) &&
        isConstant(bracketContent.expression) &&
        isNumber(bracketContent.expression.value)
      ) {
        return bracketContent.expression.value;
      }
      throw new InvalidScopeError(
        'Invalid array declarator pattern for fixed size scope.'
      );
    });
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
