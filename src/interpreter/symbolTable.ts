import { BrokenEnvironmentError, UnboundNameError } from './errors';
import {
  type NameAddressMapping,
  type SymbolTable,
  type SymbolTableFrame
} from './types/interpreter';

/**
 * Adds a new frame to the symbol table. Each frame represents a different scope.
 */
export const extendSymbolTable = (
  nameAddressMappings: NameAddressMapping[],
  environment: SymbolTable
): SymbolTable => {
  const newFrame: SymbolTableFrame = {};

  nameAddressMappings.forEach((mapping) => {
    if (mapping.name in newFrame) {
      throw new BrokenEnvironmentError(
        'Tried to redeclare a name in the same scope.'
      );
    }
    newFrame[mapping.name] = mapping.address;
  });

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
