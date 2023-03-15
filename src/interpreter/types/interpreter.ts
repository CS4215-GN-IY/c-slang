import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import {
  type BlockOrEmptyStatement,
  type Identifier,
  type Node
} from '../../ast/types';
import { type Environment } from '../environment';
import { type VirtualMemory } from '../../memory/virtualMemory';
import { type Instr } from './instruction';
import { type TextMemory } from '../../memory/textMemory';

export interface ExplicitControlEvaluatorState {
  agenda: Stack<AgendaItem>;
  stash: Stack<Value>;
  environment: Environment;
  memory: VirtualMemory;
  textMemory: TextMemory;
}

export type EnvironmentFrame = Record<string, number>;

export type AgendaItem = Node | Instr;

export type AgendaItemEvaluatorMapping = {
  [AgendaItemType in AgendaItem['type']]: (
    command: Extract<AgendaItem, { type: AgendaItemType }>,
    state: ExplicitControlEvaluatorState
  ) => void;
};

export interface Closure {
  params: Identifier[];
  body: BlockOrEmptyStatement;
  environment: Environment;
}
