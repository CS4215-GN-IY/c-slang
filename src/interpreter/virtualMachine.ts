import {
  type Value,
  type ValueWithDataType,
  type ValueWithDebugOutput,
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
  constructValueWithDataType,
  convertToAddress,
  convertToPredicate,
  convertToValueWithDataType,
  evaluateBinaryExpression,
  evaluateUnaryOperation,
  isTrue,
  isValueWithDataType,
  typeCheckBinaryOperation
} from './virtualMachineUtils';
import { Stack } from '../utils/stack';
import {
  VirtualMemory,
  type VirtualMemoryConfig
} from '../memory/virtualMemory';
import { Registers } from '../memory/registers';
import { decodeInstruction } from '../encoding/instructions';
import { Segment } from '../memory/segment';
import { InvalidSegmentError } from '../memory/errors';
import { TextMemoryRegion } from '../memory/textMemoryRegion';
import { TypeError, TypeErrorContext } from './errors';
import {
  ADDRESS_SIZE_IN_BYTES,
  constructAddressDataType,
  FLOAT64,
  isAddressDataType
} from '../ast/types/dataTypes';
import { getBuiltInFunctions } from './builtins';

const TEXT_BASE_ADDRESS = 0;
const DATA_BASE_ADDRESS = 100000;
const STACK_BASE_ADDRESS = 200000;
const HEAP_BASE_ADDRESS = 300000;

let BUILT_INS: Record<string, (...args: any[]) => any>;

export const interpret = (instructions: Instr[]): ValueWithDebugOutput => {
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
  const debugOutput: string[] = [];
  BUILT_INS = getBuiltInFunctions(memory, debugOutput);
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
  return {
    value: state.stash.size() === 0 ? undefined : state.stash.peek(),
    debugOutput
  };
};

const virtualMachineEvaluators: VirtualMachineMapping = {
  ArrayAccess: (instr: ArrayAccessInstr, state: VirtualMachineState) => {
    const offset = state.stash.pop();
    const baseStashAddress = convertToValueWithDataType(state.stash.pop());
    if (!isAddressDataType(baseStashAddress.dataType)) {
      throw new TypeError(
        'Address DataType',
        baseStashAddress.dataType.type,
        TypeErrorContext.NA
      );
    }
    const address =
      parseInt(baseStashAddress.value) +
      offset *
        instr.multiplier *
        baseStashAddress.dataType.valueDataType.sizeInBytes;
    if (instr.isAccessingAddress) {
      const stashAddress = constructValueWithDataType(
        address,
        constructAddressDataType(baseStashAddress.dataType.valueDataType)
      );
      state.stash.push(stashAddress);
    } else {
      state.stash.push(
        state.memory.get(baseStashAddress.dataType.valueDataType, address)
      );
    }
    state.registers.moveToNextInstruction();
  },
  Assign: (instr: AssignInstr, state: VirtualMachineState) => {
    for (let i = instr.numOfItems - 1; i >= 0; i--) {
      let stashValue = state.stash.pop();
      if (isValueWithDataType(stashValue)) {
        stashValue = stashValue.value;
      }
      switch (instr.scope) {
        case Segment.DATA: {
          const address =
            DATA_BASE_ADDRESS +
            instr.offset +
            i * instr.dataTypeOfEachItem.sizeInBytes;
          state.memory.set(instr.dataTypeOfEachItem, address, stashValue);
          break;
        }
        case Segment.STACK: {
          const address =
            state.registers.rbp +
            instr.offset +
            i * instr.dataTypeOfEachItem.sizeInBytes;
          state.memory.set(instr.dataTypeOfEachItem, address, stashValue);
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
    const stashAddress = convertToValueWithDataType(state.stash.pop());
    if (!isAddressDataType(stashAddress.dataType)) {
      throw new TypeError(
        'Address DataType',
        stashAddress.dataType.type,
        TypeErrorContext.NA
      );
    }
    const data = state.stash.pop();
    state.memory.set(
      stashAddress.dataType.valueDataType,
      stashAddress.value,
      data
    );
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
    const stashReturnAddress = convertToValueWithDataType(state.stash.pop());
    const returnAddress = convertToAddress(stashReturnAddress.value);
    // First item popped from the stash should be the arg for the first param and so on.
    const args: ValueWithDataType[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      let value = state.stash.pop();
      if (!isValueWithDataType(value)) {
        value = constructValueWithDataType(value, instr.paramDataTypes[i]);
      }
      args.push(value);
    }
    const stashFunctionAddress = convertToValueWithDataType(state.stash.pop());
    const functionInstrAddress = convertToAddress(stashFunctionAddress.value);

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
    args.reverse().forEach((arg) => {
      state.memory.set(arg.dataType, state.registers.rsp, arg.value);
      state.registers.rsp += ADDRESS_SIZE_IN_BYTES;
    });
    // Push saved rbp onto the stack.
    state.memory.set(
      constructAddressDataType(FLOAT64),
      state.registers.rsp,
      state.registers.rbp
    );
    state.registers.rsp += ADDRESS_SIZE_IN_BYTES;
    // Push saved rsp onto the stack.
    state.memory.set(
      constructAddressDataType(FLOAT64),
      state.registers.rsp,
      savedRsp
    );
    state.registers.rsp += ADDRESS_SIZE_IN_BYTES;
    // Push return address onto the stack.
    // Note that we cannot push rip here because of tail calls.
    state.memory.set(
      constructAddressDataType(FLOAT64),
      state.registers.rsp,
      returnAddress
    );
    state.registers.rsp += ADDRESS_SIZE_IN_BYTES;
    // Advance rbp.
    state.registers.rbp = state.registers.rsp;
    // Advance rsp by the total size of variables.
    state.registers.rsp += instr.totalSizeOfVariablesInBytes;

    state.registers.rip =
      TEXT_BASE_ADDRESS +
      functionInstrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
  },
  CallBuiltIn: (instr: CallBuiltInInstr, state: VirtualMachineState) => {
    // First item popped from the stash should be the arg for the first param and so on.
    const args: Value[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      args.push(state.stash.pop());
    }
    const result = BUILT_INS[instr.builtInName](...args);
    state.stash.push(result);
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
    state.registers.rip =
      TEXT_BASE_ADDRESS +
      instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
  },
  JumpOnFalse: (instr: JumpOnFalseInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.registers.moveToNextInstruction();
    } else {
      state.registers.rip =
        TEXT_BASE_ADDRESS +
        instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
    }
  },
  JumpOnTrue: (instr: JumpOnTrueInstr, state: VirtualMachineState) => {
    const predicate = convertToPredicate(state.stash.pop());
    if (isTrue(predicate)) {
      state.registers.rip =
        TEXT_BASE_ADDRESS +
        instr.instrAddress * TextMemoryRegion.BYTES_PER_INSTRUCTION;
    } else {
      state.registers.moveToNextInstruction();
    }
  },
  LoadAddress: (instr: LoadAddressInstr, state: VirtualMachineState) => {
    let address: number;
    switch (instr.scope) {
      case Segment.DATA: {
        address = DATA_BASE_ADDRESS + instr.offset;
        break;
      }
      case Segment.STACK: {
        address = state.registers.rbp + instr.offset;
        break;
      }
      default:
        throw new InvalidSegmentError(
          `Cannot load address in the ${instr.scope} segment.`
        );
    }
    const stashAddress = constructValueWithDataType(address, instr.dataType);
    state.stash.push(stashAddress);
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
    const stashReturnAddress = constructValueWithDataType(
      state.registers.rip + 2 * TextMemoryRegion.BYTES_PER_INSTRUCTION,
      constructAddressDataType(FLOAT64)
    );
    state.stash.push(stashReturnAddress);
    state.registers.moveToNextInstruction();
  },
  LoadSymbol: (instr: LoadSymbolInstr, state: VirtualMachineState) => {
    let value;
    switch (instr.scope) {
      case Segment.DATA: {
        const address = DATA_BASE_ADDRESS + instr.offset;
        value = state.memory.get(instr.dataType, address);
        break;
      }
      case Segment.STACK: {
        const address = state.registers.rbp + instr.offset;
        value = state.memory.get(instr.dataType, address);
        break;
      }
      default:
        throw new InvalidSegmentError(
          `Cannot load symbol from the ${instr.scope} segment.`
        );
    }
    if (isAddressDataType(instr.dataType)) {
      value = constructValueWithDataType(value, instr.dataType.valueDataType);
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
    const returnAddress = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - ADDRESS_SIZE_IN_BYTES
    );
    const stashReturnAddress = constructValueWithDataType(
      returnAddress,
      constructAddressDataType(FLOAT64)
    );
    state.stash.push(stashReturnAddress);

    // Tear down stack frame.
    const savedRbp = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - 3 * ADDRESS_SIZE_IN_BYTES
    );
    const savedRsp = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - 2 * ADDRESS_SIZE_IN_BYTES
    );
    state.registers.rbp = savedRbp;
    state.registers.rsp = savedRsp;

    state.registers.moveToNextInstruction();
  },
  Teardown: (instr: TeardownInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - ADDRESS_SIZE_IN_BYTES
    );

    // Tear down stack frame.
    const savedRbp = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - 3 * ADDRESS_SIZE_IN_BYTES
    );
    const savedRsp = state.memory.get(
      constructAddressDataType(FLOAT64),
      state.registers.rbp - 2 * ADDRESS_SIZE_IN_BYTES
    );
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
