import { type EvaluatorMapping, type EvaluatorState } from './types/evaluator';
import {
  type AssignInstr,
  type BinaryOperationInstr,
  type CallInstr,
  type DoneInstr,
  type EnterProgramInstr,
  type GotoInstr,
  type JumpOnFalseInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type TeardownInstr
} from './types/vmInstruction';
import { type Result, type Value } from './types/evaluationResults';
import {
  evaluateBinaryExpression,
  isAddress,
  isNumber,
  isTrue,
  typeCheckBinaryOperation,
  typeOf
} from './evaluatorUtils';
import { TypeError, TypeErrorContext } from './errors';
import { type CompilerState } from './types/virtualMachine';
import { Stack } from '../utils/stack';
import { type Program } from '../ast/types';
import { compileProgram } from './virtualMachine';

/**
 * Evaluates the abstract syntax tree using a virtual machine evaluator &
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
        const compilation = compileProgram(ast);
        const value = interpret(compilation);
        resolve({ status: 'finished', value });
      } catch (err) {
        resolve({ status: 'error' });
      }
    }
  );
};

export const interpret = (compilation: CompilerState): Value => {
  const stash = new Stack<Value>();
  const state: EvaluatorState = {
    memory: compilation.memory,
    stash
  };
  while (!state.memory.isAtDoneInstr()) {
    const instr = state.memory.getCurrentInstr();
    // The typecast allows for mapping to a specific evaluator command type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    evaluators[instr.type](instr as any, state);
  }
  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const evaluators: EvaluatorMapping = {
  Assign: (command: AssignInstr, state: EvaluatorState) => {
    // TODO: Add conversion method to convert stash value to number.
    state.memory.setByOffset(command.scope, command.offset, state.stash.pop());
    state.memory.moveToNextInstr();
  },
  BinaryOperation: (command: BinaryOperationInstr, state: EvaluatorState) => {
    const right = state.stash.pop();
    const left = state.stash.pop();
    typeCheckBinaryOperation(command.operator, left, right);
    state.stash.push(evaluateBinaryExpression(command.operator, left, right));
    state.memory.moveToNextInstr();
  },
  Call: (command: CallInstr, state: EvaluatorState) => {
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < command.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const functionInstrAddress = state.stash.pop();
    if (!isAddress(functionInstrAddress)) {
      throw new TypeError(
        'number',
        typeOf(functionInstrAddress),
        TypeErrorContext.ADDRESS
      );
    }

    state.memory.stackFunctionCallAllocate(args, command.numOfVars);
    state.memory.moveToInstr(functionInstrAddress);
  },
  Done: (command: DoneInstr, state: EvaluatorState) => {},
  EnterProgram: (command: EnterProgramInstr, state: EvaluatorState) => {
    state.memory.dataAllocate(command.numOfDeclarations);
    state.memory.moveToNextInstr();
  },
  Goto: (command: GotoInstr, state: EvaluatorState) => {
    state.memory.moveToInstr(command.instrAddress);
  },
  JumpOnFalse: (command: JumpOnFalseInstr, state: EvaluatorState) => {
    const predicate = state.stash.pop();
    if (!isNumber(predicate)) {
      throw new TypeError(
        'number',
        typeOf(predicate),
        TypeErrorContext.PREDICATE
      );
    }
    if (isTrue(predicate)) {
      state.memory.moveToNextInstr();
    } else {
      state.memory.moveToInstr(command.instrAddress);
    }
  },
  LoadConstant: (command: LoadConstantInstr, state: EvaluatorState) => {
    state.stash.push(command.value);
    state.memory.moveToNextInstr();
  },
  LoadFunction: (command: LoadFunctionInstr, state: EvaluatorState) => {
    state.stash.push(command.functionInstrAddress);
    state.memory.moveToNextInstr();
  },
  LoadSymbol: (command: LoadSymbolInstr, state: EvaluatorState) => {
    const value = state.memory.getByOffset(command.scope, command.offset);
    state.stash.push(value);
    state.memory.moveToNextInstr();
  },
  Teardown: (command: TeardownInstr, state: EvaluatorState) => {
    const returnAddress = state.memory.getReturnAddress();
    state.memory.stackFunctionCallTeardown();
    state.memory.moveToInstr(returnAddress);
  }
};
