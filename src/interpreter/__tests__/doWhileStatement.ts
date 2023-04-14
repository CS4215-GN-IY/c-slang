import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('do while statement', () => {
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
    expect(result.value).toEqual(expectedResult);
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
    expect(result.value).toEqual(expectedResult);
  });
});
