import {
  type BaseReturnValue,
  type TypedefNameReturnValue
} from './astBuilderInternalTypes';
import {
  type AbstractSequencePattern,
  type ArrayAccessExpression,
  type ArrayPattern,
  type BaseNode,
  BINARY_OPERATORS,
  type BinaryOperator,
  type CaseStatement,
  type Constant,
  type EmptyStatement,
  type ExpressionBracketContent,
  type ExpressionlessBracketContent,
  type ForStatement,
  type FunctionPattern,
  type Identifier,
  type IdentifierStatement,
  type PointerPattern,
  type StarBracketContent,
  type VariableDeclaration
} from './types';

export const isTypedefNameReturnValue = (
  returnValue: BaseReturnValue
): returnValue is TypedefNameReturnValue => {
  return returnValue.type === 'TypedefName';
};

export const isArrayAccessExpression = (
  node: BaseNode
): node is ArrayAccessExpression => {
  return node.type === 'ArrayAccessExpression';
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

export const isCaseStatement = (node: BaseNode): node is CaseStatement => {
  return node.type === 'CaseStatement';
};

export const isEmptyStatement = (node: BaseNode): node is EmptyStatement => {
  return node.type === 'EmptyStatement';
};

export const isForStatement = (node: BaseNode): node is ForStatement => {
  return node.type === 'ForStatement';
};

export const isIdentifierStatement = (
  node: BaseNode
): node is IdentifierStatement => {
  return node.type === 'IdentifierStatement';
};

export const isArrayPattern = (node: BaseNode): node is ArrayPattern => {
  return node.type === 'ArrayPattern';
};

export const isFunctionPattern = (node: BaseNode): node is FunctionPattern => {
  return node.type === 'FunctionPattern';
};

export const isPointerPattern = (node: BaseNode): node is PointerPattern => {
  return node.type === 'PointerPattern';
};

export const isAbstractSequencePattern = (
  node: BaseNode
): node is AbstractSequencePattern => {
  return node.type === 'AbstractSequencePattern';
};

export const isExpressionBracketContent = (
  node: BaseNode
): node is ExpressionBracketContent => {
  return node.type === 'ExpressionBracketContent';
};

export const isExpressionlessBracketContent = (
  node: BaseNode
): node is ExpressionlessBracketContent => {
  return node.type === 'ExpressionlessBracketContent';
};

export const isStarBracketContent = (
  node: BaseNode
): node is StarBracketContent => {
  return node.type === 'StarBracketContent';
};

export const isBinaryOperator = (
  operator: string
): operator is BinaryOperator => {
  // Typecast is safe as it is only used to check if the operator is a binary operator.
  return BINARY_OPERATORS.includes(operator as BinaryOperator);
};
