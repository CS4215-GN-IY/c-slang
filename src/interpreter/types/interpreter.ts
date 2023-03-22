import { type Stack } from '../../utils/stack';
import { type Value } from './evaluationResults';
import {
  type BlockOrEmptyStatement,
  type Identifier,
  type Node
} from '../../ast/types';
import { type Instr } from './instruction';
import { type Memory } from '../../memory/memory';

export interface ExplicitControlEvaluatorState {
  agenda: Stack<AgendaItem>;
  stash: Stack<Value>;
  symbolTable: SymbolTable;
  memory: Memory;
}

export interface SymbolTable {
  head: SymbolTableFrame;
  tail: SymbolTable | null;
}

export type SymbolTableFrame = Record<string, SymbolTableFrameEntry>;

export interface SymbolTableFrameEntry {
  address: number;
  nameType: 'Function' | 'Variable';
}

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
  environment: SymbolTable;
}

export interface DeclarationName {
  name: string;
  nameType: 'Function' | 'Variable';
}

export interface DeclarationNameWithAddress extends DeclarationName {
  address: number;
}

export interface DeclarationNameWithValue extends DeclarationName {
  value: number;
}
