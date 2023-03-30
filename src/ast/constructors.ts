import { type TerminalNode } from 'antlr4ts/tree';
import {
  type AssignmentExpression,
  type AssignmentOperator,
  type BinaryExpression,
  type BinaryOperator,
  type CallExpression,
  type ConditionalExpression,
  type Constant,
  type EmptyStatement,
  type Expression,
  type Identifier,
  type BracketExpressionlessContent,
  type BracketExpressionContent,
  type BracketStarContent,
  type StringLiteral,
  type DeclaratorPattern,
  type AbstractDeclaratorPattern,
  type ParameterDeclaration
} from './types';
import { ARBITRARY_TRUE_VALUE, FALSE_VALUE } from '../utils/constants';

export const constructAssignmentExpression = (
  operator: AssignmentOperator,
  left: Expression,
  right: Expression
): AssignmentExpression => {
  return {
    type: 'AssignmentExpression',
    operator,
    left,
    right
  };
};

export const constructConstant = (constant: TerminalNode): Constant => {
  const constantLiteral = constant.toString().trim();
  const value =
    constantLiteral === ''
      ? constantLiteral
      : !isNaN(Number(constantLiteral))
      ? Number(constantLiteral)
      : constantLiteral;

  return {
    type: 'Constant',
    value
  };
};

export const constructBinaryExpression = (
  operator: BinaryOperator,
  left: Expression,
  right: Expression
): BinaryExpression => {
  return {
    type: 'BinaryExpression',
    operator,
    left,
    right
  };
};

export const constructConditionalExpression = (
  predicate: Expression,
  consequent: Expression,
  alternate: Expression
): ConditionalExpression => {
  return {
    type: 'ConditionalExpression',
    predicate,
    consequent,
    alternate
  };
};

export const constructFalseConstant = (): Constant => {
  return {
    type: 'Constant',
    value: FALSE_VALUE
  };
};

export const constructTrueConstant = (): Constant => {
  return {
    type: 'Constant',
    value: ARBITRARY_TRUE_VALUE
  };
};

export const constructOneConstant = (): Constant => {
  return {
    type: 'Constant',
    value: 1
  };
};

export const constructEmptyStatement = (): EmptyStatement => {
  return {
    type: 'EmptyStatement'
  };
};

export const constructIdentifier = (identifier: TerminalNode): Identifier => {
  return {
    type: 'Identifier',
    name: identifier.toString()
  };
};

export const constructStringLiteral = (
  stringLiteral: TerminalNode
): StringLiteral => {
  return {
    type: 'StringLiteral',
    value: stringLiteral.toString()
  };
};

// TODO: Add support for command line arguments in the future
export const constructMainCallExpression = (): CallExpression => {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: 'main'
    },
    arguments: []
  };
};

export const constructBracketExpressionlessContent =
  (): BracketExpressionlessContent => ({
    type: 'BracketExpressionlessContent'
  });

export const constructBracketExpressionContent = (
  expression: Expression,
  hasStaticBeforeTypes: boolean,
  hasStaticAfterTypes: boolean
): BracketExpressionContent => ({
  type: 'BracketExpressionContent',
  expression,
  hasStaticBeforeTypes,
  hasStaticAfterTypes
});

export const constructBracketStarContent = (): BracketStarContent => ({
  type: 'BracketStarContent'
});

export const constructParameterDeclaration = (
  declarator: DeclaratorPattern | AbstractDeclaratorPattern
): ParameterDeclaration => ({
  type: 'ParameterDeclaration',
  declarator
});
