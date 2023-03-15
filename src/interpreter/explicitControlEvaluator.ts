import { type Result, type Value } from './types/evaluationResults';
import { Stack } from '../utils/stack';
import {AgendaItem, type ExplicitControlEvaluatorState} from './types/interpreter';
import {FunctionDeclaration, Node, type Program, VariableDeclaration} from '../ast/types';
import {allocateExternalDeclaration, getExternalDeclarationNames} from "./utils";
import {VirtualMemory} from "../memory/virtualMemory";
import {Environment} from "./environment";
import {UnknownCommandError} from "./errors";

const microcode: { [type: string]: (command: AgendaItem, state: ExplicitControlEvaluatorState) => void } = {
  'Program': function (command: Program, state: ExplicitControlEvaluatorState) {
    const declarationAddresses = allocateExternalDeclaration(command.body, state.memory);
    if (declarationAddresses.length > 0) {
      const declarationNames = getExternalDeclarationNames(command.body);
      state.environment.extend(declarationNames, declarationAddresses);
    }

    for (let i = command.body.length - 1; i >= 0; i--) {
      state.agenda.push(command.body[i]);
    }
  },
  'FunctionDeclaration': function (command: FunctionDeclaration, state: ExplicitControlEvaluatorState) {

  },
  'VariableDeclaration': function (command: VariableDeclaration, state: ExplicitControlEvaluatorState) {

  }
}

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
  agenda.push(ast);
  const stash = new Stack<Value>();
  const environment = new Environment();
  const memory = new VirtualMemory(1000, 1000, 1000, 1000);
  const state: ExplicitControlEvaluatorState = {
    agenda,
    stash,
    environment,
    memory
  };

  while (agenda.size() > 0) {
    const command = agenda.pop();
    // if (microcode.hasOwnProperty(command.type)) {
    //   microcode[command.type](command, state);
    // } else {
    //   throw new UnknownCommandError(`Encountered an unknown command: ${command.type}`);
    // }
  }

  return undefined;
};
