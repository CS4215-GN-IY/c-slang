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
  constructClosure,
  getBlockVariableDeclarationNames,
  getExternalDeclarationNames,
  setParamArgs
} from './utils';
import {
  type ResetEnvironmentInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr,
  type ResetInstr
} from './types/instruction';
import {
  constructEnvironmentInstr,
  constructFunctionApplicationInstr,
  constructFunctionAssignmentInstr,
  constructFunctionMarkInstr,
  constructResetInstr
} from './instruction';
import { constructMainCallExpression } from '../ast/constructors';
import { InvalidFunctionApplicationError } from './errors';
import {
  constructInitialSymbolTable,
  extendSymbolTable,
  getAddressFromSymbolTable
} from './symbolTable';
import { isEmptyStatement } from '../ast/typeGuards';
import { Memory } from '../memory/memory';

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
  ) => {},
  BlockStatement: (
    command: BlockStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
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
    state.agenda.push(command.callee);
  },
  Constant: (command: Constant, state: ExplicitControlEvaluatorState) => {
    state.stash.push(command);
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
  SequenceExpression: (
    command: SequenceExpression,
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
      state.agenda.peek().type === 'ResetEnvironment'
    ) {
      // Don't need current environment, push FunctionMarkInstr only and not EnvironmentInstr
      state.agenda.push(constructFunctionMarkInstr());
    } else {
      state.agenda.push(constructEnvironmentInstr(state.symbolTable));
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
    state.symbolTable = extendSymbolTable(
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
  Identifier: (command: Identifier, state: ExplicitControlEvaluatorState) => {},
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
  ) => {},
  MemberExpression: (
    command: MemberExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  Program: (command: Program, state: ExplicitControlEvaluatorState) => {
    const declarationNames = getExternalDeclarationNames(command.body);
    const declarationsWithAddresses = allocateStackAddresses(
      declarationNames,
      state.memory
    );
    if (declarationNames.length > 0) {
      state.symbolTable = extendSymbolTable(
        declarationsWithAddresses,
        state.symbolTable
      );
    }

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
  ResetEnvironment: (
    command: ResetEnvironmentInstr,
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
  VariableDeclaration: (
    command: VariableDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {},
  WhileStatement: (
    command: WhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {}
};
