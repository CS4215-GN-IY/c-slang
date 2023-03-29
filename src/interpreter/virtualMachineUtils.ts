import { type TypeofResult } from './types/virtualMachineUtils';
import { type BinaryOperator } from '../ast/types';
import {
  TypeError,
  TypeErrorContext,
  UnsupportedOperatorError,
  UnsupportedOperatorErrorType
} from './errors';
import { ARBITRARY_TRUE_VALUE, FALSE_VALUE } from '../utils/constants';
import { type Value } from './types/virtualMachine';

const typeOf = (v: Value): TypeofResult => typeof v;
const isNumber = (v: Value): v is number => typeOf(v) === 'number';
const isString = (v: Value): v is string => typeOf(v) === 'string';
export const isTrue = (num: number): boolean => num !== FALSE_VALUE;

export const convertToAddress = (address: Value): number => {
  return convertToNumber(address, TypeErrorContext.ADDRESS);
};

export const convertToPredicate = (value: Value): number => {
  return convertToNumber(value, TypeErrorContext.PREDICATE);
};

export const convertBooleanToPredicate = (value: boolean): number => {
  return value ? ARBITRARY_TRUE_VALUE : FALSE_VALUE;
};

export const convertToNumber = (
  number: Value,
  typeErrorContext: TypeErrorContext
): number => {
  if (!isNumber(number)) {
    throw new TypeError('number', typeOf(number), typeErrorContext);
  }
  return number;
};

export const typeCheckBinaryOperation = (
  operator: BinaryOperator,
  left: Value,
  right: Value
): void => {
  switch (operator) {
    case '-':
    case '*':
    case '/':
    case '%':
    case '<<':
    case '>>':
    case '&':
    case '^':
    case '|':
      if (!isNumber(left)) {
        throw new TypeError('number', typeOf(left), TypeErrorContext.LHS);
      }
      if (!isNumber(right)) {
        throw new TypeError('number', typeOf(right), TypeErrorContext.RHS);
      }
      break;
    case '+':
    case '<':
    case '<=':
    case '>':
    case '>=':
      if (!isNumber(left) && !isString(left)) {
        throw new TypeError(
          'string or number',
          typeOf(left),
          TypeErrorContext.LHS
        );
      }
      if (isNumber(left) && !isNumber(right)) {
        throw new TypeError('number', typeOf(right), TypeErrorContext.RHS);
      }
      if (isString(left) && !isString(right)) {
        throw new TypeError('string', typeOf(right), TypeErrorContext.RHS);
      }
      break;
    case '==':
    case '!=':
      break;
    default:
      throw new UnsupportedOperatorError(
        operator,
        UnsupportedOperatorErrorType.BINARY
      );
  }
};

export function evaluateBinaryExpression(
  operator: BinaryOperator,
  left: Value,
  right: Value
): Value {
  switch (operator) {
    case '+':
      // Separate type guards are required due to typescript rules: https://typescript-eslint.io/rules/restrict-plus-operands/
      return isNumber(left) && isNumber(right)
        ? left + right
        : isString(left) && isString(right)
        ? left + right
        : undefined;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return left / right;
    case '%':
      return left % right;
    case '<=':
      return convertBooleanToPredicate(left <= right);
    case '<':
      return convertBooleanToPredicate(left < right);
    case '>':
      return convertBooleanToPredicate(left > right);
    case '>=':
      return convertBooleanToPredicate(left >= right);
    case '<<':
      return left << right;
    case '>>':
      return left >> right;
    case '&':
      return left & right;
    case '^':
      return left ^ right;
    case '|':
      return left | right;
    case '==':
      return convertBooleanToPredicate(left === right);
    case '!=':
      return convertBooleanToPredicate(left !== right);
    default:
      throw new UnsupportedOperatorError(
        operator,
        UnsupportedOperatorErrorType.BINARY
      );
  }
}
