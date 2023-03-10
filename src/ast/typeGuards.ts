import {
  type BaseReturnValue,
  type TypedefNameReturnValue
} from './astBuilderInternalTypes';

export const isTypedefNameReturnValue = (
  returnValue: BaseReturnValue
): returnValue is TypedefNameReturnValue => {
  return returnValue.type === 'TypedefName';
};
