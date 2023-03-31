import { type DeclaratorPattern, type Expression } from '../ast/types';
import {
  isArrayPattern,
  isFunctionPattern,
  isIdentifier,
  isPointerPattern
} from '../ast/typeGuards';
import { getSymbolTableEntry } from './symbolTable';
import { type SymbolTable, type SymbolTableEntry } from './types/symbolTable';
import { constructAssignInstr } from './instructions';
import { InvalidLValueError, UnsupportedDeclarationError } from './errors';
import { type AssignInstr } from './types/instructions';

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
