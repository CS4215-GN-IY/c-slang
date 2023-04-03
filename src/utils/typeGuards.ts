/**
 * Returns whether the value is null or not.
 *
 * @param value The possibly null value.
 */
export const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};

/**
 * Returns whether the value is undefined or not.
 *
 * @param value The possibly undefined value.
 */
export const isNotUndefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};

/**
 * Returns whether the value is a number.
 *
 * @param value The value that is possibly of type number.
 */
export const isNumber = <T>(value: T | number): value is number => {
  return typeof value === 'number';
};
