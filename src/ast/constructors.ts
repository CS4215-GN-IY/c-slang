import { type TerminalNode } from 'antlr4ts/tree';
import {
  type CallExpression,
  type Constant,
  type EmptyStatement,
  type Identifier,
  type StringLiteral
} from './types';

export const constructConstant = (constant: TerminalNode): Constant => {
  return {
    type: 'Constant',
    value: constant.toString()
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
    id: {
      type: 'Identifier',
      name: 'main'
    },
    arguments: []
  };
};
