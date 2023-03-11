export const TYPE_SPECIFIER_WHITELIST = [
  'char',
  'short',
  'int',
  'long',
  'float',
  'double',
  'signed',
  'unsigned'
] as const;

export type TypeSpecifier = (typeof TYPE_SPECIFIER_WHITELIST)[number];

/**
 * Returns whether a type specifier is valid.
 *
 * We make use of a type guard because the 'string' type is more general
 * than the type of 'TypeSpecifier'. This necessitates the use of type
 * casting in order to check if a string is included in the whitelist.
 *
 * @param typeSpecifier The type specifier.
 */
export const isValidTypeSpecifier = (
  typeSpecifier: string
): typeSpecifier is TypeSpecifier => {
  return TYPE_SPECIFIER_WHITELIST.includes(typeSpecifier as TypeSpecifier);
};
