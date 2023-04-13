import {
  type Value,
  type ValueWithDataType,
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
import { Memory } from '../memory/memory';
import { BUILT_INS } from './builtins';
import {
  constructAddressDataType,
  FLOAT64,
  isAddressDataType
} from '../ast/types/dataTypes';
import { TypeError, TypeErrorContext } from './errors';

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
    if (instr.isAccessingAddress) {
      const stashAddress = constructValueWithDataType(
        state.memory.getAddressByOffset(
          baseStashAddress.value,
          offset *
            instr.multiplier *
            baseStashAddress.dataType.valueDataType.sizeInBytes
        ),
        constructAddressDataType(baseStashAddress.dataType.valueDataType)
      );
      state.stash.push(stashAddress);
    } else {
      state.stash.push(
        state.memory.getByOffsetFromAddress(
          baseStashAddress.value,
          offset *
            instr.multiplier *
            baseStashAddress.dataType.valueDataType.sizeInBytes,
          baseStashAddress.dataType.valueDataType
        )
      );
    }
    state.memory.moveToNextInstr();
  },
  Assign: (instr: AssignInstr, state: VirtualMachineState) => {
    // TODO: Add conversion method to convert various stash values to their respective number.
    // Do this when types are supported.
    for (let i = instr.numOfItems - 1; i >= 0; i--) {
      let stashValue = state.stash.pop();
      if (isValueWithDataType(stashValue)) {
        stashValue = stashValue.value;
      }
      state.memory.setByOffset(
        instr.scope,
        instr.offset + i * instr.dataTypeOfEachItem.sizeInBytes,
        stashValue,
        instr.dataTypeOfEachItem
      );
    }
    state.memory.moveToNextInstr();
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
      stashAddress.value,
      data,
      stashAddress.dataType.valueDataType
    );
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
    const stashReturnAddress = convertToValueWithDataType(state.stash.pop());
    const returnAddress = convertToAddress(stashReturnAddress.value);
    // First item popped from the stash should be the arg for the first param and so on.
    const args: ValueWithDataType[] = [];
    for (let i = 0; i < instr.numOfArgs; i++) {
      let value: Value = state.stash.pop();
      if (!isValueWithDataType(value)) {
        value = constructValueWithDataType(value, instr.paramDataTypes[i]);
      }
      args.push(value);
    }
    const stashFunctionAddress = convertToValueWithDataType(state.stash.pop());
    const functionInstrAddress = convertToAddress(stashFunctionAddress.value);
    state.memory.stackFunctionCallAllocate(
      args,
      instr.totalSizeOfVariablesInBytes,
      returnAddress
    );
    state.memory.moveToInstr(functionInstrAddress);
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
    state.memory.moveToNextInstr();
  },
  Continue: (instr: ContinueInstr, state: VirtualMachineState) => {
    state.memory.moveToNextInstrAfterType('ContinueDone');
  },
  ContinueDone: (instr: ContinueDoneInstr, state: VirtualMachineState) => {
    state.memory.moveToNextInstr();
  },
  Done: (instr: DoneInstr, state: VirtualMachineState) => {},
  EnterProgram: (instr: EnterProgramInstr, state: VirtualMachineState) => {
    state.memory.dataAllocate(instr.sizeOfDeclarationsInBytes);
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
  Jump: (instr: JumpInstr, state: VirtualMachineState) => {
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
  LoadAddress: (instr: LoadAddressInstr, state: VirtualMachineState) => {
    const address = state.memory.getAddressAtOffset(instr.scope, instr.offset);
    const stashAddress = constructValueWithDataType(address, instr.dataType);
    state.stash.push(stashAddress);
    state.memory.moveToNextInstr();
  },
  LoadConstant: (instr: LoadConstantInstr, state: VirtualMachineState) => {
    state.stash.push(instr.value);
    state.memory.moveToNextInstr();
  },
  LoadFunction: (instr: LoadFunctionInstr, state: VirtualMachineState) => {
    state.stash.push(instr.functionInstrAddress);
    state.memory.moveToNextInstr();
  },
  LoadReturnAddress: (
    instr: LoadReturnAddressInstr,
    state: VirtualMachineState
  ) => {
    const stashReturnAddress = constructValueWithDataType(
      state.memory.getInstrAddressByOffset(2),
      constructAddressDataType(FLOAT64)
    );
    state.stash.push(stashReturnAddress);
    state.memory.moveToNextInstr();
  },
  LoadSymbol: (instr: LoadSymbolInstr, state: VirtualMachineState) => {
    let value: Value = state.memory.getByOffset(
      instr.scope,
      instr.offset,
      instr.dataType
    );
    if (isAddressDataType(instr.dataType)) {
      value = constructValueWithDataType(value, instr.dataType.valueDataType);
    }
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
    if (state.stash.size() > 0) {
      state.stash.pop();
    }
    state.memory.moveToNextInstr();
  },
  TailCall: (instr: TailCallInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.getReturnAddress();
    const stashReturnAddress = constructValueWithDataType(
      returnAddress,
      constructAddressDataType(FLOAT64)
    );
    state.stash.push(stashReturnAddress);
    state.memory.stackFunctionCallTeardown();
    state.memory.moveToNextInstr();
  },
  Teardown: (instr: TeardownInstr, state: VirtualMachineState) => {
    const returnAddress = state.memory.getReturnAddress();
    state.memory.stackFunctionCallTeardown();
    state.memory.moveToInstr(returnAddress);
  },
  UnaryOperation: (instr: UnaryOperationInstr, state: VirtualMachineState) => {
    const operand = state.stash.pop();
    state.stash.push(
      evaluateUnaryOperation(instr.operator, operand, state.memory)
    );
    state.memory.moveToNextInstr();
  }
};
