import { type TypeofResult } from './types/virtualMachineUtils';
import {
  TypeError,
  TypeErrorContext,
  UnsupportedOperatorError,
  UnsupportedOperatorErrorType
} from './errors';
import { ARBITRARY_TRUE_VALUE, FALSE_VALUE } from '../utils/constants';
import { type Value, type ValueWithDataType } from './types/virtualMachine';
import {
  type BinaryOperator,
  UNARY_OPERATORS,
  type UnaryOperator
} from './types/instructions';
import { type VirtualMemory } from '../memory/virtualMemory';
import { type DataType } from '../ast/types/dataTypes';

const typeOf = (v: Value): TypeofResult => typeof v;
const isNumber = (v: Value): v is number => typeOf(v) === 'number';
const isString = (v: Value): v is string => typeOf(v) === 'string';
export const isTrue = (num: number): boolean => num !== FALSE_VALUE;
export const isUnaryOperator = (operator: string): operator is UnaryOperator =>
  UNARY_OPERATORS.includes(operator as UnaryOperator);

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

export const convertToValueWithDataType = (value: Value): ValueWithDataType => {
  if (!isValueWithDataType(value)) {
    throw new TypeError(
      'Value with dataType',
      typeOf(value),
      TypeErrorContext.NA
    );
  }
  return value;
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

export const evaluateUnaryOperation = (
  operator: UnaryOperator,
  operand: Value,
  memory: VirtualMemory
): Value => {
  switch (operator) {
    case '+':
      return operand;
    case '-':
      return -operand;
    case '!':
      return isTrue(operand) ? FALSE_VALUE : ARBITRARY_TRUE_VALUE;
    case '~':
      return ~operand;
    case '*': {
      const valueWithDataType = convertToValueWithDataType(operand);
      return memory.get(valueWithDataType.dataType, valueWithDataType.value);
    }
    default:
      throw new UnsupportedOperatorError(
        operator,
        UnsupportedOperatorErrorType.UNARY
      );
  }
};

export const isValueWithDataType = (
  value: Value
): value is ValueWithDataType => {
  return typeof value === 'object' && 'dataType' in value;
};

export const constructValueWithDataType = (
  value: Value,
  dataType: DataType
): ValueWithDataType => {
  return {
    value,
    dataType
  };
};
