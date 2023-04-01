import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('array access expression', () => {
  test('accesses one dimensional array', () => {
    const code = `
        int main() { 
            int arr[2];
            return arr[0];
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });

  test('accesses two dimensional array', () => {
    const code = `
        int main() { 
            int arr[2][3];
            return arr[0][2];
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });
});
