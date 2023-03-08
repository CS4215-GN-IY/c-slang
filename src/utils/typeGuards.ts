/**
 * Returns whether the value is null or not.
 *
 * @param value The possibly null value.
 */
export const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};
