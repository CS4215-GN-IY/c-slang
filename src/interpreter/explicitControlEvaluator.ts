import { type Result, type Value } from './types/evaluationResults';
import { Stack } from '../utils/stack';
import {
  type AgendaItem,
  type AgendaItemEvaluatorMapping,
  type ExplicitControlEvaluatorState
} from './types/interpreter';
import {
  type FunctionDeclaration,
  type Program,
  type VariableDeclaration
} from '../ast/types';
import {
  allocateExternalDeclaration,
  getExternalDeclarationNames
} from './utils';
import { VirtualMemory } from '../memory/virtualMemory';
import { Environment } from './environment';
import { type FunctionAssigmentInstr } from './types/instruction';
import {
  constructFunctionAssignmentInstr,
  constructClosure
} from './instruction';
import { TextMemory } from '../memory/textMemory';

const microcode: AgendaItemEvaluatorMapping = {
  Program: (command: Program, state: ExplicitControlEvaluatorState) => {
    const declarationAddresses = allocateExternalDeclaration(
      command.body,
      state.memory
    );
    if (declarationAddresses.length > 0) {
      const declarationNames = getExternalDeclarationNames(command.body);
      state.environment.extend(declarationNames, declarationAddresses);
    }

    for (let i = command.body.length - 1; i >= 0; i--) {
      state.agenda.push(command.body[i]);
    }
  },
  FunctionDeclaration: (
    command: FunctionDeclaration,
    state: ExplicitControlEvaluatorState
  ) => {
    const closure = constructClosure(
      command,
      state.environment.copyOfCurrent()
    );
    const closureIdx = state.textMemory.allocate(closure);
    const functionAssignmentInstr = constructFunctionAssignmentInstr(
      state.environment.get(command.id.name),
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
  }
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
  agenda.push(ast);
  const stash = new Stack<Value>();
  const environment = new Environment();
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
