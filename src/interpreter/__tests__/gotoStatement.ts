import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('goto statement', () => {
  test('goes to identifier statement', () => {
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
    expect(result.value).toEqual(expectedResult);
  });

  test('executes identifier statement that it passes even without goto', () => {
    const code = `
        int main() {
            int a = 0;
            
            ho:
                a += 1;
            
            int i = 0;
            
            hi:
                a += 1;
                i += 1;
                if (i > 2) {
                    return a;
                }
            goto hi;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4;
    expect(result.value).toEqual(expectedResult);
  });

  test('can have same name as variable', () => {
    const code = `
        int main() {
            int a = 0;
            
            i:
                a += 1;
            
            int i = 0;
            
            hi:
                a += 1;
                i += 1;
                if (i > 2) {
                    return a;
                }
            goto hi;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4;
    expect(result.value).toEqual(expectedResult);
  });
});
