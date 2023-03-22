import { parse } from '../../parser/parser';
import { interpret } from '../explicitControlEvaluator';

describe('program', () => {
  test('main function returning a constant', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('main function has an expression', () => {
    const code = 'int main() { return 2 + 3; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });
});
