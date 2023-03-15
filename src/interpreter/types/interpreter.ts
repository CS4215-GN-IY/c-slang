import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import {Node} from '../../ast/types';
import {Environment} from "../environment";
import {VirtualMemory} from "../../memory/virtualMemory";

export interface ExplicitControlEvaluatorState {
  agenda: Stack<AgendaItem>;
  stash: Stack<Value>;
  environment: Environment;
  memory: VirtualMemory;
}

export type EnvironmentFrame = { [key: string]: number };

export type AgendaItem = Node;

export interface Instr {
  instrType: string;
}

export type CommandEvaluator = (
  command: AgendaItem,
  state: ExplicitControlEvaluatorState
) => void
