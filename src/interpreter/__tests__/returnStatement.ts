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
    expect(result.value).toEqual(expectedResult);
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
    expect(result.value).toEqual(expectedResult);
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
    expect(result.value).toEqual(expectedResult);
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
    expect(result.value).toEqual(expectedResult);
  });

  test('handles recursion', () => {
    const code = `  
        int fact(int n) {
           if (n <= 1) {
               return 1;
           }
           return n * fact(n - 1);
        }  
  
        int main() {
            return fact(4);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 24;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles several function calls', () => {
    const code = `  
        int add(int n, int m) {
            return n + m;
        }
        
        int fact(int n) {
           if (n <= 1) {
               return 1;
           }
           return n * fact(n - 1);
        }  
  
        int main() {
            int num = add(3, 2);
            return fact(num);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 120;
    expect(result.value).toEqual(expectedResult);
  });
});
