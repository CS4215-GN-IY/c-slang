import { type TerminalNode } from 'antlr4ts/tree';
import { type EmptyStatement, type Identifier } from './types';

export const constructIdentifier = (identifier: TerminalNode): Identifier => {
  return {
    type: 'Identifier',
    name: identifier.toString()
  };
};

export const constructEmptyStatement = (): EmptyStatement => {
  return {
    type: 'EmptyStatement'
  };
};
