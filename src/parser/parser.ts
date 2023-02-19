import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { CLexer } from '../lang/CLexer';
import { CParser } from '../lang/CParser';

export const parse = (text: string): string => {
  const inputStream = CharStreams.fromString(text);
  const lexer = new CLexer(inputStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new CParser(tokens);
  const tree = parser.compilationUnit();
  return tree.toStringTree(parser);
};
