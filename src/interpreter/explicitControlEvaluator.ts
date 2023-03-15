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
  allocateExternalDeclaration,
  constructClosure,
  getArgNumbers,
  getExternalDeclarationNames
} from './utils';
import { VirtualMemory } from '../memory/virtualMemory';
import {
  type EnvironmentInstr,
  type FunctionApplicationInstr,
  type FunctionAssigmentInstr,
  type FunctionMarkInstr
} from './types/instruction';
import {
  constructEnvironmentInstr,
  constructFunctionApplicationInstr,
  constructFunctionAssignmentInstr,
  constructFunctionMarkInstr
} from './instruction';
import { TextMemory } from '../memory/textMemory';
import { constructMainCallExpression } from '../ast/constructors';
import { InvalidFunctionApplication } from './errors';
import {
  constructGlobalEnvironment,
  extendEnvironment,
  getEnvironmentValue
} from './environment';

const microcode: AgendaItemEvaluatorMapping = {
  Program: (command: Program, state: ExplicitControlEvaluatorState) => {
    const declarationAddresses = allocateExternalDeclaration(
      command.body,
      state.memory
    );
    if (declarationAddresses.length > 0) {
      const declarationNames = getExternalDeclarationNames(command.body);
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
  VariableDeclaration: (
    command: VariableDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {},
  FunctionAssignment: (
    command: FunctionAssigmentInstr,
    state: ExplicitControlEvaluatorState
  ) => {
    state.memory.set(command.nameAddress, command.closureIdx);
  },
  CallExpression: (
    command: CallExpression,
    state: ExplicitControlEvaluatorState
  ) => {
    state.agenda.push(
      constructFunctionApplicationInstr(command.arguments.length, command)
    );
    for (let index = 0; index < command.arguments.length; index--) {
      state.agenda.push(command.arguments[index]);
    }
    state.agenda.push(command.id);
  },
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

    // TODO: Handle Tail Call in future.
    if (
      state.agenda.size() === 0 ||
      state.agenda.peek().type === 'Environment'
    ) {
      // Don't need current environment, push FunctionMarkInstr only and not EnvironmentInstr
      state.agenda.push(constructFunctionMarkInstr());
    } else {
      state.agenda.push(constructEnvironmentInstr(state.environment));
      state.agenda.push(constructFunctionMarkInstr());
    }
    state.agenda.push(closure.body);

    const paramNames = closure.params.map((param) => param.name);
    const addresses = state.memory.stackFunctionCallAllocate(
      getArgNumbers(args)
    );
    state.environment = extendEnvironment(
      paramNames,
      addresses,
      closure.environment
    );
  },
  FunctionMark: (
    command: FunctionMarkInstr,
    state: ExplicitControlEvaluatorState
  ) => {},
  Environment: (
    command: EnvironmentInstr,
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
  Constant: (command: Constant, state: ExplicitControlEvaluatorState) => {},
  Identifier: (command: Identifier, state: ExplicitControlEvaluatorState) => {},
  LogicalExpression: (
    command: LogicalExpression,
    state: ExplicitControlEvaluatorState
  ) => {},
  StringLiteral: (
    command: StringLiteral,
    state: ExplicitControlEvaluatorState
  ) => {},
  IdentifierStatement: (
    command: IdentifierStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  DefaultStatement: (
    command: DefaultStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  BlockStatement: (
    command: BlockStatement,
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
  IfStatement: (
    command: IfStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  SwitchStatement: (
    command: SwitchStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  DoWhileStatement: (
    command: DoWhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  ForStatement: (
    command: ForStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  WhileStatement: (
    command: WhileStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  BreakStatement: (
    command: BreakStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  ContinueStatement: (
    command: ContinueStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  GotoStatement: (
    command: GotoStatement,
    state: ExplicitControlEvaluatorState
  ) => {},
  ReturnStatement: (
    command: ReturnStatement,
    state: ExplicitControlEvaluatorState
  ) => {}
};

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
    console.log(command);
    // The typecast allows for mapping to a specific evaluator command type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    microcode[command.type](command as any, state);
  }

  return undefined;
};
