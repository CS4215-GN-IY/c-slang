import { type CompilerMapping, type CompilerState } from './types/compiler';
import {
  type ArrayAccessExpression,
  type AssignmentExpression,
  type BinaryExpression,
  type BlockStatement,
  type BreakStatement,
  type CallExpression,
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
  constructTeardownInstr,
  PLACEHOLDER_ADDRESS
} from './instruction';
import { isEmptyStatement, isIdentifier } from '../ast/typeGuards';
import { isNotUndefined } from '../utils/typeGuards';
import {
  InvalidCallError,
  UnsupportedOperatorError,
  UnsupportedOperatorErrorType
} from './errors';
import {
  constructConditionalExpression,
  constructFalseConstant,
  constructMainCallExpression,
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
import { type Instr } from './types/instruction';

export const compileProgram = (ast: Program): Instr[] => {
  const symbolTable: SymbolTable = {
    head: {},
    tail: null,
    parent: null
  };
  const state: CompilerState = {
    symbolTable,
    instructions: []
  };
  compile(ast, state);
  const mainCallExpression = constructMainCallExpression();
  compile(mainCallExpression, state);
  const doneInstr = constructDoneInstr();
  state.instructions.push(doneInstr);
  return state.instructions;
};

const compile = (node: Node, state: CompilerState): void => {
  // The typecast allows for mapping to a specific evaluator instr type from their union type.
  // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
  compilers[node.type](node as any, state);
};

const compilers: CompilerMapping = {
  ArrayAccessExpression: (
    node: ArrayAccessExpression,
    state: CompilerState
  ) => {},
  AssignmentExpression: (
    node: AssignmentExpression,
    state: CompilerState
  ) => {},
  BinaryExpression: (node: BinaryExpression, state: CompilerState) => {
    compile(node.left, state);
    compile(node.right, state);
    const binaryOperationInstr = constructBinaryOperationInstr(node.operator);
    state.instructions.push(binaryOperationInstr);
  },
  BlockStatement: (node: BlockStatement, state: CompilerState) => {
    const blockSymbolTable = addBlockSymbolTableEntries(
      node,
      state.symbolTable
    );
    node.items.forEach((item) => {
      state.symbolTable = blockSymbolTable;
      compile(item, state);
    });
  },
  BreakStatement: (node: BreakStatement, state: CompilerState) => {},
  CallExpression: (node: CallExpression, state: CompilerState) => {
    if (!isIdentifier(node.callee)) {
      throw new InvalidCallError('Cannot call non-identifier.');
    }
    const functionEntry = getFunctionSymbolTableEntry(
      node.callee.name,
      state.symbolTable
    );
    if (functionEntry.numOfParams !== node.arguments.length) {
      throw new InvalidCallError(
        `Function takes in ${functionEntry.numOfParams} arguments but ${node.arguments.length} arguments were passed in.`
      );
    }

    compile(node.callee, state);
    // Compile in reverse order so that last argument is lower in the stash,
    // and the first argument is higher.
    for (let i = node.arguments.length - 1; i >= 0; i--) {
      compile(node.arguments[i], state);
    }
    const callInstr = constructCallInstr(
      node.arguments.length,
      functionEntry.numOfVariables
    );
    state.instructions.push(callInstr);
  },
  ConditionalExpression: (
    node: ConditionalExpression,
    state: CompilerState
  ) => {
    compile(node.predicate, state);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    state.instructions.push(jumpOnFalseInstr);
    compile(node.consequent, state);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    state.instructions.push(gotoInstr);
    jumpOnFalseInstr.instrAddress = state.instructions.length;
    compile(node.alternate, state);
    gotoInstr.instrAddress = state.instructions.length;
  },
  Constant: (node: Constant, state: CompilerState) => {
    const loadConstantInstr = constructLoadConstantInstr(node.value);
    state.instructions.push(loadConstantInstr);
  },
  ContinueStatement: (node: ContinueStatement, state: CompilerState) => {},
  DefaultStatement: (node: DefaultStatement, state: CompilerState) => {},
  DoWhileStatement: (node: DoWhileStatement, state: CompilerState) => {},
  EmptyStatement: (node: EmptyStatement, state: CompilerState) => {},
  ExpressionStatement: (node: ExpressionStatement, state: CompilerState) => {},
  ForStatement: (node: ForStatement, state: CompilerState) => {},
  FunctionDeclaration: (node: FunctionDeclaration, state: CompilerState) => {
    const loadFunctionInstr = constructLoadFunctionInstr(PLACEHOLDER_ADDRESS);
    state.instructions.push(loadFunctionInstr);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    state.instructions.push(gotoInstr);

    loadFunctionInstr.functionInstrAddress = state.instructions.length;

    // TODO: Replace param declarations when parameter list is supported
    const functionSymbolTable = addFunctionSymbolTableEntries(
      [],
      node,
      state.symbolTable
    );
    if (!isEmptyStatement(node.body)) {
      node.body.items.forEach((item) => {
        state.symbolTable = functionSymbolTable;
        compile(item, state);
      });
    }
    const teardownInstr = constructTeardownInstr();
    state.instructions.push(teardownInstr);

    gotoInstr.instrAddress = state.instructions.length;

    const assignInstr = constructAssignInstr(
      getSymbolTableEntry(node.id.name, state.symbolTable)
    );
    state.instructions.push(assignInstr);
  },
  GotoStatement: (node: GotoStatement, state: CompilerState) => {},
  Identifier: (node: Identifier, state: CompilerState) => {
    const loadSymbolInstr = constructLoadSymbolInstr(
      getSymbolTableEntry(node.name, state.symbolTable)
    );
    state.instructions.push(loadSymbolInstr);
  },
  IdentifierStatement: (node: IdentifierStatement, state: CompilerState) => {},
  IfStatement: (node: IfStatement, state: CompilerState) => {},
  LogicalExpression: (node: LogicalExpression, state: CompilerState) => {
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
    compile(conditionalExpression, state);
  },
  MemberExpression: (node: MemberExpression, state: CompilerState) => {},
  Program: (node: Program, state: CompilerState) => {
    const programSymbolTable = addProgramSymbolTableEntries(
      node,
      state.symbolTable
    );
    const enterProgramInstr = constructEnterProgramInstr(
      getNumOfEntriesInFrame(programSymbolTable.head)
    );
    state.instructions.push(enterProgramInstr);
    node.body.forEach((item) => {
      state.symbolTable = programSymbolTable;
      compile(item, state);
    });
  },
  ReturnStatement: (node: ReturnStatement, state: CompilerState) => {
    // TODO: Check if return with no argument works correctly.
    if (isNotUndefined(node.argument)) {
      if (node.argument.expressions.length > 1) {
        throw new InvalidCallError('Encountered more than 1 return value');
      }
      compile(node.argument.expressions[0], state);
    }
    // TODO: Handle tail call.
    const teardownInstr = constructTeardownInstr();
    state.instructions.push(teardownInstr);
  },
  SequenceExpression: (node: SequenceExpression, state: CompilerState) => {
    node.expressions.forEach((expression) => {
      compile(expression, state);
    });
  },
  StringLiteral: (node: StringLiteral, state: CompilerState) => {},
  SwitchStatement: (node: SwitchStatement, state: CompilerState) => {},
  UnaryExpression: (node: UnaryExpression, state: CompilerState) => {},
  UpdateExpression: (node: UpdateExpression, state: CompilerState) => {},
  VariableDeclaration: (node: VariableDeclaration, state: CompilerState) => {
    node.declarations.forEach((declarator) => {
      const initialValue = declarator.initialValue;
      if (isNotUndefined(initialValue)) {
        compile(initialValue, state);
        // Declaration names should have been added to the symbol table by the parent scope.
        // Should only need to assign for declaration in last frame.
        const entry = getSymbolTableEntryInFrame(
          declarator.id.name,
          state.symbolTable.head
        );
        const assignInstr = constructAssignInstr(entry);
        state.instructions.push(assignInstr);
      }
    });
  },
  WhileStatement: (node: WhileStatement, state: CompilerState) => {}
};
