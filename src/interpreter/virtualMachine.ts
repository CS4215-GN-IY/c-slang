import {
  type CompilerMapping,
  type CompilerState,
  type SymbolTableEntry
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
  constructDoneInstr,
  constructExitFunctionInstr,
  constructGotoInstr,
  constructLoadConstantInstr,
  constructLoadFunctionInstr,
  constructSetupBlockInstr,
  constructTeardownBlockInstr,
  PLACEHOLDER_ADDRESS
} from './vmInstruction';
import {
  extendSymbolTable,
  getBlockSymbolTableEntries,
  getProgramSymbolTableEntries,
  getSymbolTableEntryPosition
} from './vmUtils';
import { isEmptyStatement } from '../ast/typeGuards';
import { isNotUndefined } from '../utils/typeGuards';
import { InvalidFunctionApplicationError } from './errors';

export const compileProgram = (ast: Program): void => {
  const symbolTable: SymbolTableEntry[][] = [];
  const memory = new Memory(1000, 1000, 1000);
  const state: CompilerState = {
    symbolTable,
    memory
  };
  compile(ast, state);
  state.memory.textAllocate(constructDoneInstr());
  // console.log(state.memory.textMemory);
};

const compile = (node: Node, state: CompilerState): void => {
  console.log(node);
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
    const symbolTableEntries = getBlockSymbolTableEntries(node);
    const setupBlockInstr = constructSetupBlockInstr(symbolTableEntries.length);
    state.memory.textAllocate(setupBlockInstr);

    state.symbolTable = extendSymbolTable(
      state.symbolTable,
      symbolTableEntries
    );
    node.items.forEach((item) => {
      compile(item, state);
    });

    const teardownBlockInstr = constructTeardownBlockInstr();
    state.memory.textAllocate(teardownBlockInstr);
  },
  BreakStatement: (node: BreakStatement, state: CompilerState) => {},
  CallExpression: (node: CallExpression, state: CompilerState) => {},
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

    // TODO: Implement when parameter list is supported
    const paramSymbolTableEntries: SymbolTableEntry[] = [];
    const blockSymbolTableEntries = isEmptyStatement(node.body)
      ? []
      : getBlockSymbolTableEntries(node.body);
    state.symbolTable = extendSymbolTable(state.symbolTable, [
      ...paramSymbolTableEntries,
      ...blockSymbolTableEntries
    ]);
    compile(node.body, state);

    gotoInstr.instrAddress = state.memory.textGetNextFreeAddress();

    const assignInstr = constructAssignInstr(
      getSymbolTableEntryPosition(state.symbolTable, node.id.name)
    );
    state.memory.textAllocate(assignInstr);
  },
  GotoStatement: (node: GotoStatement, state: CompilerState) => {},
  Identifier: (node: Identifier, state: CompilerState) => {},
  IdentifierStatement: (node: IdentifierStatement, state: CompilerState) => {},
  IfStatement: (node: IfStatement, state: CompilerState) => {},
  LogicalExpression: (node: LogicalExpression, state: CompilerState) => {},
  MemberExpression: (node: MemberExpression, state: CompilerState) => {},
  Program: (node: Program, state: CompilerState) => {
    const symbolTableEntries = getProgramSymbolTableEntries(node);
    state.symbolTable = extendSymbolTable(
      state.symbolTable,
      symbolTableEntries
    );
    node.body.forEach((item) => {
      compile(item, state);
    });
  },
  ReturnStatement: (node: ReturnStatement, state: CompilerState) => {
    // TODO: Check if return with no argument works correctly.
    if (isNotUndefined(node.argument)) {
      if (node.argument.expressions.length > 1) {
        throw new InvalidFunctionApplicationError(
          'Encountered more than 1 return value'
        );
      }
      compile(node.argument.expressions[0], state);
    }

    const exitFunctionInstr = constructExitFunctionInstr();
    state.memory.textAllocate(exitFunctionInstr);
  },
  SequenceExpression: (node: SequenceExpression, state: CompilerState) => {},
  StringLiteral: (node: StringLiteral, state: CompilerState) => {},
  SwitchStatement: (node: SwitchStatement, state: CompilerState) => {},
  UpdateExpression: (node: UpdateExpression, state: CompilerState) => {},
  VariableDeclaration: (node: VariableDeclaration, state: CompilerState) => {},
  WhileStatement: (node: WhileStatement, state: CompilerState) => {}
};
