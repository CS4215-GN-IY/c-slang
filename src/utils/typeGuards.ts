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
