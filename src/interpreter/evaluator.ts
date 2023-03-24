import { type EvaluatorMapping, type EvaluatorState } from './types/evaluator';
import {
  type AssignInstr,
  type CallInstr,
  type DoneInstr,
  type ExitFunctionInstr,
  type GotoInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadSymbolInstr,
  type TeardownInstr
} from './types/vmInstruction';
import { type Value } from './types/evaluationResults';
import { isAddress, typeOf } from './evaluatorUtils';
import { TypeError, TypeErrorContext } from './errors';
import { getSymbolTableEntry } from './vmUtils';
import { type CompilerState } from './types/virtualMachine';
import { Stack } from '../utils/stack';

export const interpret = (compilation: CompilerState): Value => {
  const stash = new Stack<Value>();
  const state: EvaluatorState = {
    memory: compilation.memory,
    pc: 0,
    stash,
    symbolTable: compilation.symbolTable
  };
  while (state.memory.textGet(state.pc).type !== 'Done') {
    const instr = state.memory.textGet(state.pc);
    // The typecast allows for mapping to a specific evaluator command type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    evaluators[instr.type](instr as any, state);
  }
  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const evaluators: EvaluatorMapping = {
  Assign: (command: AssignInstr, state: EvaluatorState) => {
    state.memory.stackAllocate(state.stash.pop());
    state.pc += 1;
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

    // Setup stack for function and write parameters to the stack
    const paramAddresses = state.memory.stackFunctionCallAllocate(args);
    // Push in reverse order as param addresses should be assigned from first to last.
    for (let i = paramAddresses.length - 1; i >= 0; i--) {
      state.stash.push(paramAddresses[i]);
    }
    // Push return address to stack,
    // Call is always followed by Teardown instruction, so add 2 to pc to go past both.
    state.memory.stackAllocate(state.pc + 2);
    // Jump to function
    state.pc = functionInstrAddress;
  },
  Done: (command: DoneInstr, state: EvaluatorState) => {},
  ExitFunction: (command: ExitFunctionInstr, state: EvaluatorState) => {
    while (state.memory.textGet(state.pc).type !== 'Teardown') {
      state.pc += 1;
    }
  },
  Goto: (command: GotoInstr, state: EvaluatorState) => {
    state.pc = command.instrAddress;
  },
  LoadConstant: (command: LoadConstantInstr, state: EvaluatorState) => {
    state.stash.push(command.value);
    state.pc += 1;
  },
  LoadFunction: (command: LoadFunctionInstr, state: EvaluatorState) => {
    state.stash.push(command.functionInstrAddress);
    state.pc += 1;
  },
  LoadSymbol: (command: LoadSymbolInstr, state: EvaluatorState) => {
    const symbolTableEntry = getSymbolTableEntry(
      state.symbolTable,
      command.symbolTableEntryPosition
    );
    const value = state.memory.stackGetByOffset(symbolTableEntry.offset);
    state.stash.push(value);
    state.pc += 1;
  },
  Teardown: (command: TeardownInstr, state: EvaluatorState) => {
    const returnAddress = state.memory.stackGetByOffset(
      command.returnAddressOffset
    );
    state.pc = returnAddress;
    state.memory.stackFunctionCallTeardown();
  }
};
