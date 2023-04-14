import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('switch statement', () => {
  test('with return', () => {
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
    expect(result.value).toEqual(expectedResult);
  });

  test('with fallthrough part of the way', () => {
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
    expect(result.value).toEqual(expectedResult);
  });

  test('with fallthrough all the way', () => {
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
    expect(result.value).toEqual(expectedResult);
  });

  test('with fallthrough to default', () => {
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
    expect(result.value).toEqual(expectedResult);
  });

  test('with no match till default', () => {
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
    expect(result.value).toEqual(expectedResult);
  });
});
