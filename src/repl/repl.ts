import { start } from 'repl';
import { type Context } from 'vm';
import { run } from '../runner/runner';
import { type Result } from '../interpreter/types/virtualMachine';

const startRepl = (): void => {
  start({
    eval: (
      replInput: string,
      _context: Context,
      _fileName: string,
      callback: (err: Error | null, result: any) => void
    ) => {
      void run(replInput).then((result: Result) => {
        if (result.status === 'error') {
          // TODO: Implement error handling.
          callback(new Error('An error occurred!'), undefined);
          return;
        }
        callback(null, result.value);
      });
    }
  });
};

const main = (): void => {
  startRepl();
};

main();
