import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { CLexer } from '../lang/CLexer';
import { type CompilationUnitContext, CParser } from '../lang/CParser';

/**
 * Parses C code & returns its abstract syntax tree representation.
 *
 * @param code The C code to be parsed.
 */
export const parse = (code: string): CompilationUnitContext => {
  const inputStream = CharStreams.fromString(code);
  const lexer = new CLexer(inputStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new CParser(tokens);
  return parser.compilationUnit();
};
