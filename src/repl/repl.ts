import { start } from 'repl';
import { parse } from '../parser/parser';

const startRepl = (): void => {
  start({
    eval: (text, unusedContext, unusedFileName, callback) => {
      const tree: string = parse(text);
      callback(null, tree);
    }
  });
};

const main = (): void => {
  startRepl();
};

main();
