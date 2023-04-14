import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';
import { FALSE_VALUE } from '../../utils/constants';

describe('logical expression', () => {
  test('handles logical and expression that is true', () => {
    const code = 'int main() { return 1 && 2; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).not.toEqual(falseVal);
  });

  test('handles logical and expression whose left side is false', () => {
    const code = 'int main() { return 0 && 2; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).toEqual(falseVal);
  });

  test('handles logical and expression whose right side is false', () => {
    const code = 'int main() { return 2 && (3 - 3); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).toEqual(falseVal);
  });

  test('handles logical or expression whose left side is true', () => {
    const code = 'int main() { return 1 || 0; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).not.toEqual(falseVal);
  });

  test('handles logical or expression whose right side is true', () => {
    const code = 'int main() { return 0 || (4 - 1); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).not.toEqual(falseVal);
  });

  test('handles logical or expression that is false', () => {
    const code = 'int main() { return 0 || (3 - 3); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result.value).toEqual(falseVal);
  });
});
