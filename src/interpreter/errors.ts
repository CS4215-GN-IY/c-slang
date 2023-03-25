export class InterpreterError extends Error {}

export class UnsupportedBinaryOperatorError extends InterpreterError {
  constructor(operator: string) {
    super(`Encountered unsupported binary operator: ${operator}`);
  }
}

export class InvalidCallError extends InterpreterError {}

export class InvalidFunctionIdentifierError extends InterpreterError {
  constructor() {
    super('Illegal interpretation of function identifier');
  }
}

export class RedeclaredNameError extends InterpreterError {}

export enum TypeErrorContext {
  ADDRESS = ' for an address',
  NA = '',
  LHS = ' on left hand side of operation',
  RHS = ' on right hand side of operation'
}

export class TypeError extends InterpreterError {
  constructor(
    expectedType: string,
    actualType: string,
    context: TypeErrorContext
  ) {
    super(`Expected ${expectedType}${context}, got ${actualType}`);
  }
}

export class UndeclaredNameError extends InterpreterError {}

export class UnhandledDeclarationError extends InterpreterError {}

export class UnhandledScopeError extends InterpreterError {}
