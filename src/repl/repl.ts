import { start } from 'repl';
import { type Context } from 'vm';
import { run } from '../runner/runner';
import { type Value } from '../interpreter/types/virtualMachine';

const startRepl = (): void => {
  start({
    eval: (
      replInput: string,
      _context: Context,
      _fileName: string,
      callback: (err: Error | null, result: Value) => void
    ) => {
      void run(replInput)
        .then((result: Value) => {
          callback(null, result);
        })
        .catch((err) => {
          callback(err, undefined);
        });
    }
  });
};

const main = (): void => {
  startRepl();
};

main();
