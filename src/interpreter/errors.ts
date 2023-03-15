export class InterpreterError extends Error {}

export class BrokenEnvironmentError extends InterpreterError{}

export class UnknownCommandError extends  InterpreterError{}
