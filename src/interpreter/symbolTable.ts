import { RedeclaredNameError, UndeclaredNameError } from './errors';
import {
  type DeclarationNameWithAddress,
  type SymbolTable,
  type SymbolTableFrame,
  type SymbolTableFrameEntry
} from './types/interpreter';

/**
 * Adds a new frame to the symbol table. Each frame represents a different scope.
 */
export const extendSymbolTable = (
  nameAddressMappings: DeclarationNameWithAddress[],
  symbolTable: SymbolTable
): SymbolTable => {
  const newFrame: SymbolTableFrame = {};

  nameAddressMappings.forEach((mapping) => {
    if (mapping.name in newFrame) {
      throw new RedeclaredNameError(
        'Tried to redeclare a name in the same scope.'
      );
    }
    newFrame[mapping.name] = {
      address: mapping.address,
      nameType: mapping.nameType
    };
  });

  return {
    head: newFrame,
    tail: symbolTable
  };
};

/**
 * Gets the address of a name.
 */
export const getAddressFromSymbolTable = (
  name: string,
  symbolTable: SymbolTable
): number => {
  let currentEnvironment: SymbolTable | null = symbolTable;

  while (currentEnvironment !== null) {
    const frame = symbolTable.head;
    if (name in frame) {
      return frame[name].address;
    }
    currentEnvironment = currentEnvironment.tail;
  }

  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

/**
 * Gets the entry of a name.
 */
export const getEntryFromSymbolTable = (
  name: string,
  symbolTable: SymbolTable
): SymbolTableFrameEntry => {
  let currentEnvironment: SymbolTable | null = symbolTable;

  while (currentEnvironment !== null) {
    const frame = symbolTable.head;
    if (name in frame) {
      return frame[name];
    }
    currentEnvironment = currentEnvironment.tail;
  }

  throw new UndeclaredNameError(`Encountered an undeclared name: ${name}`);
};

/**
 * Constructs the first frame of the symbol table.
 */
export const constructInitialSymbolTable = (): SymbolTable => {
  return {
    head: {},
    tail: null
  };
};
