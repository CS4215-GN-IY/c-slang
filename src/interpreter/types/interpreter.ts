import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import { type Node } from '../../ast/types';
import { type Environment } from '../environment';
import { type VirtualMemory } from '../../memory/virtualMemory';

export interface ExplicitControlEvaluatorState {
  agenda: Stack<AgendaItem>;
  stash: Stack<Value>;
  environment: Environment;
  memory: VirtualMemory;
}

export type EnvironmentFrame = Record<string, number>;

export type AgendaItem = Node;

export type AgendaItemEvaluatorMapping = {
  [AgendaItemType in AgendaItem['type']]: (
    command: Extract<AgendaItem, { type: AgendaItemType }>,
    state: ExplicitControlEvaluatorState
  ) => void;
};
