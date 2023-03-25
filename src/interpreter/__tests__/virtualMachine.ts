import { parse } from '../../parser/parser';
import { compileProgram } from '../virtualMachine';
import { interpret } from '../evaluator';

describe('compile and run', () => {
  test('program', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary add expression', () => {
    const code = 'int main() { return 2 + 3; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary minus expression', () => {
    const code = 'int main() { return 10 - 7; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary multiplication expression', () => {
    const code = 'int main() { return 8 * 7; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 56;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary division expression', () => {
    const code = 'int main() { return 12 / 4; }';
    const ast = parse(code);
    const compilation = compileProgram(ast);
    const result = interpret(compilation);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });
});
