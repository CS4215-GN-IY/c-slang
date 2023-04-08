import { parse } from '../parser/parser';
import { type Value } from '../interpreter/types/virtualMachine';
import { compileProgram } from '../interpreter/compiler';
import { interpret } from '../interpreter/virtualMachine';

/**
 * Runs the C code asynchronously & returns the result of evaluation.
 *
 * @param code The C code to be run.
 */
export const run = async (code: string): Promise<Value> => {
  return await new Promise(
    (resolve: (value: Value) => void, reject: (reason?: any) => void) => {
      try {
        const ast = parse(code);
        const instructions = compileProgram(ast);
        const value = interpret(instructions);
        resolve(value);
      } catch (err) {
        reject(err);
      }
    }
  );
};
