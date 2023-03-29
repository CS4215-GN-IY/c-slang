import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';
import { FALSE_VALUE } from '../../utils/constants';

describe('compile and run', () => {
  test('program', () => {
    const code = 'int main() { return 2; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary add expression', () => {
    const code = 'int main() { return 2 + 3; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary minus expression', () => {
    const code = 'int main() { return 10 - 7; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary multiplication expression', () => {
    const code = 'int main() { return 8 * 7; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 56;
    expect(result).toEqual(expectedResult);
  });

  test('handles binary division expression', () => {
    const code = 'int main() { return 12 / 4; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles logical and expression that is true', () => {
    const code = 'int main() { return 1 && 2; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical and expression whose left side is false', () => {
    const code = 'int main() { return 0 && 2; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).toEqual(falseVal);
  });

  test('handles logical and expression whose right side is false', () => {
    const code = 'int main() { return 2 && (3 - 3); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).toEqual(falseVal);
  });

  test('handles logical or expression whose left side is true', () => {
    const code = 'int main() { return 1 || 0; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical or expression whose right side is true', () => {
    const code = 'int main() { return 0 || (4 - 1); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).not.toEqual(falseVal);
  });

  test('handles logical or expression that is false', () => {
    const code = 'int main() { return 0 || (3 - 3); }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const falseVal = FALSE_VALUE;
    expect(result).toEqual(falseVal);
  });

  test('handles variable declarations and identifiers', () => {
    const code = 'int main() { int a; int b = 5; return b; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles multiple return arguments', () => {
    const code = 'int main() { int a; int b = 5; return 1, 2, 3; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 2) {
                i += 1;
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

  test('handles do while loop when condition is false from the start', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
            } while (i < 0);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test('handles do while loop when condition is true at the start', () => {
    const code = `
        int main() {
            int i = 0;
            do {
                i += 1;
            } while (i < 1);
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test('handles return in while loop', () => {
    const code = `
        int main() {
            int i = 0;
            while (i < 2) {
                i += 1;
                return i;
            }
            return i;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test('handles for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; i < 2; i++) {
                a += 3;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test('handles return in for loop', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; i < 2; i++) {
                a += 3;
                return a;
            }
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles for loop without init declaration', () => {
    const code = `
        int main() {
            int a = 0;
            int i = 0;
            for (i = 1; i < 2; i++) {
                a += 3;
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

  test('handles for loop without init', () => {
    const code = `
        int main() {
            int a = 0;
            int i = 0;
            for (; i < 2; i++) {
                a += 3;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test('handles for loop without condition', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; ; i++) {
                a += 3;
                break;
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

  test('handles for loop without update', () => {
    const code = `
        int main() {
            int a = 0;
            for (int i = 0; i < 2;) {
                a += 3;
                i += 1;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

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

  test('handles switch statement with return', () => {
    const code = `
        int main() {
            int i = 5;
            switch(i) {
                case 1:
                    i += 2;
                case 2:
                case 3:
                    return 2;
                case 4:
                case 5:
                    return 6;
                default:
                    return 8;
            }
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test('handles switch statement with fallthrough part of the way', () => {
    const code = `
        int main() {
            int i = 1;
            int a = 0;
            switch(i) {
                case 1:
                    a += 3;
                case 2:
                case 3:
                    return a + 4;
                case 4:
                case 5:
                    return 6;
                default:
                    return 8;
            }
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 7;
    expect(result).toEqual(expectedResult);
  });

  test('handles switch statement with fallthrough all the way', () => {
    const code = `
        int main() {
            int i = 4;
            int a = 0;
            switch(i) {
                case 1:
                    a += 3;
                case 2:
                case 3:
                    return a + 4;
                case 4:
                case 5:
                    a += 6;
            }
            return a;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 6;
    expect(result).toEqual(expectedResult);
  });

  test('handles switch statement with fallthrough to default', () => {
    const code = `
        int main() {
            int i = 3;
            int a = 0;
            switch(i) {
                case 1:
                    a += 3;
                case 2:
                case 3:
                    a += 2;
                case 4:
                case 5:
                    a += 6;
                default:
                    a += 1;
                    return a;
            }
            return 2;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 9;
    expect(result).toEqual(expectedResult);
  });

  test('handles switch statement with no match till default', () => {
    const code = `
        int main() {
            int i = 8;
            int a = 0;
            switch(i) {
                case 1:
                    a += 3;
                case 2:
                case 3:
                    a += 2;
                case 4:
                case 5:
                    a += 6;
                default:
                    a += 1;
                    return a;
            }
            return 2;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
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
    expect(result).toEqual(expectedResult);
  });

  test('handles continue statement in while loop', () => {
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

  test('handles continue statement in block in while loop', () => {
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

  test('handles continue statement in do while loop', () => {
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

  test('handles continue statement in block in do while loop', () => {
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

  test('handles continue statement in for loop', () => {
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

  test('handles continue statement in block in for loop', () => {
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

  test('handles expression statement', () => {
    const code = `
        int main() {
            1 + 2;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = undefined;
    expect(result).toEqual(expectedResult);
  });

  test('handles goto statement', () => {
    const code = `
        int main() {
            int i = 0;
            hi:
                i += 1;
                if (i > 2) {
                    return i;
                }
            goto hi;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });
});
