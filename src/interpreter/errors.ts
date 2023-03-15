export class InterpreterError extends Error {}

export class BrokenEnvironmentError extends InterpreterError {}

export class UnboundNameError extends InterpreterError {}
