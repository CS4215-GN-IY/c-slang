import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

describe('declaration', () => {
  describe('INT8', () => {
    const smallestPossibleValue = 0;
    // const largestPossibleValue = 255;

    test('', () => {
      const code = `char main() { char x = ${
        smallestPossibleValue - 1
      }; return x; }`;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      const expectedResult = -1;
      expect(result).toEqual(expectedResult);
    });
  });
});
