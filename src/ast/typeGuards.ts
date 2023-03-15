import {
  type BaseReturnValue,
  type TypedefNameReturnValue
} from './astBuilderInternalTypes';
import {
  type BaseNode,
  type Constant,
  type EmptyStatement,
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
