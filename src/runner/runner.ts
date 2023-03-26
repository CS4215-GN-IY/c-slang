import { parse } from '../parser/parser';
import { evaluate } from '../interpreter/virtualMachine';
import { type Result } from '../interpreter/types/virtualMachine';

/**
 * Runs the C code asynchronously & returns the result of evaluation.
 *
 * @param code The C code to be run.
 */
export const run = async (code: string): Promise<Result> => {
  const ast = parse(code);
  return await evaluate(ast);
};
