import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('function declaration', () => {
  test('handles nullary functions', () => {
    const code = `
        int f() {
            return 4215;
        }

        int main() {
            return f();
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4215;
    expect(result).toEqual(expectedResult);
  });

  test('handles unary functions', () => {
    const code = `
        int f(int x) {
            return x * 5;
        }

        int main() {
            return f(843);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4215;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary functions (& passes arguments in the correct order)', () => {
    const code = `
        int f(int x, int y) {
            return x * 5 + y;
        }

        int main() {
            return f(840, 15);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4215;
    expect(result).toEqual(expectedResult);
  });

  test('handles pointers as function arguments', () => {
    const code = `
        void swap(int *x, int *y) {
            int temp = *x;
            *x = *y;
            *y = temp;
        }

        int main() {
            int x = 1, y = 7;
            swap(&x, &y);
            return x - y;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });
});
