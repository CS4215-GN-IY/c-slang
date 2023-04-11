export class TypeError extends Error {}

export class InvalidTypeError extends TypeError {
  constructor(typeSpecifierSequence: string) {
    super(`'${typeSpecifierSequence}' is not a valid type.`);
  }
}
