import {
  type EvaluatorMapping,
  type EvaluatorState,
  type Result,
  type Value
} from './types/evaluator';
import {
  type AssignInstr,
  type BinaryOperationInstr,
  type CallInstr,
  type DoneInstr,
  type EnterProgramInstr,
  type GotoInstr,
  type Instr,
  type JumpOnFalseInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type TeardownInstr
} from './types/instruction';
import {
  convertToAddress,
  convertToPredicate,
  evaluateBinaryExpression,
  isTrue,
  typeCheckBinaryOperation
} from './evaluatorUtils';
import { Stack } from '../utils/stack';
import { type Program } from '../ast/types';
import { compileProgram } from './virtualMachine';
import { Memory } from '../memory/memory';

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
        const instructions = compileProgram(ast);
        const value = interpret(instructions);
        resolve({ status: 'finished', value });
      } catch (err) {
        resolve({ status: 'error' });
      }
    }
  );
};

export const interpret = (instructions: Instr[]): Value => {
  const memory = new Memory(instructions, 1000, 1000, 1000);
  const stash = new Stack<Value>();
  const state: EvaluatorState = {
    memory,
    stash
  };
  while (!state.memory.isAtDoneInstr()) {
    const instr = state.memory.getCurrentInstr();
    // The typecast allows for mapping to a specific evaluator instr type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    evaluators[instr.type](instr as any, state);
  }
  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const evaluators: EvaluatorMapping = {
  Assign: (instr: AssignInstr, state: EvaluatorState) => {
    // TODO: Add conversion method to convert various stash values to their respective number.
    // Do this when types are supported.
    state.memory.setByOffset(instr.scope, instr.offset, state.stash.pop());
    state.memory.moveToNextInstr();
  },
  BinaryOperation: (instr: BinaryOperationInstr, state: EvaluatorState) => {
    const right = state.stash.pop();
    const left = state.stash.pop();
    typeCheckBinaryOperation(instr.operator, left, right);
    state.stash.push(evaluateBinaryExpression(instr.operator, left, right));
    state.memory.moveToNextInstr();
  },
  Call: (instr: CallInstr, state: EvaluatorState) => {
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const functionInstrAddress = convertToAddress(state.stash.pop());
    state.memory.stackFunctionCallAllocate(args, instr.numOfVars);
    state.memory.moveToInstr(functionInstrAddress);
  },
  Done: (instr: DoneInstr, state: EvaluatorState) => {},
  EnterProgram: (instr: EnterProgramInstr, state: EvaluatorState) => {
    state.memory.dataAllocate(instr.numOfDeclarations);
    state.memory.moveToNextInstr();
  },
  Goto: (instr: GotoInstr, state: EvaluatorState) => {
    state.memory.moveToInstr(instr.instrAddress);
  },
  JumpOnFalse: (instr: JumpOnFalseInstr, state: EvaluatorState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.memory.moveToNextInstr();
    } else {
      state.memory.moveToInstr(instr.instrAddress);
    }
  },
  LoadConstant: (instr: LoadConstantInstr, state: EvaluatorState) => {
    state.stash.push(instr.value);
    state.memory.moveToNextInstr();
  },
  LoadFunction: (instr: LoadFunctionInstr, state: EvaluatorState) => {
    state.stash.push(instr.functionInstrAddress);
    state.memory.moveToNextInstr();
  },
  LoadSymbol: (instr: LoadSymbolInstr, state: EvaluatorState) => {
    const value = state.memory.getByOffset(instr.scope, instr.offset);
    state.stash.push(value);
    state.memory.moveToNextInstr();
  },
  Teardown: (instr: TeardownInstr, state: EvaluatorState) => {
    const returnAddress = state.memory.getReturnAddress();
    state.memory.stackFunctionCallTeardown();
    state.memory.moveToInstr(returnAddress);
  }
};
