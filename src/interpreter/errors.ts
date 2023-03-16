export class InterpreterError extends Error {}

export class RedeclaredNameError extends InterpreterError {}

export class UndeclaredNameError extends InterpreterError {}

export class InvalidFunctionApplication extends InterpreterError {}
