import * as es from 'estree'
import {CharStreams, CommonTokenStream} from "antlr4ts";
import {CLexer} from "../lang/CLexer";
import {CParser, ExpressionContext} from "../lang/CParser";
import {ExpressionGenerator} from "./ExpressionGenerator";

function convertExpression(expression: ExpressionContext): es.Expression {
  const generator = new ExpressionGenerator()
  return expression.accept(generator)
}

function convertSource(expression: ExpressionContext): es.Program {
  return {
    type: 'Program',
    sourceType: 'script',
    body: [
      {
        type: 'ExpressionStatement',
        expression: convertExpression(expression)
      }
    ]
  }
}

export function parse(source: string) {
  let program: es.Program | undefined
  const inputStream = CharStreams.fromString(source)
  const lexer = new CLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new CParser(tokenStream)
  parser.buildParseTree = true

  const tree = parser.expression()
  program = convertSource(tree)
  return program
}
