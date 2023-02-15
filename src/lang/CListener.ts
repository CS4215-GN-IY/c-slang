// Generated from ./src/lang/C.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `CParser`.
 */
export interface CListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `Number`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by the `Number`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by the `Parentheses`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Exit a parse tree produced by the `Parentheses`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParentheses?: (ctx: ParenthesesContext) => void;

	/**
	 * Enter a parse tree produced by the `Power`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPower?: (ctx: PowerContext) => void;
	/**
	 * Exit a parse tree produced by the `Power`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPower?: (ctx: PowerContext) => void;

	/**
	 * Enter a parse tree produced by the `Multiplication`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplication?: (ctx: MultiplicationContext) => void;
	/**
	 * Exit a parse tree produced by the `Multiplication`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplication?: (ctx: MultiplicationContext) => void;

	/**
	 * Enter a parse tree produced by the `Division`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDivision?: (ctx: DivisionContext) => void;
	/**
	 * Exit a parse tree produced by the `Division`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDivision?: (ctx: DivisionContext) => void;

	/**
	 * Enter a parse tree produced by the `Addition`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddition?: (ctx: AdditionContext) => void;
	/**
	 * Exit a parse tree produced by the `Addition`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddition?: (ctx: AdditionContext) => void;

	/**
	 * Enter a parse tree produced by the `Subtraction`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSubtraction?: (ctx: SubtractionContext) => void;
	/**
	 * Exit a parse tree produced by the `Subtraction`
	 * labeled alternative in `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSubtraction?: (ctx: SubtractionContext) => void;

	/**
	 * Enter a parse tree produced by `CParser.start`.
	 * @param ctx the parse tree
	 */
	enterStart?: (ctx: StartContext) => void;
	/**
	 * Exit a parse tree produced by `CParser.start`.
	 * @param ctx the parse tree
	 */
	exitStart?: (ctx: StartContext) => void;

	/**
	 * Enter a parse tree produced by `CParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `CParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
}

