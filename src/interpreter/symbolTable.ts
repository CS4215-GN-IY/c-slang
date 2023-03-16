import { BrokenEnvironmentError, UnboundNameError } from './errors';
import { type SymbolTable, type SymbolTableFrame } from './types/interpreter';

/**
 * Adds a new frame to the symbol table. Each frame represents a different scope.
 */
export const extendSymbolTable = (
  names: string[],
  values: number[],
  environment: SymbolTable
): SymbolTable => {
  if (names.length !== values.length) {
    throw new BrokenEnvironmentError(
      'Encountered a different number of names and values in a frame.'
    );
  }

  const newFrame: SymbolTableFrame = {};

  for (let i = 0; i < names.length; i++) {
    if (names[i] in newFrame) {
      throw new BrokenEnvironmentError(
        'Tried to redeclare a name in the same scope.'
      );
    }
    newFrame[names[i]] = values[i];
  }

  return {
    head: newFrame,
    tail: environment
  };
};

/**
 * Gets the address of a name.
 */
export const getAddressFromSymbolTable = (
  name: string,
  environment: SymbolTable
): number => {
  let currentEnvironment: SymbolTable | null = environment;

  while (currentEnvironment !== null) {
    const frame = environment.head;
    if (name in frame) {
      return frame[name];
    }
    currentEnvironment = currentEnvironment.tail;
  }

  throw new UnboundNameError(`Encountered an undeclared name: ${name}`);
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
