export class InterpreterError extends Error {}

export class InvalidCallError extends InterpreterError {}

export class InvalidLValueError extends InterpreterError {}

export class InvalidScopeError extends InterpreterError {}

export class RedeclaredNameError extends InterpreterError {}

export enum TypeErrorContext {
  ADDRESS = ' for an address',
  BINARY = ' on both sides',
  LHS = ' on left hand side of operation',
  NA = '',
  NAME = ' for a name',
  PREDICATE = ' for a predicate',
  RHS = ' on right hand side of operation'
}

export class TypeError extends InterpreterError {
  constructor(
    expectedType: string,
    actualType: string,
    context: TypeErrorContext
  ) {
    super(`Expected ${expectedType}${context}, got ${actualType}.`);
  }
}

export class UndeclaredNameError extends InterpreterError {}

export class UnsupportedArrayError extends InterpreterError {}

export class UnsupportedDeclarationError extends InterpreterError {}

export enum UnsupportedOperatorErrorType {
  BINARY = 'binary ',
  LOGICAL = 'logical ',
  UNARY = 'unary '
}

export class UnsupportedOperatorError extends InterpreterError {
  constructor(operator: string, operatorType: UnsupportedOperatorErrorType) {
    super(`Encountered unsupported ${operatorType}operator: ${operator}.`);
  }
}
