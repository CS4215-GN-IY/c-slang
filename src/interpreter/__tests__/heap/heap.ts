import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

describe('heap', () => {
  test('handles malloc (dynamically allocated memory persists past frame teardown)', () => {
    const code = `
        int* f() {
            int *p = malloc(32);
            *p = 4215;
            return p;
        }

        int main() {
            int *p = f();
            return *p;
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 4215;
    expect(result.value).toEqual(expectedResult);
  });

  test('handles free', () => {
    const code = `
        int* f() {
            int *p = malloc(32);
            *p = 4215;
            return p;
        }

        int main() {
            int *p = f();
            free(p);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = undefined;
    expect(result.value).toEqual(expectedResult);
  });

  test('throws error when trying to free non-heap memory', () => {
    const code = `
        int main() {
            int loc = 123;
            int *p = &loc;
            free(p);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    expect(() => interpret(instructions)).toThrow(
      'Invalid pointer: Unable to free non-heap region of memory.'
    );
  });
});
