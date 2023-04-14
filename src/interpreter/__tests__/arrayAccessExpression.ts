import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('array access expression', () => {
  test('accesses and assigns to one dimensional array', () => {
    const code = `
        int main() { 
            int arr[2];
            arr[0] = 3;
            return arr[0];
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result.value).toEqual(expectedResult);
  });

  test('accesses and assigns to two dimensional array', () => {
    const code = `
        int main() { 
            int arr[2][3];
            arr[0][2] = 5;
            return arr[0][2];
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result.value).toEqual(expectedResult);
  });

  test('accesses and assigns to two dimensional array in several places', () => {
    const code = `
        int main() { 
            int arr[2][3];
            arr[0][2] = 5;
            arr[1][1] = 4;
            arr[0][2] += arr[1][1];
            return arr[0][2];
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 9;
    expect(result.value).toEqual(expectedResult);
  });
});
