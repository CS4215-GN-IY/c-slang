import { parse } from '../../parser/parser';
import { interpret } from '../explicitControlEvaluator';

describe('program', () => {
  test('function declaration', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    interpret(ast);
    // TODO: Finish writing test properly
  });
});
