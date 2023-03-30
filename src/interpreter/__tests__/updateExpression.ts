import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('update expression', () => {
  test('handles postfix ++ update', () => {
    const code = `
        int main() {
            int a = 1;
            int b = a++;
            return b; 
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test('handles prefix ++ update', () => {
    const code = `
        int main() {
            int a = 1;
            int b = ++a;
            return b; 
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  test('handles postfix -- update', () => {
    const code = `
        int main() {
            int a = 5;
            int b = a--;
            return b; 
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('handles prefix -- update', () => {
    const code = `
        int main() {
            int a = 1;
            int b = --a;
            return b; 
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });
});
