export class ASTConversionError extends Error {}

export class BrokenInvariantError extends ASTConversionError {}

export class UnreachableCaseError extends BrokenInvariantError {
  constructor() {
    super(
      'An unreachable case was reached! This suggests that an invariant was broken.'
    );
  }
}

export class UnsupportedKeywordError extends ASTConversionError {
  constructor(keyword: string) {
    super(
      `'${keyword}' is a valid keyword in C17 but is not (currently) supported.`
    );
  }
}

export class UnsupportedSyntaxError extends ASTConversionError {}
