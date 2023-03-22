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

  test('handles binary add expression', () => {
    const code = 'int main() { return 2 + 3; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary minus expression', () => {
    const code = 'int main() { return 10 - 7; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary multiplication expression', () => {
    const code = 'int main() { return 8 * 7; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 56;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary division expression', () => {
    const code = 'int main() { return 12 / 4; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles logical and expression that is true', () => {
    const code = 'int main() { return 1 && 2; }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical and expression whose left side is false', () => {
    const code = 'int main() { return 0 && 2; }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).toEqual(falseVal);
  });

  test('handles logical and expression whose right side is false', () => {
    const code = 'int main() { return 2 && (3 - 3); }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).toEqual(falseVal);
  });

  test('handles logical or expression whose left side is true', () => {
    const code = 'int main() { return 1 || 0; }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical or expression whose right side is true', () => {
    const code = 'int main() { return 0 || (4 - 1); }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical or expression that is false', () => {
    const code = 'int main() { return 0 || (3 - 3); }';
    const ast = parse(code);
    const result = interpret(ast);
    const falseVal = 0;
    expect(result).toEqual(falseVal);
  });

  test('handles variable declarations and identifiers', () => {
    const code = 'int main() { int a; int b = 5; return b; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles function declarations and identifiers', () => {
    const code = 'int main() { int a; int b = 5; return b; }';
    const ast = parse(code);
    const result = interpret(ast);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });
});
