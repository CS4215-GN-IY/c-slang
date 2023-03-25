import {
  type CompilerMapping,
  type CompilerState
} from './types/virtualMachine';
import {
  type ArrayAccessExpression,
  type AssignmentExpression,
  type BinaryExpression,
  type BlockStatement,
  type BreakStatement,
  type CallExpression,
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
  type UpdateExpression,
  type VariableDeclaration,
  type WhileStatement
} from '../ast/types';
import { Memory } from '../memory/memory';
import {
  constructAssignInstr,
  constructCallInstr,
  constructDoneInstr,
  constructTeardownInstr,
  constructGotoInstr,
  constructLoadConstantInstr,
  constructLoadFunctionInstr,
  PLACEHOLDER_ADDRESS,
  constructLoadSymbolInstr,
  constructExitFunctionInstr
} from './vmInstruction';
import { isEmptyStatement, isIdentifier } from '../ast/typeGuards';
import { isNotUndefined } from '../utils/typeGuards';
import { InvalidCallError } from './errors';
import { constructMainCallExpression } from '../ast/constructors';
import { type SymbolTable } from './types/symbolTable';
import {
  addBlockSymbolTableEntries,
  addFunctionSymbolTableEntries,
  addProgramSymbolTableEntries,
  getSymbolTableEntry,
  isFunctionSymbolTableEntry
} from './symbolTable';

export const compileProgram = (ast: Program): CompilerState => {
  const symbolTable: SymbolTable = {
    head: {},
    tail: null
  };
  const memory = new Memory(1000, 1000, 1000);
  const state: CompilerState = {
    symbolTable,
    memory
  };
  compile(ast, state);
  const mainCallExpression = constructMainCallExpression();
  compile(mainCallExpression, state);
  state.memory.textAllocate(constructDoneInstr());
  return state;
};

const compile = (node: Node, state: CompilerState): void => {
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
  BinaryExpression: (node: BinaryExpression, state: CompilerState) => {},
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
    const functionNameEntry = getSymbolTableEntry(
      node.callee.name,
      state.symbolTable
    );
    if (!isFunctionSymbolTableEntry(functionNameEntry)) {
      throw new InvalidCallError('Cannot call a non-function.');
    }
    if (functionNameEntry.numOfParams !== node.arguments.length) {
      throw new InvalidCallError(
        `Function takes in ${functionNameEntry.numOfParams} arguments but ${node.arguments.length} arguments were passed in.`
      );
    }

    compile(node.callee, state);
    // Compile in reverse order so that last argument is lower in the stash,
    // and the first argument is higher.
    for (let i = node.arguments.length - 1; i >= 0; i--) {
      compile(node.arguments[i], state);
    }
    const callInstr = constructCallInstr(node.arguments.length);
    state.memory.textAllocate(callInstr);
    const teardownInstr = constructTeardownInstr(node.arguments.length);
    state.memory.textAllocate(teardownInstr);
  },
  Constant: (node: Constant, state: CompilerState) => {
    const loadConstantInstr = constructLoadConstantInstr(node.value);
    state.memory.textAllocate(loadConstantInstr);
  },
  ContinueStatement: (node: ContinueStatement, state: CompilerState) => {},
  DefaultStatement: (node: DefaultStatement, state: CompilerState) => {},
  DoWhileStatement: (node: DoWhileStatement, state: CompilerState) => {},
  EmptyStatement: (node: EmptyStatement, state: CompilerState) => {},
  ExpressionStatement: (node: ExpressionStatement, state: CompilerState) => {},
  ForStatement: (node: ForStatement, state: CompilerState) => {},
  FunctionDeclaration: (node: FunctionDeclaration, state: CompilerState) => {
    const loadFunctionInstr = constructLoadFunctionInstr(PLACEHOLDER_ADDRESS);
    state.memory.textAllocate(loadFunctionInstr);
    const gotoInstr = constructGotoInstr(PLACEHOLDER_ADDRESS);
    state.memory.textAllocate(gotoInstr);

    loadFunctionInstr.functionInstrAddress =
      state.memory.textGetNextFreeAddress();

    // TODO: Replace param declarations when parameter list is supported
    const functionSymbolTable = addFunctionSymbolTableEntries(
      [],
      node.body,
      state.symbolTable
    );
    if (!isEmptyStatement(node.body)) {
      node.body.items.forEach((item) => {
        state.symbolTable = functionSymbolTable;
        compile(item, state);
      });
    }
    state.memory.textAllocate(constructExitFunctionInstr());

    gotoInstr.instrAddress = state.memory.textGetNextFreeAddress();

    const assignInstr = constructAssignInstr(
      getSymbolTableEntry(node.id.name, state.symbolTable)
    );
    state.memory.textAllocate(assignInstr);
  },
  GotoStatement: (node: GotoStatement, state: CompilerState) => {},
  Identifier: (node: Identifier, state: CompilerState) => {
    state.memory.textAllocate(
      constructLoadSymbolInstr(
        getSymbolTableEntry(node.name, state.symbolTable)
      )
    );
  },
  IdentifierStatement: (node: IdentifierStatement, state: CompilerState) => {},
  IfStatement: (node: IfStatement, state: CompilerState) => {},
  LogicalExpression: (node: LogicalExpression, state: CompilerState) => {},
  MemberExpression: (node: MemberExpression, state: CompilerState) => {},
  Program: (node: Program, state: CompilerState) => {
    const programSymbolTable = addProgramSymbolTableEntries(
      node,
      state.symbolTable
    );
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
    // TODO: Check tail call.
    state.memory.textAllocate(constructExitFunctionInstr());
  },
  SequenceExpression: (node: SequenceExpression, state: CompilerState) => {},
  StringLiteral: (node: StringLiteral, state: CompilerState) => {},
  SwitchStatement: (node: SwitchStatement, state: CompilerState) => {},
  UpdateExpression: (node: UpdateExpression, state: CompilerState) => {},
  VariableDeclaration: (node: VariableDeclaration, state: CompilerState) => {},
  WhileStatement: (node: WhileStatement, state: CompilerState) => {}
};
