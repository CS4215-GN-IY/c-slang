import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('if statement', () => {
  test('handles if statement when predicate is true', () => {
    const code = `
        int main() {
            int x = 2;
            if (x > 1) {
                return 100;
            } else {
                return 5;
            }
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 100;
    expect(result).toEqual(expectedResult);
  });

  test('handles if statement when predicate is false', () => {
    const code = `
        int main() {
            int x = 0;
            if (x > 1) {
                return 100;
            } else {
                int x = 2;
                return x + 3;
            }
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles if statement without alternate when predicate is true', () => {
    const code = `
        int main() {
            int x = 3;
            if (x > 1) {
                return 100;
            }
            return x + 3;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 100;
    expect(result).toEqual(expectedResult);
  });

  test('handles if statement without alternate when predicate is false', () => {
    const code = `
        int main() {
            int x = 0;
            if (x > 1) {
                return 100;
            }
            return x + 2;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });
});
