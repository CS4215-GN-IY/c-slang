import { type TerminalNode } from 'antlr4ts/tree';
import {
  type CallExpression,
  type Constant,
  type EmptyStatement,
  type Identifier,
  type StringLiteral
} from './types';

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

export const constructFalseConstant = (): Constant => {
  return {
    type: 'Constant',
    value: 0
  };
};

export const constructTrueConstant = (): Constant => {
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
