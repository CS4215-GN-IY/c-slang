import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('expression statement', () => {
  test('clears stash', () => {
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
});
