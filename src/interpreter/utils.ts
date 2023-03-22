import {
  type BinaryOperator,
  type BlockItem,
  type BlockStatement,
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type VariableDeclaration
} from '../ast/types';
import {
  type Closure,
  type DeclarationName,
  type DeclarationNameWithAddress,
  type DeclarationNameWithValue,
  type SymbolTable
} from './types/interpreter';
import { type Value } from './types/evaluationResults';
import { isConstant, isVariableDeclaration } from '../ast/typeGuards';
import {
  InvalidFunctionApplicationError,
  TypeError,
  TypeErrorSide,
  UnsupportedBinaryOperatorError
} from './errors';
import { type Memory } from '../memory/memory';
import { FALSE_VALUE } from '../utils/constants';

const allocateUninitializedVariable = (memory: Memory): number => {
  const valueWhenUninitialized = 0;
  return memory.stackAllocate(valueWhenUninitialized);
};

export const getBlockNames = (items: BlockItem[]): DeclarationName[] => {
  const allNames: DeclarationName[] = [];
  items.forEach((item) => {
    switch (item.type) {
      case 'VariableDeclaration': {
        const names = getVariableDeclarationNames(item);
        allNames.push(...names);
        break;
      }
    }
  });
  return allNames;
};

export const getExternalDeclarationNames = (
  declarations: ExternalDeclaration[]
): DeclarationName[] => {
  const allNames: DeclarationName[] = [];
  declarations.forEach((declaration) => {
    switch (declaration.type) {
      case 'FunctionDeclaration': {
        const name = getFunctionDeclarationName(declaration);
        allNames.push(name);
        break;
      }
      case 'VariableDeclaration': {
        const names = getVariableDeclarationNames(declaration);
        allNames.push(...names);
        break;
      }
    }
  });
  return allNames;
};

export const getFunctionDeclarationName = (
  functionDeclaration: FunctionDeclaration
): DeclarationName => {
  return {
    name: getIdentifierName(functionDeclaration.id),
    nameType: 'Function'
  };
};

export const allocateStackAddresses = (
  names: DeclarationName[],
  memory: Memory
): DeclarationNameWithAddress[] => {
  const nameAddressMapping: DeclarationNameWithAddress[] = names.map(
    (name) => ({
      ...name,
      address: allocateUninitializedVariable(memory)
    })
  );
  return nameAddressMapping;
};

export const getBlockVariableDeclarationNames = (
  block: BlockStatement
): DeclarationName[] => {
  const allNames: DeclarationName[] = [];
  block.items.forEach((blockItem) => {
    if (isVariableDeclaration(blockItem)) {
      const names = getVariableDeclarationNames(blockItem);
      allNames.push(...names);
    }
  });
  return allNames;
};

export const getVariableDeclarationNames = (
  variableDeclaration: VariableDeclaration
): DeclarationName[] => {
  return variableDeclaration.declarations.map((declarator) => ({
    name: getIdentifierName(declarator.id),
    nameType: 'Variable'
  }));
};

export const getIdentifierName = (identifier: Identifier): string => {
  return identifier.name;
};

export const constructClosure = (
  functionDeclaration: FunctionDeclaration,
  environment: SymbolTable
): Closure => {
  return {
    // TODO: Change this when parameter list is supported
    params: [],
    body: functionDeclaration.body,
    environment
  };
};

// Arguments should either be an integer constant, floating constant, character constant or identifier.
export const setParamArgs = (
  params: Identifier[],
  args: Value[]
): DeclarationNameWithValue[] => {
  if (params.length !== args.length) {
    throw new InvalidFunctionApplicationError(
      `Function takes in ${params.length} arguments but ${args.length} arguments were passed in`
    );
  }

  const nameValueMappings: DeclarationNameWithValue[] = [];
  for (let i = 0; i < params.length; i++) {
    const arg = args[i];
    if (isConstant(arg) && !isNaN(Number(arg.value))) {
      nameValueMappings.push({
        name: params[i].name,
        nameType: 'Variable',
        value: Number(arg.value)
      });
      continue;
    }
    // TODO: Add support for character and address later
    throw new InvalidFunctionApplicationError(
      `Encountered an unhandled argument.`
    );
  }
  return nameValueMappings;
};

const typeOf = (v: Value): string => typeof v;
const isNumber = (v: Value): v is number => typeOf(v) === 'number';
const isString = (v: Value): v is string => typeOf(v) === 'string';

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
        throw new TypeError('number', typeOf(left), TypeErrorSide.LHS);
      }
      if (!isNumber(right)) {
        throw new TypeError('number', typeOf(right), TypeErrorSide.RHS);
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
          TypeErrorSide.LHS
        );
      }
      if (isNumber(left) && !isNumber(right)) {
        throw new TypeError('number', typeOf(right), TypeErrorSide.RHS);
      }
      if (isString(left) && !isString(right)) {
        throw new TypeError('string', typeOf(right), TypeErrorSide.RHS);
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
      // Separate typeguards are required due to typescript rules: https://typescript-eslint.io/rules/restrict-plus-operands/
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

export const typeCheckNumber = (val: Value): void => {
  if (!isNumber(val)) {
    throw new TypeError('number', typeOf(val), TypeErrorSide.NA);
  }
};

export const isTrue = (num: number): boolean => {
  return num !== FALSE_VALUE;
};
