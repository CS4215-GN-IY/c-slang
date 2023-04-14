import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';
import { FALSE_VALUE } from '../../utils/constants';

describe('binary expression', () => {
  test('handles binary + expression', () => {
    const code = 'int main() { return 2 + 3; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary - expression', () => {
    const code = 'int main() { return 10 - 7; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary * expression', () => {
    const code = 'int main() { return 8 * 7; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 56;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary / expression', () => {
    const code = 'int main() { return 12 / 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary % expression', () => {
    const code = 'int main() { return 12 % 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 0;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary <= expression expecting false', () => {
    const code = 'int main() { return 12 <= 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary <= expression when equal expecting true', () => {
    const code = 'int main() { return 4 <= 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary <= expression when less expecting true', () => {
    const code = 'int main() { return 3 <= 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary < expression expecting false', () => {
    const code = 'int main() { return 12 < 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary < expression when equal expecting false', () => {
    const code = 'int main() { return 4 < 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary < expression when less expecting true', () => {
    const code = 'int main() { return 3 < 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary > expression expecting false', () => {
    const code = 'int main() { return 3 > 6; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary > expression when equal expecting false', () => {
    const code = 'int main() { return 4 > 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary <= expression when more expecting true', () => {
    const code = 'int main() { return 8 > 6; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary >= expression expecting false', () => {
    const code = 'int main() { return 3 >= 6; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary >= expression when equal expecting true', () => {
    const code = 'int main() { return 4 >= 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary >= expression when more expecting true', () => {
    const code = 'int main() { return 8 >= 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary & expression', () => {
    const code = 'int main() { return 5 & 15; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary | expression', () => {
    const code = 'int main() { return 5 | 15; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 15;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary ^ expression', () => {
    const code = 'int main() { return 5 ^ 15; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 10;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles binary == expression expecting true', () => {
    const code = 'int main() { return 0 == 0; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });

  test('handles binary == expression expecting false', () => {
    const code = 'int main() { return 0 == 3; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary != expression expecting false', () => {
    const code = 'int main() { return 0 != 0; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(FALSE_VALUE);
  });

  test('handles binary != expression expecting true', () => {
    const code = 'int main() { return 4 != 1; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).not.toEqual(FALSE_VALUE);
  });
});
