import { type TerminalNode } from 'antlr4ts/tree';
import { type Identifier } from './types';

export const constructIdentifier = (identifier: TerminalNode): Identifier => {
  return {
    type: 'Identifier',
    name: identifier.toString()
  };
};
