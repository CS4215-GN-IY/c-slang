import { type Result, type Value } from './types/evaluationResults';
import { type CompilationUnitContext } from '../lang/CParser';
import { Stack } from '../utils/stack';
import { type ExplicitControlEvaluatorState } from './types/state';
import { type ParserRuleContext } from 'antlr4ts/ParserRuleContext';

/**
 * Evaluates the abstract syntax tree using an explicit-control evaluator &
 * returns the result of evaluation asynchronously.
 *
 * @param ast The abstract syntax tree to evaluate.
 */
export const evaluate = async (
  ast: CompilationUnitContext
): Promise<Result> => {
  return await new Promise(
    (
      resolve: (value: Result | PromiseLike<Result>) => void,
      _reject: (reason?: any) => void
    ) => {
      try {
        const value = interpret(ast);
        resolve({ status: 'finished', value });
      } catch (err) {
        resolve({ status: 'error' });
      }
    }
  );
};

/**
 * Interprets the abstract syntax tree using an explicit-control evaluator &
 * returns the result of evaluation.
 *
 * @param ast The abstract syntax tree to evaluate.
 */
export const interpret = (ast: CompilationUnitContext): Value => {
  const agenda = new Stack<ParserRuleContext>();
  agenda.push(ast);
  const stash = new Stack<Value>();
  const state: ExplicitControlEvaluatorState = {
    agenda,
    stash
  };

  while (agenda.size() > 0) {
    const command = agenda.pop();
    // TODO: Implement the rest of the explicit-control evaluator.
    console.log(state);
    console.log(command);
  }

  return undefined;
};
