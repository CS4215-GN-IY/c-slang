import { type Value } from './types/evaluationResults';
import { type TypeofResult } from './types/evaluatorUtils';
import { type BinaryOperator } from '../ast/types';
import {
  TypeError,
  TypeErrorContext,
  UnsupportedBinaryOperatorError
} from './errors';
import { FALSE_VALUE } from '../utils/constants';

export const typeOf = (v: Value): TypeofResult => typeof v;
export const isNumber = (v: Value): v is number => typeOf(v) === 'number';
export const isAddress = (address: Value): address is number =>
  isNumber(address);
const isString = (v: Value): v is string => typeOf(v) === 'string';
export const isTrue = (num: number): boolean => num !== FALSE_VALUE;

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
    default:
      throw new UnsupportedBinaryOperatorError(operator);
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
      return left <= right;
    case '<':
      return left < right;
    case '>':
      return left > right;
    case '>=':
      return left >= right;
    default:
      throw new UnsupportedBinaryOperatorError(operator);
  }
}
