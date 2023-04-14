import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('break statement', () => {
  test('handles break statement in while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 2) {
                i += 1;
                break;
            }
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in block in while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 5) {
                i += 1;
                if (i % 2 == 0) {
                    break;
                }
            }
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in do while loop', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
                break;
            } while (i < 3);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in block in do while loop', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
                if (i % 2 == 0) {
                    break;
                }
            } while (i < 3);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 1; i < 3; i++) {
                a += 1;
                break;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in block in for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 1; i < 3; i++) {
                a += 1;
                if (i % 2 == 0) {
                    break;
                }
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles break statement in switch statement', () => {
    const code = `
        int main() {
            int i = 2;
            int a = 0;
            switch(i) {
                case 1:
                    a += 3;
                case 2:
                case 3:
                    a += 2;
                case 4:
                    break;
                case 5:
                    a += 6;
                default:
                    a += 1;
                    return a;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result.value).toEqual(expectedResult);
  });
});
