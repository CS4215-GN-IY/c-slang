export class InterpreterError extends Error {}

export class RedeclaredNameError extends InterpreterError {}

export enum TypeErrorSide {
  LHS = ' on left hand side of operation',
  RHS = ' on right hand side of operation'
}

export class TypeError extends InterpreterError {
  constructor(expectedType: string, actualType: string, side: TypeErrorSide) {
    super(`Expected ${expectedType}${side}, got ${actualType}`);
  }
}

export class UndeclaredNameError extends InterpreterError {}

export class InvalidFunctionApplicationError extends InterpreterError {}
