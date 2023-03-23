import { parse } from '../../parser/parser';
import { compileProgram } from '../virtualMachine';

describe('compile', () => {
  test('program', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    compileProgram(ast);
  });
});
