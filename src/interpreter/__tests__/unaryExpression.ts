import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';
import { FALSE_VALUE } from '../../utils/constants';

describe('unary expression', () => {
  test('handles unary - operation', () => {
    const code = `
        int main() {
            int a = -2;
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = -2;
    expect(result).toEqual(expectedResult);
  });

  test('handles unary + operation', () => {
    const code = `
        int main() {
            int a = +2;
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('handles unary ~ operation', () => {
    const code = `
        int main() {
            int a = ~5;
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = -6;
    expect(result).toEqual(expectedResult);
  });

  test('handles unary ! operation when operand is true', () => {
    const code = `
        int main() {
            int a = 10;
            return !a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result).toEqual(FALSE_VALUE);
  });

  test('handles unary ! operation when operand is false', () => {
    const code = `
        int main() {
            int a = 0;
            return !a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result).not.toEqual(FALSE_VALUE);
  });
});
