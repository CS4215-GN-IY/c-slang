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
import {
  VirtualMemory,
  type VirtualMemoryConfig
} from '../memory/virtualMemory';
import { Registers } from '../memory/registers';
import { decodeInstruction } from '../encoding/instructions';
import { Segment } from '../memory/segment';
import { InvalidSegmentError } from '../memory/errors';
import { TextMemoryRegion } from '../memory/textMemoryRegion';

const TEXT_BASE_ADDRESS = 0;
const DATA_BASE_ADDRESS = 100000;
const STACK_BASE_ADDRESS = 200000;
const HEAP_BASE_ADDRESS = 300000;

export const interpret = (instructions: Instr[]): Value => {
  const memoryConfig: VirtualMemoryConfig = {
    instructions,
    dataSizeInBytes: 50000,
    stackSizeInBytes: 50000,
    heapSizeInBytes: 50000,
    textBaseAddress: TEXT_BASE_ADDRESS,
    dataBaseAddress: DATA_BASE_ADDRESS,
    stackBaseAddress: STACK_BASE_ADDRESS,
    heapBaseAddress: HEAP_BASE_ADDRESS
  };
  const memory = new VirtualMemory(memoryConfig);
  const registers = new Registers(TEXT_BASE_ADDRESS, STACK_BASE_ADDRESS);
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
    const address = parseInt(baseAddress) + offset * instr.multiplier;
    if (instr.isAccessingAddress) {
      state.stash.push(address);
    } else {
      // TODO: Handle variable sizes.
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
          const address =
            DATA_BASE_ADDRESS +
            (instr.offsetInBytes + i * instr.dataType.sizeInBytes);
          state.memory.set(instr.dataType, address, data);
          break;
        }
        case Segment.STACK: {
          const address =
            state.registers.rbp +
            (instr.offsetInBytes + i * instr.dataType.sizeInBytes);
          state.memory.set(instr.dataType, address, data);
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
    // TODO: Handle variable sizes.
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
    const functionInstrAddressOffset = convertToAddress(state.stash.pop());

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
    // Advance rsp by the size of all variables within the function.
    state.registers.rsp += instr.sizeOfEntriesInBytes;

    state.registers.rip = TEXT_BASE_ADDRESS + functionInstrAddressOffset;
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
    state.registers.rip = TEXT_BASE_ADDRESS + instr.instrAddressOffset;
  },
  JumpOnFalse: (instr: JumpOnFalseInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.registers.moveToNextInstruction();
    } else {
      state.registers.rip = TEXT_BASE_ADDRESS + instr.instrAddressOffset;
    }
  },
  JumpOnTrue: (instr: JumpOnTrueInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.registers.rip = TEXT_BASE_ADDRESS + instr.instrAddressOffset;
    } else {
      state.registers.moveToNextInstruction();
    }
  },
  LoadAddress: (instr: LoadAddressInstr, state: VirtualMachineState) => {
    let address: number;
    switch (instr.scope) {
      case Segment.DATA: {
        address = DATA_BASE_ADDRESS + instr.offsetInBytes;
        break;
      }
      case Segment.STACK: {
        address = state.registers.rbp + instr.offsetInBytes;
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
    state.stash.push(instr.functionInstrAddressOffset);
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
        const address = DATA_BASE_ADDRESS + instr.offsetInBytes;
        value = state.memory.get(instr.dataType, address);
        break;
      }
      case Segment.STACK: {
        const address = state.registers.rbp + instr.offsetInBytes;
        value = state.memory.get(instr.dataType, address);
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
