import { type BlockStatement, type FunctionDeclaration } from '../ast/types';
import { type LabelEntry, type LabelFrame } from './types/symbolTable';
import { isEmptyStatement, isIdentifierStatement } from '../ast/typeGuards';
import { RedeclaredNameError, UndeclaredNameError } from './errors';
import { PLACEHOLDER_ADDRESS } from './instructions';

export const constructFunctionLabelFrame = (
  node: FunctionDeclaration
): LabelFrame => {
  const frame: LabelFrame = {};
  if (isEmptyStatement(node.body)) {
    return frame;
  }
  node.body.items.forEach((item) => {
    if (isIdentifierStatement(item)) {
      const entry: LabelEntry = {
        name: item.label.name,
        instrAddress: PLACEHOLDER_ADDRESS
      };
      addToFrame(frame, entry);
    }
  });
  return frame;
};

export const addBlockLabelFrameEntries = (
  node: BlockStatement,
  frame: LabelFrame
): void => {
  node.items.forEach((item) => {
    if (isIdentifierStatement(item)) {
      const entry: LabelEntry = {
        name: item.label.name,
        instrAddress: PLACEHOLDER_ADDRESS
      };
      addToFrame(frame, entry);
    }
  });
};

export const getLabelEntry = (name: string, frame: LabelFrame): LabelEntry => {
  if (name in frame) {
    return frame[name];
  }
  throw new UndeclaredNameError(
    `Encountered an undeclared label name: ${name}`
  );
};

export const updateLabelEntryInstrAddress = (
  name: string,
  instrAddress: number,
  frame: LabelFrame
): void => {
  if (name in frame) {
    frame[name].instrAddress = instrAddress;
    return;
  }
  throw new UndeclaredNameError(
    `Encountered an undeclared label name: ${name}`
  );
};

const addToFrame = (frame: LabelFrame, ...entries: LabelEntry[]): void => {
  entries.forEach((entry) => {
    if (entry.name in frame) {
      throw new RedeclaredNameError(
        `Tried to redeclare label name ${entry.name}`
      );
    }
    frame[entry.name] = entry;
  });
};
