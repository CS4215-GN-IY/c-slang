import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { CLexer } from '../lang/CLexer';
import { CParser } from '../lang/CParser';
import { ASTBuilder } from '../ast/astBuilder';
import { type Program } from '../ast/types';

/**
 * Parses C code & returns its abstract syntax tree representation.
 *
 * @param code The C code to be parsed.
 */
export const parse = (code: string): Program => {
  const inputStream = CharStreams.fromString(code);
  const lexer = new CLexer(inputStream);
  const tokens = new CommonTokenStream(lexer);
  const parser = new CParser(tokens);
  const astBuilder = new ASTBuilder();
  const cst = parser.compilationUnit();
  return astBuilder.visitCompilationUnit(cst);
};
