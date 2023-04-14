import { start } from 'repl';
import { type Context } from 'vm';
import { run } from '../runner/runner';
import {
  type Value,
  type ValueWithDebugOutput
} from '../interpreter/types/virtualMachine';

const startRepl = (): void => {
  start({
    eval: (
      replInput: string,
      _context: Context,
      _fileName: string,
      callback: (err: Error | null, result: Value) => void
    ) => {
      void run(replInput)
        .then((result: ValueWithDebugOutput) => {
          callback(null, result.value);
        })
        .catch((err) => {
          callback(err.message, undefined);
        });
    }
  });
};

const main = (): void => {
  startRepl();
};

main();
