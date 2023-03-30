import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('loop statement', () => {
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
});
