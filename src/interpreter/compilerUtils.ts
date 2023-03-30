import {
  type DeclaratorPattern,
  type Expression,
  type VariableDeclarator
} from '../ast/types';
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

export const getDeclaratorName = (declarator: VariableDeclarator): string => {
  const pattern = declarator.pattern;
  if (isIdentifier(pattern)) {
    return pattern.name;
  }

  if (isArrayPattern(pattern) && isIdentifier(pattern.id)) {
    return pattern.id.name;
  }

  if (isFunctionPattern(pattern) && isIdentifier(pattern.id)) {
    return pattern.id.name;
  }

  if (isPointerPattern(pattern)) {
    let pointerPattern: DeclaratorPattern = pattern;
    while (!isIdentifier(pointerPattern)) {
      pointerPattern = pattern.pattern;
    }
    return pointerPattern.name;
  }

  throw new UnsupportedDeclarationError();
};
