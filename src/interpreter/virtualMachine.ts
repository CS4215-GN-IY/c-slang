import {
  type VirtualMachineMapping,
  type VirtualMachineState,
  type Result,
  type Value
} from './types/virtualMachine';
import {
  type AssignInstr,
  type BinaryOperationInstr,
  type BreakDoneInstr,
  type BreakInstr,
  type CallInstr,
  type DoneInstr,
  type EnterProgramInstr,
  type FallthroughDoneInstr,
  type FallthroughInstr,
  type GotoInstr,
  type Instr,
  type JumpOnFalseInstr,
  type JumpOnTrueInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type MatchCaseInstr,
  type PopInstr,
  type TeardownInstr
} from './types/instructions';
import {
  convertToAddress,
  convertToPredicate,
  evaluateBinaryExpression,
  isTrue,
  typeCheckBinaryOperation
} from './virtualMachineUtils';
import { Stack } from '../utils/stack';
import { type Program } from '../ast/types';
import { compileProgram } from './compiler';
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
  const state: VirtualMachineState = {
    memory,
    stash
  };
  while (!state.memory.isAtDoneInstr()) {
    const instr = state.memory.getCurrentInstr();
    // The typecast allows for mapping to a specific evaluator instr type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    virtualMachineEvaluators[instr.type](instr as any, state);
  }
  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const virtualMachineEvaluators: VirtualMachineMapping = {
  Assign: (instr: AssignInstr, state: VirtualMachineState) => {
    // TODO: Add conversion method to convert various stash values to their respective number.
    // Do this when types are supported.
    state.memory.setByOffset(instr.scope, instr.offset, state.stash.pop());
    state.memory.moveToNextInstr();
  },
  BinaryOperation: (
    instr: BinaryOperationInstr,
    state: VirtualMachineState
  ) => {
    const right = state.stash.pop();
    const left = state.stash.pop();
    typeCheckBinaryOperation(instr.operator, left, right);
    state.stash.push(evaluateBinaryExpression(instr.operator, left, right));
    state.memory.moveToNextInstr();
  },
  Break: (instr: BreakInstr, state: VirtualMachineState) => {
    state.memory.moveToNextInstrAfterType('BreakDone');
  },
  BreakDone: (instr: BreakDoneInstr, state: VirtualMachineState) => {
    state.memory.moveToNextInstr();
  },
  Call: (instr: CallInstr, state: VirtualMachineState) => {
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const functionInstrAddress = convertToAddress(state.stash.pop());
    state.memory.stackFunctionCallAllocate(args, instr.numOfVars);
    state.memory.moveToInstr(functionInstrAddress);
  },
  Done: (instr: DoneInstr, state: VirtualMachineState) => {},
  EnterProgram: (instr: EnterProgramInstr, state: VirtualMachineState) => {
    state.memory.dataAllocate(instr.numOfDeclarations);
    state.memory.moveToNextInstr();
  },
  Fallthrough: (instr: FallthroughInstr, state: VirtualMachineState) => {
    state.memory.moveToNextInstrAfterType('FallthroughDone');
  },
  FallthroughDone: (
    instr: FallthroughDoneInstr,
    state: VirtualMachineState
  ) => {
    state.memory.moveToNextInstr();
  },
  Goto: (instr: GotoInstr, state: VirtualMachineState) => {
    state.memory.moveToInstr(instr.instrAddress);
  },
  JumpOnFalse: (instr: JumpOnFalseInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.memory.moveToNextInstr();
    } else {
      state.memory.moveToInstr(instr.instrAddress);
    }
  },
  JumpOnTrue: (instr: JumpOnTrueInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.memory.moveToInstr(instr.instrAddress);
    } else {
      state.memory.moveToNextInstr();
    }
  },
  LoadConstant: (instr: LoadConstantInstr, state: VirtualMachineState) => {
    state.stash.push(instr.value);
    state.memory.moveToNextInstr();
  },
  LoadFunction: (instr: LoadFunctionInstr, state: VirtualMachineState) => {
    state.stash.push(instr.functionInstrAddress);
    state.memory.moveToNextInstr();
  },
  LoadSymbol: (instr: LoadSymbolInstr, state: VirtualMachineState) => {
    const value = state.memory.getByOffset(instr.scope, instr.offset);
    state.stash.push(value);
    state.memory.moveToNextInstr();
  },
  MatchCase: (instr: MatchCaseInstr, state: VirtualMachineState) => {
    const caseValue = state.stash.pop();
    const valueToMatch = state.stash.peek();
    const fallthroughDoneInstrType = 'FallthroughDone';
    if (caseValue === valueToMatch) {
      state.memory.moveToNextInstrAfterType(fallthroughDoneInstrType);
      // Once a match is found, there is no need to match again, pop valueToMatch.
      state.stash.pop();
      return;
    }
    if (state.memory.getNextInstr().type === fallthroughDoneInstrType) {
      const fallthroughInstrType = 'Fallthrough';
      state.memory.moveToNextInstrAfterType(fallthroughInstrType);
    } else {
      state.memory.moveToNextInstr();
    }
  },
  Pop: (instr: PopInstr, state: VirtualMachineState) => {
    state.stash.pop();
    state.memory.moveToNextInstr();
  },
  Teardown: (instr: TeardownInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.getReturnAddress();
    state.memory.stackFunctionCallTeardown();
    state.memory.moveToInstr(returnAddress);
  }
};
