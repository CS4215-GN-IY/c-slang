import { type CompilerMapping } from './types/compiler';
import {
  type ArrayAccessExpression,
  type AssignmentExpression,
  type BinaryExpression,
  type BlockStatement,
  type BreakStatement,
  type CallExpression,
  type CaseStatement,
  type ConditionalExpression,
  type Constant,
  type ContinueStatement,
  type DefaultStatement,
  type InitializerExpression,
  type DoWhileStatement,
  type EmptyStatement,
  type ExpressionStatement,
  type ForStatement,
  type FunctionDeclaration,
  type GotoStatement,
  type Identifier,
  type IdentifierStatement,
  type IfStatement,
  type InitializerListExpression,
  type LogicalExpression,
  type MemberExpression,
  type Node,
  type Program,
  type ReturnStatement,
  type SequenceExpression,
  type StringLiteral,
  type SwitchStatement,
  type UnaryExpression,
  type UpdateExpression,
  type Declaration,
  type WhileStatement
} from '../ast/types/ast';
import {
  constructArrayAccessInstr,
  constructAssignInstr,
  constructAssignToAddressInstr,
  constructBinaryOperationInstr,
  constructBreakDoneInstr,
  constructBreakInstr,
  constructCallBuiltInInstr,
  constructCallInstr,
  constructContinueDoneInstr,
  constructContinueInstr,
  constructDoneInstr,
  constructEnterProgramInstr,
  constructFallthroughDoneInstr,
  constructFallthroughInstr,
  constructJumpInstr,
  constructJumpOnFalseInstr,
  constructJumpOnTrueInstr,
  constructLoadAddressInstr,
  constructLoadConstantInstr,
  constructLoadFunctionInstr,
  constructLoadReturnAddressInstr,
  constructLoadSymbolInstr,
  constructMatchCaseInstr,
  constructPopInstr,
  constructTailCallInstr,
  constructTeardownInstr,
  constructUnaryOperationInstr,
  isLoadConstantInstr,
  isLoadReturnAddressInstr,
  isLoadSymbolInstr,
  PLACEHOLDER_ADDRESS
} from './instructions';
import {
  isArrayAccessExpression,
  isBinaryOperator,
  isCaseStatement,
  isEmptyStatement,
  isIdentifier,
  isInitializerListExpression,
  isUnaryExpression
} from '../ast/types/typeGuards';
import { isNotUndefined } from '../utils/typeGuards';
import {
  InvalidCallError,
  UnsupportedInitializationError,
  InvalidLValueError,
  UnsupportedArrayError,
  UnsupportedOperatorError,
  UnsupportedOperatorErrorType
} from './errors';
import {
  constructAssignmentExpression,
  constructBinaryExpression,
  constructConditionalExpression,
  constructFalseConstant,
  constructMainCallExpression,
  constructOneConstant,
  constructTrueConstant,
  constructUnaryAddressExpression
} from '../ast/constructors';
import { type LabelFrame, type SymbolTable } from './types/symbolTable';
import {
  addBlockSymbolTableEntries,
  addFunctionSymbolTableEntries,
  addProgramSymbolTableEntries,
  getArraySymbolTableEntry,
  getFunctionSymbolTableEntry,
  getSizeOfFrameInBytes,
  getSymbolTableEntry,
  getSymbolTableEntryInFrame,
  isArraySymbolTableEntry,
  isBuiltinFunctionSymbolTableEntry,
  isUserDeclaredFunctionSymbolTableEntry,
  isVariableSymbolTableEntry
} from './symbolTable';
import { type Instr, type JumpOnFalseInstr } from './types/instructions';
import {
  castConstantToDataType,
  getNameFromDeclaratorPattern
} from './compilerUtils';
import {
  addBlockLabelFrameEntries,
  constructFunctionLabelFrame,
  getLabelEntry,
  updateLabelEntryInstrAddress
} from './labelFrame';
import { isUnaryOperator } from './virtualMachineUtils';
import { getBuiltInSymbols } from './builtins';
import { BrokenInvariantError } from '../ast/errors';

export const compileProgram = (ast: Program): Instr[] => {
  const symbolTable: SymbolTable = {
    head: getBuiltInSymbols(),
    tail: null,
    parent: null
  };
  const instructions: Instr[] = [];
  const labelFrame: LabelFrame = {};
  compile(ast, instructions, symbolTable, labelFrame);
  return instructions;
};

const compile = (
  node: Node,
  instructions: Instr[],
  symbolTable: SymbolTable,
  labelFrame: LabelFrame
): void => {
  // The typecast allows for mapping to a specific evaluator instr type from their union type.
  // https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
  compilers[node.type](node as any, instructions, symbolTable, labelFrame);
};

const compilers: CompilerMapping = {
  ArrayAccessExpression: (
    node: ArrayAccessExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.expression, instructions, symbolTable, labelFrame);
    // TODO: Handle more types of array symbol table entries.
    if (!isIdentifier(node.expression)) {
      throw new UnsupportedArrayError();
    }
    const arraySymbolTableEntry = getArraySymbolTableEntry(
      node.expression.name,
      symbolTable
    );
    const multipliers = arraySymbolTableEntry.multipliers;
    for (let i = 0; i < node.indexesBeingAccessed.length; i++) {
      compile(
        node.indexesBeingAccessed[i],
        instructions,
        symbolTable,
        labelFrame
      );
      const arrayAccessInstruction = constructArrayAccessInstr(
        multipliers[i],
        node.isAccessingAddress
          ? true
          : i !== arraySymbolTableEntry.multipliers.length - 1
      );
      instructions.push(arrayAccessInstruction);
    }
  },
  AssignmentExpression: (
    node: AssignmentExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const binaryOperator = node.operator.slice(0, -1);
    if (isBinaryOperator(binaryOperator)) {
      const binaryExpression = constructBinaryExpression(
        binaryOperator,
        node.left,
        node.right
      );
      compile(binaryExpression, instructions, symbolTable, labelFrame);
    } else {
      compile(node.right, instructions, symbolTable, labelFrame);
    }
    if (isUnaryExpression(node.left) && node.left.operator === '*') {
      // If assigning to a pointer, simply remove one layer of indirection.
      // TODO: Figure this out properly.
      if (!isIdentifier(node.left.operand)) {
        throw new BrokenInvariantError();
      }
      const symbolTableEntry = getSymbolTableEntry(
        node.left.operand.name,
        symbolTable
      );
      if (isBuiltinFunctionSymbolTableEntry(symbolTableEntry)) {
        throw new BrokenInvariantError();
      }
      const loadSymbolInstr = constructLoadSymbolInstr(symbolTableEntry, true);
      instructions.push(loadSymbolInstr);
    } else {
      const unaryAddressExpression = constructUnaryAddressExpression(node.left);
      compile(unaryAddressExpression, instructions, symbolTable, labelFrame);
    }
    const assignToAddressInstr = constructAssignToAddressInstr();
    instructions.push(assignToAddressInstr);
  },
  BinaryExpression: (
    node: BinaryExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.left, instructions, symbolTable, labelFrame);
    compile(node.right, instructions, symbolTable, labelFrame);
    const binaryOperationInstr = constructBinaryOperationInstr(node.operator);
    instructions.push(binaryOperationInstr);
  },
  BlockStatement: (
    node: BlockStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const blockSymbolTable = addBlockSymbolTableEntries(node, symbolTable);
    addBlockLabelFrameEntries(node, labelFrame);
    node.items.forEach((item) => {
      compile(item, instructions, blockSymbolTable, labelFrame);
    });
  },
  BreakStatement: (
    node: BreakStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    // TODO: Figure out how to check that a break statement is only in a loop or switch block.
    const breakInstr = constructBreakInstr();
    instructions.push(breakInstr);
  },
  CallExpression: (
    node: CallExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (!isIdentifier(node.callee)) {
      throw new InvalidCallError('Cannot call non-identifier.');
    }
    const functionEntry = getFunctionSymbolTableEntry(
      node.callee.name,
      symbolTable
    );

    compile(node.callee, instructions, symbolTable, labelFrame);
    for (let i = node.arguments.length - 1; i >= 0; i--) {
      compile(node.arguments[i], instructions, symbolTable, labelFrame);
    }
    // If the function being called is a built-in function, we simply push the CallBuiltInInstr.
    if (isBuiltinFunctionSymbolTableEntry(functionEntry)) {
      if (functionEntry.numOfParams !== node.arguments.length) {
        throw new InvalidCallError(
          `Function takes in ${functionEntry.numOfParams} arguments but ${node.arguments.length} arguments were passed in.`
        );
      }
      const callBuiltInInstr = constructCallBuiltInInstr(
        functionEntry.name,
        node.arguments.length
      );
      instructions.push(callBuiltInInstr);
      return;
    }

    // Note: This would change if/when variadic functions are supported.
    // - There can be less param data types than arguments.
    // - More param symbol table entries must be inserted according to the number of args.
    if (functionEntry.paramDataTypes.length !== node.arguments.length) {
      throw new InvalidCallError(
        `Function takes in ${functionEntry.paramDataTypes.length} arguments but ${node.arguments.length} arguments were passed in.`
      );
    }

    const loadReturnAddressInstr = constructLoadReturnAddressInstr();
    instructions.push(loadReturnAddressInstr);
    const callInstr = constructCallInstr(
      node.arguments.length,
      functionEntry.paramDataTypes,
      functionEntry.totalSizeOfVariablesInBytes
    );
    instructions.push(callInstr);
  },
  CaseStatement: (
    node: CaseStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.label, instructions, symbolTable, labelFrame);
    const matchCaseInstr = constructMatchCaseInstr();
    instructions.push(matchCaseInstr);
    if (!isCaseStatement(node.body)) {
      const fallthroughDoneInstr = constructFallthroughDoneInstr();
      instructions.push(fallthroughDoneInstr);
    }
    compile(node.body, instructions, symbolTable, labelFrame);
    if (!isCaseStatement(node.body)) {
      const fallthroughInstr = constructFallthroughInstr();
      instructions.push(fallthroughInstr);
    }
  },
  ConditionalExpression: (
    node: ConditionalExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.predicate, instructions, symbolTable, labelFrame);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.consequent, instructions, symbolTable, labelFrame);
    const jumpInstr = constructJumpInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
    compile(node.alternate, instructions, symbolTable, labelFrame);
    jumpInstr.instrAddress = instructions.length;
  },
  Constant: (
    node: Constant,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const loadConstantInstr = constructLoadConstantInstr(node.value);
    instructions.push(loadConstantInstr);
  },
  ContinueStatement: (
    node: ContinueStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const continueInstr = constructContinueInstr();
    instructions.push(continueInstr);
  },
  Declaration: (
    node: Declaration,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    node.declarations.forEach((declarator) => {
      const initialValue = declarator.initialValue;
      if (isNotUndefined(initialValue)) {
        compile(initialValue, instructions, symbolTable, labelFrame);
        // Declaration names should have been added to the symbol table by the parent scope.
        // Should only need to assign for declaration in last frame.
        const entry = getSymbolTableEntryInFrame(
          getNameFromDeclaratorPattern(declarator.pattern),
          symbolTable.head
        );
        if (
          isInitializerListExpression(initialValue) &&
          !isArraySymbolTableEntry(entry)
        ) {
          throw new UnsupportedInitializationError();
        }
        if (
          !isVariableSymbolTableEntry(entry) &&
          !isArraySymbolTableEntry(entry)
        ) {
          throw new BrokenInvariantError(
            'Symbol table entry should always be for a variable or array here.'
          );
        }
        const numOfItemsToAssign = isInitializerListExpression(initialValue)
          ? initialValue.initializers.length
          : 1;
        const assignInstr = constructAssignInstr(entry, numOfItemsToAssign);
        instructions.push(assignInstr);
      }
    });
  },
  DefaultStatement: (
    node: DefaultStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    // If this pop instruction is reached, no cases matched, pop value used for matching from the virtual machine stash.
    const popInstr = constructPopInstr();
    instructions.push(popInstr);
    const fallthroughDoneInstr = constructFallthroughDoneInstr();
    instructions.push(fallthroughDoneInstr);
    compile(node.body, instructions, symbolTable, labelFrame);
  },
  DoWhileStatement: (
    node: DoWhileStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const loopStart = instructions.length;
    compile(node.body, instructions, symbolTable, labelFrame);
    const continueDoneInstr = constructContinueDoneInstr();
    instructions.push(continueDoneInstr);
    compile(node.predicate, instructions, symbolTable, labelFrame);
    const jumpOnTrueInstr = constructJumpOnTrueInstr(loopStart);
    instructions.push(jumpOnTrueInstr);
    const breakDoneInstr = constructBreakDoneInstr();
    instructions.push(breakDoneInstr);
  },
  EmptyStatement: (
    node: EmptyStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {},
  ExpressionStatement: (
    node: ExpressionStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.sequence, instructions, symbolTable, labelFrame);
    const popInstr = constructPopInstr();
    instructions.push(popInstr);
  },
  ForStatement: (
    node: ForStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (isNotUndefined(node.init)) {
      compile(node.init, instructions, symbolTable, labelFrame);
    }
    const loopStart = instructions.length;
    let jumpOnFalseInstr: JumpOnFalseInstr | undefined;
    if (isNotUndefined(node.predicate)) {
      compile(node.predicate, instructions, symbolTable, labelFrame);
      jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
      instructions.push(jumpOnFalseInstr);
    }
    compile(node.body, instructions, symbolTable, labelFrame);
    const continueDoneInstr = constructContinueDoneInstr();
    instructions.push(continueDoneInstr);
    if (isNotUndefined(node.update)) {
      compile(node.update, instructions, symbolTable, labelFrame);
    }
    const jumpInstr = constructJumpInstr(loopStart);
    instructions.push(jumpInstr);
    const breakDoneInstr = constructBreakDoneInstr();
    instructions.push(breakDoneInstr);
    if (isNotUndefined(jumpOnFalseInstr)) {
      jumpOnFalseInstr.instrAddress = instructions.length;
    }
  },
  FunctionDeclaration: (
    node: FunctionDeclaration,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const loadFunctionInstr = constructLoadFunctionInstr(PLACEHOLDER_ADDRESS);
    instructions.push(loadFunctionInstr);
    const jumpInstr = constructJumpInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpInstr);

    loadFunctionInstr.functionInstrAddress = instructions.length;

    const symbolTableEntry = getSymbolTableEntry(
      getNameFromDeclaratorPattern(node.id),
      symbolTable
    );
    if (!isUserDeclaredFunctionSymbolTableEntry(symbolTableEntry)) {
      throw new BrokenInvariantError(
        'Symbol table entry should always be for a user-declared function here.'
      );
    }

    const functionSymbolTable = addFunctionSymbolTableEntries(
      node,
      symbolTable,
      symbolTableEntry
    );
    const newLabelFrame = constructFunctionLabelFrame(node);
    if (!isEmptyStatement(node.body)) {
      node.body.items.forEach((item) => {
        compile(item, instructions, functionSymbolTable, newLabelFrame);
      });
    }
    const teardownInstr = constructTeardownInstr();
    instructions.push(teardownInstr);

    jumpInstr.instrAddress = instructions.length;

    const assignInstr = constructAssignInstr(symbolTableEntry, 1);
    instructions.push(assignInstr);
  },
  GotoStatement: (
    node: GotoStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const labelEntry = getLabelEntry(node.argument.name, labelFrame);
    const jumpInstr = constructJumpInstr(labelEntry.instrAddress);
    instructions.push(jumpInstr);
  },
  Identifier: (
    node: Identifier,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const symbolTableEntry = getSymbolTableEntry(node.name, symbolTable);
    if (isArraySymbolTableEntry(symbolTableEntry)) {
      const loadAddressInstr = constructLoadAddressInstr(symbolTableEntry);
      instructions.push(loadAddressInstr);
      return;
    }
    if (isBuiltinFunctionSymbolTableEntry(symbolTableEntry)) {
      return;
    }
    const loadSymbolInstr = constructLoadSymbolInstr(symbolTableEntry, false);
    instructions.push(loadSymbolInstr);
  },
  IdentifierStatement: (
    node: IdentifierStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    updateLabelEntryInstrAddress(
      node.label.name,
      instructions.length,
      labelFrame
    );
    compile(node.body, instructions, symbolTable, labelFrame);
  },
  IfStatement: (
    node: IfStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.predicate, instructions, symbolTable, labelFrame);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.consequent, instructions, symbolTable, labelFrame);
    const jumpInstr = constructJumpInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
    if (isNotUndefined(node.alternate)) {
      compile(node.alternate, instructions, symbolTable, labelFrame);
    }
    jumpInstr.instrAddress = instructions.length;
  },
  InitializerExpression: (
    node: InitializerExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    // TODO: Support designators in future.
    if (node.designators.length > 0) {
      throw new UnsupportedInitializationError();
    }
    compile(node.initializer, instructions, symbolTable, labelFrame);
  },
  InitializerListExpression: (
    node: InitializerListExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    node.initializers.forEach((item) => {
      compile(item, instructions, symbolTable, labelFrame);
    });
  },
  LogicalExpression: (
    node: LogicalExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    let conditionalExpression;
    if (node.operator === '&&') {
      conditionalExpression = constructConditionalExpression(
        node.left,
        node.right,
        constructFalseConstant()
      );
    }
    if (node.operator === '||') {
      conditionalExpression = constructConditionalExpression(
        node.left,
        constructTrueConstant(),
        node.right
      );
    }
    if (conditionalExpression === undefined) {
      throw new UnsupportedOperatorError(
        node.operator,
        UnsupportedOperatorErrorType.LOGICAL
      );
    }
    compile(conditionalExpression, instructions, symbolTable, labelFrame);
  },
  MemberExpression: (
    node: MemberExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {},
  Program: (
    node: Program,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame
  ) => {
    const programSymbolTable = addProgramSymbolTableEntries(node, symbolTable);
    const enterProgramInstr = constructEnterProgramInstr(
      getSizeOfFrameInBytes(symbolTable.head)
    );
    instructions.push(enterProgramInstr);
    node.body.forEach((item) => {
      compile(item, instructions, programSymbolTable, labelFrame);
    });
    const mainCallExpression = constructMainCallExpression();
    compile(mainCallExpression, instructions, programSymbolTable, labelFrame);
    const doneInstr = constructDoneInstr();
    instructions.push(doneInstr);
  },
  ReturnStatement: (
    node: ReturnStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (isNotUndefined(node.argument)) {
      compile(node.argument, instructions, symbolTable, labelFrame);
      if (symbolTable.parent === null) {
        throw new BrokenInvariantError(
          'Return statements must be inside a function.'
        );
      }
      // If returning a symbol, set its type to the function's return type.
      const lastInstr = instructions[instructions.length - 1];
      if (isLoadSymbolInstr(lastInstr)) {
        lastInstr.dataType = symbolTable.parent.returnDataType;
      } else if (isLoadConstantInstr(lastInstr)) {
        lastInstr.value = castConstantToDataType(
          lastInstr.value,
          symbolTable.parent.returnDataType
        );
      }
    }
    // Perform a tail call if the last instruction is a CallInstr.
    // A CallInstr should be preceded by a LoadReturnAddressInstr,
    // so we can check whether the second last instruction is that.
    if (isLoadReturnAddressInstr(instructions[instructions.length - 2])) {
      instructions[instructions.length - 2] = constructTailCallInstr();
    } else {
      const teardownInstr = constructTeardownInstr();
      instructions.push(teardownInstr);
    }
  },
  SequenceExpression: (
    node: SequenceExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (node.expressions.length === 0) {
      return;
    }
    node.expressions.forEach((expression) => {
      compile(expression, instructions, symbolTable, labelFrame);
      const popInstr = constructPopInstr();
      instructions.push(popInstr);
    });
    // Remove the last pop instruction as we want to
    // pop everything from the virtual machine stash except the last expression.
    instructions.pop();
  },
  StringLiteral: (
    node: StringLiteral,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {},
  SwitchStatement: (
    node: SwitchStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    compile(node.discriminant, instructions, symbolTable, labelFrame);
    compile(node.body, instructions, symbolTable, labelFrame);
    const fallthroughDoneInstr = constructFallthroughDoneInstr();
    instructions.push(fallthroughDoneInstr);
    const breakDoneInstr = constructBreakDoneInstr();
    instructions.push(breakDoneInstr);
  },
  UnaryExpression: (
    node: UnaryExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (isUnaryOperator(node.operator)) {
      compile(node.operand, instructions, symbolTable, labelFrame);
      const unaryOperationInstr = constructUnaryOperationInstr(node.operator);
      instructions.push(unaryOperationInstr);
      return;
    }

    if (node.operator === '&') {
      if (isIdentifier(node.operand)) {
        const symbolTableEntry = getSymbolTableEntry(
          node.operand.name,
          symbolTable
        );
        if (isBuiltinFunctionSymbolTableEntry(symbolTableEntry)) {
          throw new InvalidLValueError('Cannot assign to built-in functions.');
        }
        const loadAddressInstr = constructLoadAddressInstr(symbolTableEntry);
        instructions.push(loadAddressInstr);
        return;
      }

      if (isArrayAccessExpression(node.operand)) {
        node.operand.isAccessingAddress = true;
        compile(node.operand, instructions, symbolTable, labelFrame);
        return;
      }

      throw new InvalidLValueError();
    }

    // TODO: Support sizeof after variable sizes are supported.
    throw new UnsupportedOperatorError(
      node.operator,
      UnsupportedOperatorErrorType.UNARY
    );
  },
  UpdateExpression: (
    node: UpdateExpression,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    if (!node.isPrefix) {
      compile(node.operand, instructions, symbolTable, labelFrame);
    }
    const assignmentOperator = node.operator === '++' ? '+=' : '-=';
    const oneConstant = constructOneConstant();
    const assignmentExpression = constructAssignmentExpression(
      assignmentOperator,
      node.operand,
      oneConstant
    );
    compile(assignmentExpression, instructions, symbolTable, labelFrame);
    if (node.isPrefix) {
      compile(node.operand, instructions, symbolTable, labelFrame);
    }
  },
  WhileStatement: (
    node: WhileStatement,
    instructions: Instr[],
    symbolTable: SymbolTable,
    labelFrame: LabelFrame
  ) => {
    const loopStart = instructions.length;
    compile(node.predicate, instructions, symbolTable, labelFrame);
    const jumpOnFalseInstr = constructJumpOnFalseInstr(PLACEHOLDER_ADDRESS);
    instructions.push(jumpOnFalseInstr);
    compile(node.body, instructions, symbolTable, labelFrame);
    const continueDoneInstr = constructContinueDoneInstr();
    instructions.push(continueDoneInstr);
    const jumpInstr = constructJumpInstr(loopStart);
    instructions.push(jumpInstr);
    const breakDoneInstr = constructBreakDoneInstr();
    instructions.push(breakDoneInstr);
    jumpOnFalseInstr.instrAddress = instructions.length;
  }
};
