import { type Expression } from '../ast/types';
import { isIdentifier } from '../ast/typeGuards';
import { getSymbolTableEntry } from './symbolTable';
import { type SymbolTable } from './types/symbolTable';
import { constructAssignInstr } from './instructions';
import { UnsupportedAssignmentError } from './errors';
import { type AssignInstr } from './types/instructions';

export const constructAssignmentExpressionAssignInstr = (
  leftNode: Expression,
  symbolTable: SymbolTable
): AssignInstr => {
  if (isIdentifier(leftNode)) {
    const identifierSymbolTableEntry = getSymbolTableEntry(
      leftNode.name,
      symbolTable
    );
    return constructAssignInstr(identifierSymbolTableEntry);
  }

  // TODO: Support other cases if necessary, leftNode must be an lvalue
  throw new UnsupportedAssignmentError();
};
