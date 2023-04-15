import {
  type BlockStatement,
  type FunctionDeclaration,
  type ParameterDeclaration,
  type Program,
  type Declaration
} from '../ast/types/ast';
import {
  type ArraySymbolTableEntry,
  type BuiltInFunctionSymbolTableEntry,
  type UserDeclaredFunctionSymbolTableEntry,
  type SymbolTable,
  type SymbolTableEntry,
  type SymbolTableEntryScope,
  type SymbolTableFrame,
  type VariableSymbolTableEntry
} from './types/symbolTable';
import {
  InvalidScopeError,
  RedeclaredNameError,
  TypeError,
  TypeErrorContext,
  UndeclaredNameError,
  UnsupportedDeclarationError
} from './errors';
import {
  isArrayPattern,
  isEmptyStatement,
  isForStatement,
  isParameterDeclaratorDeclaration,
  isDeclaration,
  isPointerPattern
} from '../ast/types/typeGuards';
import { Segment } from '../memory/segment';
import { isNotNull, isNotUndefined } from '../utils/typeGuards';
import {
  getArrayMaxNumOfItems,
  getArrayPatternMultipliers,
  getFixedNumOfItemsOfDeclaratorPattern,
  getNameFromDeclaratorPattern
} from './compilerUtils';
import {
  ADDRESS_SIZE_IN_BYTES,
  constructAddressDataType,
  FLOAT64
} from '../ast/types/dataTypes';

export const addProgramSymbolTableEntries = (
  program: Program,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame = symbolTable.head;
  let offset = getSizeOfFrameInBytes(frame);
  program.body.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        offset = addFunctionDeclarationSymbolTableEntry(
          declaration,
          'Global',
          offset,
          frame
        );
        break;
      }
      case 'Declaration': {
        offset = addDeclarationSymbolTableEntries(
          declaration,
          'Global',
          offset,
          frame
        );
        break;
      }
      default: {
        throw new UnsupportedDeclarationError();
      }
    }
  });
  return symbolTable;
};

export const addFunctionSymbolTableEntries = (
  node: FunctionDeclaration,
  symbolTable: SymbolTable,
  functionEntry: UserDeclaredFunctionSymbolTableEntry
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  // The parameters of the current stack frame can be found via an offset of -4
  // from the current rbp. See `stackFunctionCallSetup` for more information.
  const paramsStartOffset = -3 * ADDRESS_SIZE_IN_BYTES;
  let offset = paramsStartOffset;
  node.params.forEach((param) => {
    offset = addParameterDeclarationSymbolTableEntries(
      param,
      'Function',
      offset,
      frame,
      functionEntry
    );
  });

  offset = 0;
  if (!isEmptyStatement(node.body)) {
    node.body.items.forEach((item) => {
      const declaration = isDeclaration(item)
        ? item
        : isForStatement(item) &&
          isNotUndefined(item.init) &&
          isDeclaration(item.init)
        ? item.init
        : undefined;
      if (isNotUndefined(declaration)) {
        offset = addDeclarationSymbolTableEntries(
          declaration,
          'Function',
          offset,
          frame
        );
      }
    });
  }

  functionEntry.totalSizeOfVariablesInBytes = offset;

  return {
    head: frame,
    tail: symbolTable,
    parent: functionEntry
  };
};

export const addBlockSymbolTableEntries = (
  block: BlockStatement,
  symbolTable: SymbolTable
): SymbolTable => {
  const frame: SymbolTableFrame = {};
  if (!isNotNull(symbolTable.parent)) {
    throw new InvalidScopeError('Block is not inside a function.');
  }
  let offset = symbolTable.parent.totalSizeOfVariablesInBytes;
  block.items.forEach((item) => {
    const declaration = isDeclaration(item)
      ? item
      : isForStatement(item) &&
        isNotUndefined(item.init) &&
        isDeclaration(item.init)
      ? item.init
      : undefined;
    if (isNotUndefined(declaration)) {
      offset = addDeclarationSymbolTableEntries(
        declaration,
        'Block',
        offset,
        frame
      );
    }
  });

  symbolTable.parent.totalSizeOfVariablesInBytes = offset;

  return {
    head: frame,
    tail: symbolTable,
    parent: symbolTable.parent
  };
};

export const getArraySymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): ArraySymbolTableEntry => {
  const arrayEntry = getSymbolTableEntry(name, symbolTable);
  if (!isArraySymbolTableEntry(arrayEntry)) {
    throw new TypeError('array', arrayEntry.nameType, TypeErrorContext.NAME);
  }
  return arrayEntry;
};

export const getFunctionSymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): UserDeclaredFunctionSymbolTableEntry | BuiltInFunctionSymbolTableEntry => {
  const functionEntry = getSymbolTableEntry(name, symbolTable);
  if (
    !(
      isUserDeclaredFunctionSymbolTableEntry(functionEntry) ||
      isBuiltinFunctionSymbolTableEntry(functionEntry)
    )
  ) {
    throw new TypeError(
      'function',
      functionEntry.nameType,
      TypeErrorContext.NAME
    );
  }
  return functionEntry;
};

export const getSymbolTableEntry = (
  name: string,
  symbolTable: SymbolTable
): SymbolTableEntry => {
  let currentTable: SymbolTable | null = symbolTable;

  while (currentTable !== null) {
    const frame = currentTable.head;
    if (name in frame) {
      return frame[name];
    }
    currentTable = currentTable.tail;
  }

  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

export const getSymbolTableEntryInFrame = (
  name: string,
  frame: SymbolTableFrame
): SymbolTableEntry => {
  if (name in frame) {
    return frame[name];
  }
  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

export const getSegmentScope = (scope: SymbolTableEntryScope): Segment => {
  switch (scope) {
    case 'Block':
      return Segment.STACK;
    case 'Function':
      return Segment.STACK;
    case 'Global':
      return Segment.DATA;
    default:
      throw new InvalidScopeError('Encountered an invalid symbol table scope.');
  }
};

export const isArraySymbolTableEntry = (
  entry: SymbolTableEntry
): entry is ArraySymbolTableEntry => {
  return entry.nameType === 'Array';
};

export const isUserDeclaredFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is UserDeclaredFunctionSymbolTableEntry => {
  return entry.nameType === 'UserDeclaredFunction';
};

export const isBuiltinFunctionSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is BuiltInFunctionSymbolTableEntry => {
  return entry.nameType === 'BuiltInFunction';
};

export const isVariableSymbolTableEntry = (
  entry: SymbolTableEntry
): entry is VariableSymbolTableEntry => {
  return entry.nameType === 'Variable';
};

export const getSizeOfFrameInBytes = (frame: SymbolTableFrame): number => {
  return Object.values(frame).reduce(
    (total, currEntry) => total + currEntry.dataType.sizeInBytes,
    0
  );
};

const addToFrame = (
  frame: SymbolTableFrame,
  ...entries: SymbolTableEntry[]
): void => {
  entries.forEach((entry) => {
    if (entry.name in frame) {
      throw new RedeclaredNameError(`Tried to redeclare name '${entry.name}'`);
    }
    frame[entry.name] = entry;
  });
};

const addFunctionDeclarationSymbolTableEntry = (
  functionDeclaration: FunctionDeclaration,
  scope: SymbolTableEntryScope,
  offset: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  const entry: SymbolTableEntry = {
    name: getNameFromDeclaratorPattern(functionDeclaration.id),
    nameType: 'UserDeclaredFunction',
    offset,
    scope,
    paramDataTypes: [],
    returnDataType: functionDeclaration.returnDataType,
    totalSizeOfVariablesInBytes: 0,
    dataType: constructAddressDataType(FLOAT64)
  };
  offset +=
    getFixedNumOfItemsOfDeclaratorPattern(functionDeclaration.id) *
    ADDRESS_SIZE_IN_BYTES;
  addToFrame(symbolTableFrame, entry);
  return offset;
};

const addDeclarationSymbolTableEntries = (
  declaration: Declaration,
  scope: SymbolTableEntryScope,
  startingOffset: number,
  symbolTableFrame: SymbolTableFrame
): number => {
  let offset = startingOffset;
  declaration.declarations.forEach((declarator) => {
    let entry: ArraySymbolTableEntry | VariableSymbolTableEntry;
    if (isArrayPattern(declarator.pattern)) {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Array',
        offset,
        scope,
        multipliers: getArrayPatternMultipliers(declarator.pattern),
        maxNumOfItems: getArrayMaxNumOfItems(declarator.pattern),
        dataType: declaration.dataType
      };
      offset +=
        getFixedNumOfItemsOfDeclaratorPattern(declarator.pattern) *
        declaration.dataType.sizeInBytes;
    } else if (isPointerPattern(declarator.pattern)) {
      const dataType = constructAddressDataType(declaration.dataType);
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Variable',
        offset,
        scope,
        dataType
      };
      offset +=
        getFixedNumOfItemsOfDeclaratorPattern(declarator.pattern) *
        dataType.sizeInBytes;
    } else {
      entry = {
        name: getNameFromDeclaratorPattern(declarator.pattern),
        nameType: 'Variable',
        offset,
        scope,
        dataType: declaration.dataType
      };
      offset +=
        getFixedNumOfItemsOfDeclaratorPattern(declarator.pattern) *
        declaration.dataType.sizeInBytes;
    }
    addToFrame(symbolTableFrame, entry);
  });
  return offset;
};

const addParameterDeclarationSymbolTableEntries = (
  parameterDeclaration: ParameterDeclaration,
  scope: SymbolTableEntryScope,
  startingOffset: number,
  symbolTableFrame: SymbolTableFrame,
  functionEntry: UserDeclaredFunctionSymbolTableEntry
): number => {
  let offset = startingOffset;
  let entry: SymbolTableEntry;
  if (isParameterDeclaratorDeclaration(parameterDeclaration)) {
    const declaratorPattern = parameterDeclaration.declarator;
    if (isArrayPattern(declaratorPattern)) {
      const dataType = constructAddressDataType(parameterDeclaration.dataType);
      offset -=
        getFixedNumOfItemsOfDeclaratorPattern(declaratorPattern) *
        dataType.sizeInBytes;
      functionEntry.paramDataTypes.push(dataType);
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Array',
        offset,
        scope,
        multipliers: getArrayPatternMultipliers(declaratorPattern),
        maxNumOfItems: getArrayMaxNumOfItems(declaratorPattern),
        dataType
      };
    } else if (isPointerPattern(declaratorPattern)) {
      const dataType = constructAddressDataType(parameterDeclaration.dataType);
      offset -=
        getFixedNumOfItemsOfDeclaratorPattern(declaratorPattern) *
        dataType.sizeInBytes;
      functionEntry.paramDataTypes.push(dataType);
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Variable',
        offset,
        scope,
        dataType
      };
    } else {
      offset -=
        getFixedNumOfItemsOfDeclaratorPattern(declaratorPattern) *
        parameterDeclaration.dataType.sizeInBytes;
      functionEntry.paramDataTypes.push(parameterDeclaration.dataType);
      entry = {
        name: getNameFromDeclaratorPattern(declaratorPattern),
        nameType: 'Variable',
        offset,
        scope,
        dataType: parameterDeclaration.dataType
      };
    }
  } else {
    // TODO: Handle ParameterAbstractDeclaratorDeclaration.
    throw new Error(
      'Handling of ParameterAbstractDeclaratorDeclaration not implemented yet.'
    );
  }
  addToFrame(symbolTableFrame, entry);
  return offset;
};
