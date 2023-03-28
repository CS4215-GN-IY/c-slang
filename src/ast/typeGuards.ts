import {
  type BaseReturnValue,
  type TypedefNameReturnValue
} from './astBuilderInternalTypes';
import {
  type BaseNode,
  BINARY_OPERATORS,
  type BinaryOperator,
  type Constant,
  type EmptyStatement,
  type ForStatement,
  type Identifier,
  type VariableDeclaration
} from './types';

export const isTypedefNameReturnValue = (
  returnValue: BaseReturnValue
): returnValue is TypedefNameReturnValue => {
  return returnValue.type === 'TypedefName';
};

export const isIdentifier = (node: BaseNode): node is Identifier => {
  return node.type === 'Identifier';
};

export const isConstant = (node: BaseNode): node is Constant => {
  return node.type === 'Constant';
};

export const isVariableDeclaration = (
  node: BaseNode
): node is VariableDeclaration => {
  return node.type === 'VariableDeclaration';
};

export const isEmptyStatement = (node: BaseNode): node is EmptyStatement => {
  return node.type === 'EmptyStatement';
};

export const isForStatement = (node: BaseNode): node is ForStatement => {
  return node.type === 'ForStatement';
};

export const isBinaryOperator = (
  operator: string
): operator is BinaryOperator => {
  // Typecast is safe as it is only used to check if the operator is a binary operator.
  return BINARY_OPERATORS.includes(operator as BinaryOperator);
};
