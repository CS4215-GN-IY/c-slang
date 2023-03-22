export class InterpreterError extends Error {}

export class UnsupportedBinaryOperatorError extends InterpreterError {
  constructor(operator: string) {
    super(`Encountered unsupported binary operator: ${operator}`);
  }
}

export class InvalidFunctionApplicationError extends InterpreterError {}

export class InvalidFunctionIdentifierError extends InterpreterError {
  constructor() {
    super('Illegal interpretation of function identifier');
  }
}

export class RedeclaredNameError extends InterpreterError {}

export enum TypeErrorSide {
  NA = '',
  LHS = ' on left hand side of operation',
  RHS = ' on right hand side of operation'
}

export class TypeError extends InterpreterError {
  constructor(expectedType: string, actualType: string, side: TypeErrorSide) {
    super(`Expected ${expectedType}${side}, got ${actualType}`);
  }
}

export class UndeclaredNameError extends InterpreterError {}
