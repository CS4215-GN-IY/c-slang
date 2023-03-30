import { type Expression } from '../ast/types';
import { isIdentifier } from '../ast/typeGuards';
import { getSymbolTableEntry } from './symbolTable';
import { type SymbolTable, type SymbolTableEntry } from './types/symbolTable';
import { constructAssignInstr } from './instructions';
import { InvalidLValueError } from './errors';
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
