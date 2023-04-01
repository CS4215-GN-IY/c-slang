import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('variable declaration', () => {
  test('handles variable declarations and identifiers', () => {
    const code = 'int main() { int a; int b = 5; return b; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles array variable declaration', () => {
    const code = 'int main() { int arr[5]; int b = 5; return b; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles array variable declaration with initializer list', () => {
    const code = 'int main() { int arr[5] = {1, 2, 3}; return 5; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles array variable declaration with initializer list get first item.', () => {
    const code = 'int main() { int arr[5] = {1, 2, 3}; return arr[0]; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test('handles array variable declaration with initializer list get second item.', () => {
    const code = 'int main() { int arr[5] = {1, 2, 3}; return arr[1]; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('handles array variable declaration with initializer list get third item.', () => {
    const code = 'int main() { int arr[5] = {1, 2, 3}; return arr[2]; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });
});
