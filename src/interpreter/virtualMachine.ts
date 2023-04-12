import {
  type Value,
  type VirtualMachineMapping,
  type VirtualMachineState
} from './types/virtualMachine';
import {
  type ArrayAccessInstr,
  type AssignInstr,
  type AssignToAddressInstr,
  type BinaryOperationInstr,
  type BreakDoneInstr,
  type BreakInstr,
  type CallBuiltInInstr,
  type CallInstr,
  type ContinueDoneInstr,
  type ContinueInstr,
  type DoneInstr,
  type EnterProgramInstr,
  type FallthroughDoneInstr,
  type FallthroughInstr,
  type Instr,
  type JumpInstr,
  type JumpOnFalseInstr,
  type JumpOnTrueInstr,
  type LoadAddressInstr,
  type LoadConstantInstr,
  type LoadFunctionInstr,
  type LoadReturnAddressInstr,
  type LoadSymbolInstr,
  type MatchCaseInstr,
  type PopInstr,
  type TailCallInstr,
  type TeardownInstr,
  type UnaryOperationInstr
} from './types/instructions';
import {
  convertToAddress,
  convertToPredicate,
  evaluateBinaryExpression,
  evaluateUnaryOperation,
  isTrue,
  typeCheckBinaryOperation
} from './virtualMachineUtils';
import { Stack } from '../utils/stack';
import { BUILT_INS } from './builtins';
import { VirtualMemory } from '../memory/virtualMemory';
import { Registers } from '../memory/registers';
import { decodeInstruction } from '../encoding/instructions';
import { Segment } from '../memory/segment';
import { InvalidSegmentError } from '../memory/errors';
import { TextMemoryRegion } from '../memory/textMemoryRegion';

export const interpret = (instructions: Instr[]): Value => {
  const memory = new VirtualMemory(instructions, 8000, 8000, 8000);
  const registers = new Registers();
  const stash = new Stack<Value>();
  const state: VirtualMachineState = {
    memory,
    registers,
    stash
  };
  while (true) {
    const encodedInstr = state.memory.getUint64(state.registers.rip);
    const instr = decodeInstruction(encodedInstr);
    if (instr.type === 'Done') {
      break;
    }
    // The typecast allows for mapping to a specific evaluator instr type from their union type.
    // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
    virtualMachineEvaluators[instr.type](instr as any, state);
  }
  return state.stash.size() === 0 ? undefined : state.stash.peek();
};

const virtualMachineEvaluators: VirtualMachineMapping = {
  ArrayAccess: (instr: ArrayAccessInstr, state: VirtualMachineState) => {
    const offset = state.stash.pop();
    const baseAddress = state.stash.pop();
    // TODO: Realign offsets to use 1 byte instead of 8.
    const address = parseInt(baseAddress) + offset * instr.multiplier * 8;
    if (instr.isAccessingAddress) {
      state.stash.push(address);
    } else {
      state.stash.push(state.memory.getFloat64(address));
    }
    state.registers.moveToNextInstruction();
  },
  Assign: (instr: AssignInstr, state: VirtualMachineState) => {
    // TODO: Add conversion method to convert various stash values to their respective number.
    // Do this when types are supported.
    for (let i = instr.numOfItems - 1; i >= 0; i--) {
      const data = state.stash.pop();
      switch (instr.scope) {
        case Segment.DATA: {
          // TODO: Link to base address of data memory region.
          // TODO: Realign offsets to use 1 byte instead of 8.
          const address = 100000 + (instr.offset + i) * 8;
          state.memory.setFloat64(address, data);
          break;
        }
        case Segment.STACK: {
          // TODO: Realign offsets to use 1 byte instead of 8.
          const address = state.registers.rbp + (instr.offset + i) * 8;
          state.memory.setFloat64(address, data);
          break;
        }
        default:
          throw new InvalidSegmentError(
            `Cannot assign values in the ${instr.scope} segment.`
          );
      }
    }
    state.registers.moveToNextInstruction();
  },
  AssignToAddress: (
    instr: AssignToAddressInstr,
    state: VirtualMachineState
  ) => {
    const address = state.stash.pop();
    const data = state.stash.pop();
    state.memory.setFloat64(address, data);
    state.registers.moveToNextInstruction();
  },
  BinaryOperation: (
    instr: BinaryOperationInstr,
    state: VirtualMachineState
  ) => {
    const right = state.stash.pop();
    const left = state.stash.pop();
    typeCheckBinaryOperation(instr.operator, left, right);
    state.stash.push(evaluateBinaryExpression(instr.operator, left, right));
    state.registers.moveToNextInstruction();
  },
  Break: (instr: BreakInstr, state: VirtualMachineState) => {
    let nextInstr: Instr;
    do {
      state.registers.moveToNextInstruction();
      const encodedInstr = state.memory.getUint64(state.registers.rip);
      nextInstr = decodeInstruction(encodedInstr);
    } while (nextInstr.type !== 'BreakDone');
  },
  BreakDone: (instr: BreakDoneInstr, state: VirtualMachineState) => {
    state.registers.moveToNextInstruction();
  },
  Call: (instr: CallInstr, state: VirtualMachineState) => {
    const returnAddress = state.stash.pop();
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const functionInstrAddress = convertToAddress(state.stash.pop());

    // Set up stack frame.
    /*
    Structure of frame is as such:
                   <- rsp
    -------------
    Local vars     <- rbp
    -------------
    Return address
    -------------
    Saved rsp
    -------------
    Saved rbp
    -------------
    Params/Args   <- prev rsp which is stored as Saved rsp
    -------------
    */
    const savedRsp = state.registers.rsp;
    // Push arguments to function onto the stack.
    args.forEach((arg) => {
      // TODO: Handle variable sizes.
      state.memory.setFloat64(state.registers.rsp, arg);
      state.registers.rsp += 8;
    });
    // Push saved rbp onto the stack.
    state.memory.setFloat64(state.registers.rsp, state.registers.rbp);
    state.registers.rsp += 8;
    // Push saved rsp onto the stack.
    state.memory.setFloat64(state.registers.rsp, savedRsp);
    state.registers.rsp += 8;
    // Push return address onto the stack.
    // Note that we cannot push rip here because of tail calls.
    state.memory.setFloat64(state.registers.rsp, returnAddress);
    state.registers.rsp += 8;
    // Advance rbp.
    state.registers.rbp = state.registers.rsp;
    // TODO: Handle variable sizes.
    // Advance rsp by the number of entries for variables.
    state.registers.rsp += instr.numOfEntriesForVars * 8;

    // TODO: Link to base address of text memory region.
    state.registers.rip =
      functionInstrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
  },
  CallBuiltIn: (instr: CallBuiltInInstr, state: VirtualMachineState) => {
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const result = BUILT_INS[instr.builtInName](...args);
    if (result !== undefined) {
      state.stash.push(result);
    }
    state.registers.moveToNextInstruction();
  },
  Continue: (instr: ContinueInstr, state: VirtualMachineState) => {
    let nextInstr: Instr;
    do {
      state.registers.moveToNextInstruction();
      const encodedInstr = state.memory.getUint64(state.registers.rip);
      nextInstr = decodeInstruction(encodedInstr);
    } while (nextInstr.type !== 'ContinueDone');
  },
  ContinueDone: (instr: ContinueDoneInstr, state: VirtualMachineState) => {
    state.registers.moveToNextInstruction();
  },
  Done: (instr: DoneInstr, state: VirtualMachineState) => {},
  EnterProgram: (instr: EnterProgramInstr, state: VirtualMachineState) => {
    state.registers.moveToNextInstruction();
  },
  Fallthrough: (instr: FallthroughInstr, state: VirtualMachineState) => {
    let nextInstr: Instr;
    do {
      state.registers.moveToNextInstruction();
      const encodedInstr = state.memory.getUint64(state.registers.rip);
      nextInstr = decodeInstruction(encodedInstr);
    } while (nextInstr.type !== 'FallthroughDone');
  },
  FallthroughDone: (
    instr: FallthroughDoneInstr,
    state: VirtualMachineState
  ) => {
    state.registers.moveToNextInstruction();
  },
  Jump: (instr: JumpInstr, state: VirtualMachineState) => {
    // TODO: Link to base address of text memory region.
    state.registers.rip =
      instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
  },
  JumpOnFalse: (instr: JumpOnFalseInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.registers.moveToNextInstruction();
    } else {
      // TODO: Link to base address of text memory region.
      state.registers.rip =
        instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
    }
  },
  JumpOnTrue: (instr: JumpOnTrueInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      // TODO: Link to base address of text memory region.
      state.registers.rip =
        instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
    } else {
      state.registers.moveToNextInstruction();
    }
  },
  LoadAddress: (instr: LoadAddressInstr, state: VirtualMachineState) => {
    let address: number;
    switch (instr.scope) {
      case Segment.DATA: {
        // TODO: Link to base address of data memory region.
        // TODO: Realign offsets to use 1 byte instead of 8.
        address = 100000 + instr.offset * 8;
        break;
      }
      case Segment.STACK: {
        // TODO: Realign offsets to use 1 byte instead of 8.
        address = state.registers.rbp + instr.offset * 8;
        break;
      }
      default:
        throw new InvalidSegmentError(
          `Cannot load address in the ${instr.scope} segment.`
        );
    }
    state.stash.push(address);
    state.registers.moveToNextInstruction();
  },
  LoadConstant: (instr: LoadConstantInstr, state: VirtualMachineState) => {
    state.stash.push(instr.value);
    state.registers.moveToNextInstruction();
  },
  LoadFunction: (instr: LoadFunctionInstr, state: VirtualMachineState) => {
    state.stash.push(instr.functionInstrAddress);
    state.registers.moveToNextInstruction();
  },
  LoadReturnAddress: (
    instr: LoadReturnAddressInstr,
    state: VirtualMachineState
  ) => {
    state.stash.push(
      state.registers.rip + 2 * TextMemoryRegion.BYTES_PER_INSTRUCTION
    );
    state.registers.moveToNextInstruction();
  },
  LoadSymbol: (instr: LoadSymbolInstr, state: VirtualMachineState) => {
    let value: number;
    switch (instr.scope) {
      case Segment.DATA: {
        // TODO: Link to base address of data memory region.
        // TODO: Realign offsets to use 1 byte instead of 8.
        const address = 100000 + instr.offset * 8;
        value = state.memory.getFloat64(address);
        break;
      }
      case Segment.STACK: {
        // TODO: Realign offsets to use 1 byte instead of 8.
        const address = state.registers.rbp + instr.offset * 8;
        value = state.memory.getFloat64(address);
        break;
      }
      default:
        throw new InvalidSegmentError(
          `Cannot load symbol from the ${instr.scope} segment.`
        );
    }
    state.stash.push(value);
    state.registers.moveToNextInstruction();
  },
  MatchCase: (instr: MatchCaseInstr, state: VirtualMachineState) => {
    const caseValue = state.stash.pop();
    const valueToMatch = state.stash.peek();
    if (caseValue === valueToMatch) {
      let nextInstr: Instr;
      do {
        state.registers.moveToNextInstruction();
        const encodedInstr = state.memory.getUint64(state.registers.rip);
        nextInstr = decodeInstruction(encodedInstr);
      } while (nextInstr.type !== 'FallthroughDone');
      // Once a match is found, there is no need to match again, pop valueToMatch.
      state.stash.pop();
      return;
    }
    const encodedNextInstr = state.memory.getUint64(
      state.registers.rip + TextMemoryRegion.BYTES_PER_INSTRUCTION
    );
    const nextInstr = decodeInstruction(encodedNextInstr);
    if (nextInstr.type === 'FallthroughDone') {
      let nextInstr: Instr;
      do {
        state.registers.moveToNextInstruction();
        const encodedInstr = state.memory.getUint64(state.registers.rip);
        nextInstr = decodeInstruction(encodedInstr);
      } while (nextInstr.type !== 'Fallthrough');
      state.registers.moveToNextInstruction();
    } else {
      state.registers.moveToNextInstruction();
    }
  },
  Pop: (instr: PopInstr, state: VirtualMachineState) => {
    if (state.stash.size() > 0) {
      state.stash.pop();
    }
    state.registers.moveToNextInstruction();
  },
  TailCall: (instr: TailCallInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.getFloat64(state.registers.rbp - 8);
    state.stash.push(returnAddress);

    // Tear down stack frame.
    const savedRbp = state.memory.getFloat64(state.registers.rbp - 3 * 8);
    const savedRsp = state.memory.getFloat64(state.registers.rbp - 2 * 8);
    state.registers.rbp = savedRbp;
    state.registers.rsp = savedRsp;

    state.registers.moveToNextInstruction();
  },
  Teardown: (instr: TeardownInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.getFloat64(state.registers.rbp - 8);

    // Tear down stack frame.
    const savedRbp = state.memory.getFloat64(state.registers.rbp - 3 * 8);
    const savedRsp = state.memory.getFloat64(state.registers.rbp - 2 * 8);
    state.registers.rbp = savedRbp;
    state.registers.rsp = savedRsp;

    state.registers.rip = returnAddress;
  },
  UnaryOperation: (instr: UnaryOperationInstr, state: VirtualMachineState) => {
    const operand = state.stash.pop();
    state.stash.push(
      evaluateUnaryOperation(instr.operator, operand, state.memory)
    );
    state.registers.moveToNextInstruction();
  }
};
