import { parse } from '../../parser/parser';
import { interpret } from '../explicitControlEvaluator';

describe('program', () => {
  test('main function returning a constant', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = {
      type: 'Constant',
      value: '2'
    };
    expect(result).toEqual(expectedResult);
  });
});
