import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

describe('declaration', () => {
  describe('INT8', () => {
    const smallestPossibleValue = -128;
    const largestPossibleValue = 127;

    test('underflows', () => {
      const code = `
          char main() {
              char x = ${smallestPossibleValue - 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(largestPossibleValue);
    });

    test('overflows', () => {
      const code = `
          char main() {
              char x = ${largestPossibleValue + 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(smallestPossibleValue);
    });
  });
});
