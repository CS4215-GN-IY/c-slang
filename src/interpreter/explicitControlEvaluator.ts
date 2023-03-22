import { type Result, type Value } from './types/evaluationResults';
import { Stack } from '../utils/stack';
import {
  type AgendaItem,
  type AgendaItemEvaluatorMapping,
  type ExplicitControlEvaluatorState
} from './types/interpreter';
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
  type SequenceExpression,
  type ExpressionStatement,
  type ForStatement,
  type FunctionDeclaration,
  type GotoStatement,
  type Identifier,
  type IdentifierStatement,
  type IfStatement,
  type LogicalExpression,
  type MemberExpression,
  type Program,
  type ReturnStatement,
  type StringLiteral,
  type SwitchStatement,
  type UpdateExpression,
  type VariableDeclaration,
  type WhileStatement
} from '../ast/types';
import {
  allocateStackAddresses,
  checkBinaryOperation,
  checkNumber,
  constructClosure,
  evaluateBinaryExpression,
  getBlockNames,
  getBlockVariableDeclarationNames,
  getExternalDeclarationNames,
  isTrue,
  setParamArgs
} from './utils';
import {
  type ResetSymbolTableInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr,
  type ResetInstr,
  type BinaryOperationInstr,
  type BranchInstr,
  type VariableAssignmentInstr
} from './types/instruction';
import {
  constructBinaryOperationInstr,
  constructBranchInstr,
  constructResetSymbolTableInstr,
  constructFunctionApplicationInstr,
  constructFunctionAssignmentInstr,
  constructFunctionMarkInstr,
  constructResetInstr,
  constructVariableAssignmentInstr
} from './instruction';
import {
  constructFalseConstant,
  constructMainCallExpression,
  constructTrueConstant
} from '../ast/constructors';
import {
  InvalidFunctionApplicationError,
  InvalidFunctionIdentifierError
} from './errors';
import {
  addEntriesToSymbolTable,
  constructInitialSymbolTable,
  extendSymbolTable,
  extendSymbolTableWithEntries,
  getAddressFromSymbolTable,
  getEntryFromSymbolTable
} from './symbolTable';
import { isEmptyStatement } from '../ast/typeGuards';
import { Memory } from '../memory/memory';
import { isNotUndefined } from '../utils/typeGuards';

/**
 * Evaluates the abstract syntax tree using an explicit-control evaluator &
 * returns the result of evaluation asynchronously.
 *
 * @param ast The abstract syntax tree to evaluate.
 */
export const evaluate = async (ast: Program): Promise<Result> => {
  return await new Promise(
    (
      resolve: (value: Result | PromiseLike<Result>) => void,
      _reject: (reason?: any) => void
    ) => {
      try {
        const value = interpret(ast);
        resolve({ status: 'finished', value });
      } catch (err) {
        resolve({ status: 'error' });
      }
    }
  );
};

/**
 * Interprets the abstract syntax tree using an explicit-control evaluator &
 * returns the result of evaluation.
 *
 * @param ast The abstract syntax tree to evaluate.
 */
export const interpret = (ast: Program): Value => {
  const agenda = new Stack<AgendaItem>();
  agenda.push(constructMainCallExpression());
  agenda.push(ast);
  const stash = new Stack<Value>();
  const environment = constructInitialSymbolTable();
  const memory = new Memory(1000, 1000, 1000);
  const state: ExplicitControlEvaluatorState = {
    agenda,
    stash,
    symbolTable: environment,
    memory
  };

  while (agenda.size() > 0) {
    const command = agenda.pop();
    // The typecast allows for mapping to a specific evaluator command type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    evaluators[command.type](command as any, state);
  }

  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const evaluators: AgendaItemEvaluatorMapping = {
  ArrayAccessExpression: (
    command: ArrayAccessExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  AssignmentExpression: (
    command: AssignmentExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  BinaryExpression: (
    command: BinaryExpression,
    state: ExplicitControlEvaluatorState
  ) => {
    state.agenda.push(constructBinaryOperationInstr(command.operator));
    state.agenda.push(command.right);
    state.agenda.push(command.left);
  },
  BinaryOperation: (
    command: BinaryOperationInstr,
    state: ExplicitControlEvaluatorState
  ) => {
    const right = state.stash.pop();
    const left = state.stash.pop();
    checkBinaryOperation(command.symbol, left, right);
    state.stash.push(evaluateBinaryExpression(command.symbol, left, right));
  },
  Branch: (command: BranchInstr, state: ExplicitControlEvaluatorState) => {
    const test = state.stash.pop();
    checkNumber(test);
    if (isTrue(test)) {
      state.agenda.push(command.consequent);
    } else {
      state.agenda.push(command.alternate);
    }
  },
  BlockStatement: (
    command: BlockStatement,
    state: ExplicitControlEvaluatorState
  ) => {
    state.agenda.push(constructResetSymbolTableInstr(state.symbolTable));
    state.symbolTable = extendSymbolTable(state.symbolTable);
    const declarationNames = getBlockNames(command.items);
    const declarationsWithAddresses = allocateStackAddresses(
      declarationNames,
      state.memory
    );
    addEntriesToSymbolTable(declarationsWithAddresses, state.symbolTable);

    for (let i = command.items.length - 1; i >= 0; i--) {
      state.agenda.push(command.items[i]);
    }
  },
  BreakStatement: (
    command: BreakStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  CallExpression: (
    command: CallExpression,
    state: ExplicitControlEvaluatorState
  ) => {
    state.agenda.push(
      constructFunctionApplicationInstr(command.arguments.length, command)
    );
    for (let i = 0; i < command.arguments.length; i++) {
      state.agenda.push(command.arguments[i]);
    }
  },
  Constant: (command: Constant, state: ExplicitControlEvaluatorState) => {
    state.stash.push(command.value);
  },
  ContinueStatement: (
    command: ContinueStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  DefaultStatement: (
    command: DefaultStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  DoWhileStatement: (
    command: DoWhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  EmptyStatement: (
    command: EmptyStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  ExpressionStatement: (
    command: ExpressionStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  ForStatement: (
    command: ForStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  FunctionApplication: (
    command: FunctionApplicationInstr,
    state: ExplicitControlEvaluatorState
  ) => {
    // Args are in order of left to right
    const args: Value[] = [];
    for (let index = 0; index < command.numOfArgs; index++) {
      args.push(state.stash.pop());
    }

    const functionAddress = getAddressFromSymbolTable(
      command.functionId.name,
      state.symbolTable
    );
    const closureIdx = state.memory.get(functionAddress);
    const closure = state.memory.textGet(closureIdx);
    const paramsWithValues = setParamArgs(closure.params, args);

    if (isEmptyStatement(closure.body)) {
      return;
    }

    // TODO: Handle Tail Call in future.
    if (
      state.agenda.size() === 0 ||
      state.agenda.peek().type === 'ResetSymbolTable'
    ) {
      // Don't need current environment, push FunctionMarkInstr only and not EnvironmentInstr
      state.agenda.push(constructFunctionMarkInstr());
    } else {
      state.agenda.push(constructResetSymbolTableInstr(state.symbolTable));
      state.agenda.push(constructFunctionMarkInstr());
    }

    // Params and block variables should be in the same scope
    const paramsWithAddresses =
      state.memory.stackFunctionCallAllocate(paramsWithValues);
    const blockVariableDeclarations = getBlockVariableDeclarationNames(
      closure.body
    );
    const blockVariableDeclarationsWithAddresses = allocateStackAddresses(
      blockVariableDeclarations,
      state.memory
    );
    state.symbolTable = extendSymbolTableWithEntries(
      [...paramsWithAddresses, ...blockVariableDeclarationsWithAddresses],
      closure.environment
    );

    for (let i = closure.body.items.length - 1; i >= 0; i--) {
      state.agenda.push(closure.body.items[i]);
    }
  },
  FunctionAssignment: (
    command: FunctionAssigmentInstr,
    state: ExplicitControlEvaluatorState
  ) => {
    state.memory.set(command.nameAddress, command.closureIdx);
  },
  FunctionDeclaration: (
    command: FunctionDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {
    // Declaration names should have been added to the symbol table by the parent scope.
    // Only need to handle assignment.
    const closure = constructClosure(command, state.symbolTable);
    const closureIdx = state.memory.textAllocate(closure);
    const functionAssignmentInstr = constructFunctionAssignmentInstr(
      getAddressFromSymbolTable(command.id.name, state.symbolTable),
      closureIdx
    );
    state.agenda.push(functionAssignmentInstr);
  },
  FunctionMark: (
    command: FunctionMarkInstr,
    state: ExplicitControlEvaluatorState
  ) => {},
  GotoStatement: (
    command: GotoStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  Identifier: (command: Identifier, state: ExplicitControlEvaluatorState) => {
    const symbolTableEntry = getEntryFromSymbolTable(
      command.name,
      state.symbolTable
    );
    if (symbolTableEntry.nameType === 'Variable') {
      state.stash.push(state.memory.get(symbolTableEntry.address));
    }
    if (symbolTableEntry.nameType === 'Function') {
      throw new InvalidFunctionIdentifierError();
    }
  },
  IdentifierStatement: (
    command: IdentifierStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  IfStatement: (
    command: IfStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  LogicalExpression: (
    command: LogicalExpression,
    state: ExplicitControlEvaluatorState
  ) => {
    if (command.operator === '&&') {
      state.agenda.push(
        constructBranchInstr(command.right, constructFalseConstant())
      );
    }
    if (command.operator === '||') {
      state.agenda.push(
        constructBranchInstr(constructTrueConstant(), command.right)
      );
    }
    state.agenda.push(command.left);
  },
  MemberExpression: (
    command: MemberExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  Program: (command: Program, state: ExplicitControlEvaluatorState) => {
    state.symbolTable = extendSymbolTable(state.symbolTable);
    const declarationNames = getExternalDeclarationNames(command.body);
    const declarationsWithAddresses = allocateStackAddresses(
      declarationNames,
      state.memory
    );
    addEntriesToSymbolTable(declarationsWithAddresses, state.symbolTable);

    for (let i = command.body.length - 1; i >= 0; i--) {
      state.agenda.push(command.body[i]);
    }
  },
  Reset: (command: ResetInstr, state: ExplicitControlEvaluatorState) => {
    while (state.agenda.size() > 0) {
      if (state.agenda.pop().type === 'FunctionMark') {
        break;
      }
    }
  },
  ResetSymbolTable: (
    command: ResetSymbolTableInstr,
    state: ExplicitControlEvaluatorState
  ) => {},
  ReturnStatement: (
    command: ReturnStatement,
    state: ExplicitControlEvaluatorState
  ) => {
    state.agenda.push(constructResetInstr());
    if (command.argument !== undefined) {
      if (command.argument.expressions.length > 1) {
        throw new InvalidFunctionApplicationError(
          'Encountered more than 1 return value'
        );
      }
      state.agenda.push(command.argument.expressions[0]);
    }
    // TODO: Remember to do function call tear down for the memory stack too
  },
  SequenceExpression: (
    command: SequenceExpression,
    state: ExplicitControlEvaluatorState
  ) => {
    for (let i = command.expressions.length - 1; i >= 0; i--) {
      state.agenda.push(command.expressions[i]);
    }
  },
  StringLiteral: (
    command: StringLiteral,
    state: ExplicitControlEvaluatorState
  ) => {},
  SwitchStatement: (
    command: SwitchStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  UpdateExpression: (
    command: UpdateExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  VariableAssignment: (
    command: VariableAssignmentInstr,
    state: ExplicitControlEvaluatorState
  ) => {
    const address = getAddressFromSymbolTable(command.name, state.symbolTable);
    const value = state.stash.pop();
    state.memory.set(address, value);
  },
  VariableDeclaration: (
    command: VariableDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {
    // Declaration names should have been added to the symbol table by the parent scope.
    // Only need to handle assignment.
    for (let i = command.declarations.length - 1; i >= 0; i--) {
      const initialValue = command.declarations[i].initialValue;
      if (isNotUndefined(initialValue)) {
        state.agenda.push(
          constructVariableAssignmentInstr(command.declarations[i].id.name)
        );
        state.agenda.push(initialValue);
      }
    }
  },
  WhileStatement: (
    command: WhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {}
};
