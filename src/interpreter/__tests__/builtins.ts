import { parse } from '../../parser/parser';
import { compileProgram } from '../compiler';
import { interpret } from '../virtualMachine';

describe('built-ins', () => {
  test('handles built-in functions', () => {
    const code = `
        int main() {
            return sqrt(25);
        }
    `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test('does not allow redeclaring of built-in functions', () => {
    const code = `
        double sqrt(double x) {
            return x;
        }

        int main() {
            return sqrt(25);
        }
    `;
    const ast = parse(code);
    expect(() => compileProgram(ast)).toThrow(
      `Tried to redeclare name 'sqrt'`
    );
  });
});
