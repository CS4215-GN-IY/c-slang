import { parse } from '../../parser/parser';
import { compileProgram } from '../virtualMachine';
import { interpret } from '../evaluator';

describe('compile', () => {
  test('program', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });
});
