import { type Result, type Value } from './types/evaluationResults';
import { Stack } from '../utils/stack';
import {
  type AgendaItem,
  type AgendaItemEvaluatorMapping,
  type ExplicitControlEvaluatorState
} from './types/interpreter';
import {
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
  type Program,
  type ReturnStatement,
  type StringLiteral,
  type SwitchStatement,
  type VariableDeclaration,
  type WhileStatement
} from '../ast/types';
import {
  allocateStackAddresses,
  constructClosure,
  getArgNumbers,
  getBlockVariableDeclarationNames,
  getExternalDeclarationNames
} from './utils';
import { VirtualMemory } from '../memory/virtualMemory';
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
import { TextMemory } from '../memory/textMemory';
import { constructMainCallExpression } from '../ast/constructors';
import { InvalidFunctionApplication } from './errors';
import {
  constructGlobalEnvironment,
  extendEnvironment,
  getEnvironmentValue
} from './environment';
import { isEmptyStatement } from '../ast/typeGuards';

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
  const environment = constructGlobalEnvironment();
  const memory = new VirtualMemory(0, 1000, 1000, 1000);
  const textMemory = new TextMemory();
  const state: ExplicitControlEvaluatorState = {
    agenda,
    stash,
    environment,
    memory,
    textMemory
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
    state.agenda.push(command.id);
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

    const functionAddress = getEnvironmentValue(
      command.functionId.name,
      state.environment
    );
    const closureIdx = state.memory.get(functionAddress);
    const closure = state.textMemory.get(closureIdx);

    if (closure.params.length !== args.length) {
      throw new InvalidFunctionApplication(
        `Function takes in ${closure.params.length} arguments but ${args.length} arguments were passed in`
      );
    }

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
      state.agenda.push(constructEnvironmentInstr(state.environment));
      state.agenda.push(constructFunctionMarkInstr());
    }

    // Params and block variables should be in the same scope
    const paramNames = closure.params.map((param) => param.name);
    const paramAddresses = state.memory.stackFunctionCallAllocate(
      getArgNumbers(args)
    );
    const blockVariableDeclarations = getBlockVariableDeclarationNames(
      closure.body
    );
    const blockVariableAddresses = allocateStackAddresses(
      blockVariableDeclarations.length,
      state.memory
    );

    state.environment = extendEnvironment(
      [...paramNames, ...blockVariableDeclarations],
      [...paramAddresses, ...blockVariableAddresses],
      closure.environment
    );

    for (let i = closure.body.body.length - 1; i >= 0; i--) {
      state.agenda.push(closure.body.body[i]);
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
    const closure = constructClosure(command, state.environment);
    const closureIdx = state.textMemory.allocate(closure);
    const functionAssignmentInstr = constructFunctionAssignmentInstr(
      getEnvironmentValue(command.id.name, state.environment),
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
  Program: (command: Program, state: ExplicitControlEvaluatorState) => {
    const declarationNames = getExternalDeclarationNames(command.body);
    const declarationAddresses = allocateStackAddresses(
      declarationNames.length,
      state.memory
    );
    if (declarationNames.length > 0) {
      state.environment = extendEnvironment(
        declarationNames,
        declarationAddresses,
        state.environment
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
        throw new InvalidFunctionApplication(
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
  VariableDeclaration: (
    command: VariableDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {},
  WhileStatement: (
    command: WhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {}
};
