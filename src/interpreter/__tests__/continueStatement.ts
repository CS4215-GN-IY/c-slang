import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('continue statement', () => {
  test('in while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 2) {
                i += 1;
                continue;
                i += 5;
            }
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('in block in while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 5) {
                i += 1;
                if (i % 2 == 0) {
                    continue;
                }
                i += 1;
            }
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test('in do while loop', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
                continue;
                i += 5;
            } while (i < 3);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('in block in do while loop', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
                if (i % 2 == 0) {
                    continue;
                }
                i += 3;
            } while (i < 3);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4;
    expect(result).toEqual(expectedResult);
  });

  test('in for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; i < 3; i++) {
                a += 1;
                continue;
                a += 2;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('in block in for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; i < 3; i++) {
                a += 1;
                if (i % 2 == 0) {
                    continue;
                }
                a += 2;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });
});
