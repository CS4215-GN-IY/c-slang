// Generated from ./src/lang/C.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { NumberContext } from "./CParser";
import { ParenthesesContext } from "./CParser";
import { PowerContext } from "./CParser";
import { MultiplicationContext } from "./CParser";
import { DivisionContext } from "./CParser";
import { AdditionContext } from "./CParser";
import { SubtractionContext } from "./CParser";
import { StartContext } from "./CParser";
import { ExpressionContext } from "./CParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface CVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `Number`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheses?: (ctx: ParenthesesContext) => Result;

	/**
	 * Visit a parse tree produced by the `Power`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPower?: (ctx: PowerContext) => Result;

	/**
	 * Visit a parse tree produced by the `Multiplication`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplication?: (ctx: MultiplicationContext) => Result;

	/**
	 * Visit a parse tree produced by the `Division`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDivision?: (ctx: DivisionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Addition`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddition?: (ctx: AdditionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Subtraction`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtraction?: (ctx: SubtractionContext) => Result;

	/**
	 * Visit a parse tree produced by `CParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;

	/**
	 * Visit a parse tree produced by `CParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
}

