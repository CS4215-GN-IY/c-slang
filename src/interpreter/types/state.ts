import { type Stack } from '../../utils/stack';
import { type ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { type Value } from './evaluationResults';

export interface ExplicitControlEvaluatorState {
  agenda: Stack<ParserRuleContext>;
  stash: Stack<Value>;
  // TODO: Add some notion of an environment.
}
