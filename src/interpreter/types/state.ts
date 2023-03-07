import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import { type BaseNode } from '../../ast/types';

export interface ExplicitControlEvaluatorState {
  agenda: Stack<BaseNode>;
  stash: Stack<Value>;
  // TODO: Add some notion of an environment.
}
