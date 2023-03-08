export class ASTConversionError extends Error {}

export class BrokenInvariantError extends ASTConversionError {}

export class UnreachableCaseError extends BrokenInvariantError {
  constructor() {
    super(
      'An unreachable case was reached! This suggests that an invariant was broken.'
    );
  }
}
