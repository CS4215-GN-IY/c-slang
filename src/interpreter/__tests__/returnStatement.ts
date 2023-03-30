import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('return statement', () => {
  test('handles multiple return arguments', () => {
    const code = 'int main() { int a; int b = 5; return 1, 2, 3; }';
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles return with no argument', () => {
    const code = `
        int n = 0;
        
        int main() {
            f();
            return n;
        }
        
        int f() {
           n += 3;
           return;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles function with no return statement', () => {
    const code = `
        int n = 0;
        
        int main() {
            f();
            return n;
        }
        
        int f() {
           n += 3;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 3;
    expect(result).toEqual(expectedResult);
  });

  test('handles tail call', () => {
    const code = `
        int n = 0;
        
        int main() {
            return f();
        }
        
        int f() {
           n += 1;
           if (n > 3) {
               return n;
           }
           return f();
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4;
    expect(result).toEqual(expectedResult);
  });
});
