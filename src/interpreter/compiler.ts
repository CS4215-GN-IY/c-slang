import { type CompilerMapping } from './types/compiler';
import {
  type ArrayAccessExpression,
  type AssignmentExpression,
  type BinaryExpression,
  type BlockStatement,
  type BreakStatement,
  type CallExpression,
  type CaseStatement,
  type ConditionalExpression,
  type Constant,
  type ContinueStatement,
  type DefaultStatement,
  type DoWhileStatement,
  type EmptyStatement,
  type ExpressionStatement,
  type ForStatement,
  type FunctionDeclaration,
  type GotoStatement,
  type Identifier,
  type IdentifierStatement,
  type IfStatement,
  type LogicalExpression,
  type MemberExpression,
  type Node,
  type Program,
  type ReturnStatement,
  type SequenceExpression,
  type StringLiteral,
  type SwitchStatement,
  type UnaryExpression,
  type UpdateExpression,
  type VariableDeclaration,
  type WhileStatement
} from '../ast/types';
import {
  constructAssignInstr,
  constructBinaryOperationInstr,
  constructCallInstr,
  constructDoneInstr,
  constructEnterProgramInstr,
  constructGotoInstr,
  constructJumpOnFalseInstr,
  constructLoadConstantInstr,
  constructLoadFunctionInstr,
  constructLoadSymbolInstr,
  constructPopInstr,
  constructTeardownInstr,
  PLACEHOLDER_ADDRESS
} from './instructions';
import {
  isBinaryOperator,
  isEmptyStatement,
  isIdentifier
} from '../ast/typeGuards';
import { isNotUndefined } from '../utils/typeGuards';
import {
  InvalidCallError,
  UnsupportedOperatorError,
  UnsupportedOperatorErrorType
} from './errors';
import {
  constructAssignmentExpression,
  constructBinaryExpression,
  constructConditionalExpression,
  constructFalseConstant,
  constructMainCallExpression,
  constructOneConstant,
  constructTrueConstant
} from '../ast/constructors';
import { type SymbolTable } from './types/symbolTable';
import {
  addBlockSymbolTableEntries,
  addFunctionSymbolTableEntries,
  addProgramSymbolTableEntries,
  getFunctionSymbolTableEntry,
  getNumOfEntriesInFrame,
  getSymbolTableEntry,
  getSymbolTableEntryInFrame
} from './symbolTable';
import { type Instr, type JumpOnFalseInstr } from './types/instructions';
import { constructAssignmentExpressionAssignInstr } from './compilerUtils';

export const compileProgram = (ast: Program): Instr[] => {
  const symbolTable: SymbolTable = {
    head: {},
    tail: null,
    parent: null
  };
  const instructions: Instr[] = [];
  compile(ast, instructions, symbolTable);
  return instructions;
};

const compile = (
  node: Node,
  instructions: Instr[],
  symbolTable: SymbolTable
): void => {
  // The typecast allows for mapping to a specific evaluator instr type from their union type.
  // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
  compilers[node.type](node as any, instructions, symbolTable);
};

const compilers: CompilerMapping = {
  ArrayAccessExpression: (
    node: ArrayAccessExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  AssignmentExpression: (
    node: AssignmentExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const binaryOperator = node.operator.slice(0, -1);
    if (isBinaryOperator(binaryOperator)) {
      const binaryExpression = constructBinaryExpression(
        binaryOperator,
        node.left,
        node.right
      );
      compile(binaryExpression, instructions, symbolTable);
    }
    const assignInstr = constructAssignmentExpressionAssignInstr(
      node.left,
      symbolTable
    );
    instructions.push(assignInstr);
  },
  BinaryExpression: (
    node: BinaryExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    compile(node.left, instructions, symbolTable);
    compile(node.right, instructions, symbolTable);
    const binaryOperationInstr = constructBinaryOperationInstr(node.operator);
    instructions.push(binaryOperationInstr);
  },
  BlockStatement: (
    node: BlockStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const blockSymbolTable = addBlockSymbolTableEntries(node, symbolTable);
    node.items.forEach((item) => {
      compile(item, instructions, blockSymbolTable);
    });
  },
  BreakStatement: (
    node: BreakStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  CallExpression: (
    node: CallExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    if (!isIdentifier(node.callee)) {
      throw new InvalidCallError('Cannot call non-identifier.');
    }
    const functionEntry = getFunctionSymbolTableEntry(
      node.callee.name,
      symbolTable
    );
    if (functionEntry.numOfParams !== node.arguments.length) {
      throw new InvalidCallError(
        `Function takes in ${functionEntry.numOfParams} arguments but ${node.arguments.length} arguments were passed in.`
      );
    }

    compile(node.callee, instructions, symbolTable);
    node.arguments.forEach((arg) => {
      compile(arg, instructions, symbolTable);
    });
    const callInstr = constructCallInstr(
      node.arguments.length,
      functionEntry.numOfVariables
    );
    instructions.push(callInstr);
  },
  CaseStatement: (
    node: CaseStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  ConditionalExpression: (
    node: ConditionalExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    compile(node.predicate, instructions, symbolTable);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.consequent, instructions, symbolTable);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    instructions.push(gotoInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
    compile(node.alternate, instructions, symbolTable);
    gotoInstr.instrAddress = instructions.length;
  },
  Constant: (
    node: Constant,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const loadConstantInstr = constructLoadConstantInstr(node.value);
    instructions.push(loadConstantInstr);
  },
  ContinueStatement: (
    node: ContinueStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  DefaultStatement: (
    node: DefaultStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  DoWhileStatement: (
    node: DoWhileStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  EmptyStatement: (
    node: EmptyStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  ExpressionStatement: (
    node: ExpressionStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    compile(node.sequence, instructions, symbolTable);
  },
  ForStatement: (
    node: ForStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    if (isNotUndefined(node.init)) {
      compile(node.init, instructions, symbolTable);
    }
    const loopStart = instructions.length;
    let jumpOnFalseInstr: JumpOnFalseInstr | undefined;
    if (isNotUndefined(node.predicate)) {
      compile(node.predicate, instructions, symbolTable);
      jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
      instructions.push(jumpOnFalseInstr);
    }
    compile(node.body, instructions, symbolTable);
    if (isNotUndefined(node.update)) {
      compile(node.update, instructions, symbolTable);
    }
    const gotoInstr = constructGotoInstr(loopStart);
    instructions.push(gotoInstr);
    if (isNotUndefined(jumpOnFalseInstr)) {
      jumpOnFalseInstr.instrAddress = instructions.length;
    }
  },
  FunctionDeclaration: (
    node: FunctionDeclaration,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const loadFunctionInstr = constructLoadFunctionInstr(PLACEHOLDER_ADDRESS);
    instructions.push(loadFunctionInstr);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    instructions.push(gotoInstr);

    loadFunctionInstr.functionInstrAddress = instructions.length;

    // TODO: Replace param declarations when parameter list is supported
    const functionSymbolTable = addFunctionSymbolTableEntries(
      [],
      node,
      symbolTable
    );
    if (!isEmptyStatement(node.body)) {
      node.body.items.forEach((item) => {
        compile(item, instructions, functionSymbolTable);
      });
    }
    const teardownInstr = constructTeardownInstr();
    instructions.push(teardownInstr);

    gotoInstr.instrAddress = instructions.length;

    const assignInstr = constructAssignInstr(
      getSymbolTableEntry(node.id.name, symbolTable)
    );
    instructions.push(assignInstr);
  },
  GotoStatement: (
    node: GotoStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  Identifier: (
    node: Identifier,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const loadSymbolInstr = constructLoadSymbolInstr(
      getSymbolTableEntry(node.name, symbolTable)
    );
    instructions.push(loadSymbolInstr);
  },
  IdentifierStatement: (
    node: IdentifierStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  IfStatement: (
    node: IfStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    compile(node.predicate, instructions, symbolTable);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.consequent, instructions, symbolTable);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    instructions.push(gotoInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
    if (isNotUndefined(node.alternate)) {
      compile(node.alternate, instructions, symbolTable);
    }
    gotoInstr.instrAddress = instructions.length;
  },
  LogicalExpression: (
    node: LogicalExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    let conditionalExpression;
    if (node.operator === '&&') {
      conditionalExpression = constructConditionalExpression(
        node.left,
        node.right,
        constructFalseConstant()
      );
    }
    if (node.operator === '||') {
      conditionalExpression = constructConditionalExpression(
        node.left,
        constructTrueConstant(),
        node.right
      );
    }
    if (conditionalExpression === undefined) {
      throw new UnsupportedOperatorError(
        node.operator,
        UnsupportedOperatorErrorType.LOGICAL
      );
    }
    compile(conditionalExpression, instructions, symbolTable);
  },
  MemberExpression: (
    node: MemberExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  Program: (node: Program, instructions: Instr[], symbolTable: SymbolTable) => {
    const programSymbolTable = addProgramSymbolTableEntries(node, symbolTable);
    const enterProgramInstr = constructEnterProgramInstr(
      getNumOfEntriesInFrame(programSymbolTable.head)
    );
    instructions.push(enterProgramInstr);
    node.body.forEach((item) => {
      compile(item, instructions, programSymbolTable);
    });
    const mainCallExpression = constructMainCallExpression();
    compile(mainCallExpression, instructions, programSymbolTable);
    const doneInstr = constructDoneInstr();
    instructions.push(doneInstr);
  },
  ReturnStatement: (
    node: ReturnStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    // TODO: Check if return with no argument works correctly.
    if (isNotUndefined(node.argument)) {
      compile(node.argument, instructions, symbolTable);
    }
    // TODO: Handle tail call.
    const teardownInstr = constructTeardownInstr();
    instructions.push(teardownInstr);
  },
  SequenceExpression: (
    node: SequenceExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    node.expressions.forEach((expression) => {
      compile(expression, instructions, symbolTable);
      const popInstr = constructPopInstr();
      instructions.push(popInstr);
    });
    // Pop everything from the virtual machine stash except the last expression.
    instructions.pop();
  },
  StringLiteral: (
    node: StringLiteral,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  SwitchStatement: (
    node: SwitchStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  UnaryExpression: (
    node: UnaryExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {},
  UpdateExpression: (
    node: UpdateExpression,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const assignmentOperator = node.operator === '++' ? '+=' : '-=';
    const oneConstant = constructOneConstant();
    const assignmentExpression = constructAssignmentExpression(
      assignmentOperator,
      node.operand,
      oneConstant
    );
    compile(assignmentExpression, instructions, symbolTable);
  },
  VariableDeclaration: (
    node: VariableDeclaration,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    node.declarations.forEach((declarator) => {
      const initialValue = declarator.initialValue;
      if (isNotUndefined(initialValue)) {
        compile(initialValue, instructions, symbolTable);
        // Declaration names should have been added to the symbol table by the parent scope.
        // Should only need to assign for declaration in last frame.
        const entry = getSymbolTableEntryInFrame(
          declarator.id.name,
          symbolTable.head
        );
        const assignInstr = constructAssignInstr(entry);
        instructions.push(assignInstr);
      }
    });
  },
  WhileStatement: (
    node: WhileStatement,
    instructions: Instr[],
    symbolTable: SymbolTable
  ) => {
    const loopStart = instructions.length;
    compile(node.predicate, instructions, symbolTable);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.body, instructions, symbolTable);
    const gotoInstr = constructGotoInstr(loopStart);
    instructions.push(gotoInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
  }
};
