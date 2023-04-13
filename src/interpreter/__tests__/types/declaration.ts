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

  describe('UINT8', () => {
    const smallestPossibleValue = 0;
    const largestPossibleValue = 255;

    test('underflows', () => {
      const code = `
          unsigned char main() {
              unsigned char x = ${smallestPossibleValue - 1};
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
          unsigned char main() {
              unsigned char x = ${largestPossibleValue + 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(smallestPossibleValue);
    });
  });

  describe('INT16', () => {
    const smallestPossibleValue = -32768;
    const largestPossibleValue = 32767;

    test('underflows', () => {
      const code = `
          short main() {
              short x = ${smallestPossibleValue - 1};
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
          short main() {
              short x = ${largestPossibleValue + 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(smallestPossibleValue);
    });
  });

  describe('UINT16', () => {
    const smallestPossibleValue = 0;
    const largestPossibleValue = 65535;

    test('underflows', () => {
      const code = `
          unsigned short main() {
              unsigned short x = ${smallestPossibleValue - 1};
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
          unsigned short main() {
              unsigned short x = ${largestPossibleValue + 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(smallestPossibleValue);
    });
  });

  describe('INT32', () => {
    const smallestPossibleValue = -2147483648;
    const largestPossibleValue = 2147483647;

    test('underflows', () => {
      const code = `
          int main() {
              int x = ${smallestPossibleValue - 1};
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
          int main() {
              int x = ${largestPossibleValue + 1};
              return x;
          }
      `;
      const ast = parse(code);
      const instructions = compileProgram(ast);
      const result = interpret(instructions);
      expect(result).toEqual(smallestPossibleValue);
    });
  });

  describe('UINT32', () => {
    const smallestPossibleValue = 0;
    const largestPossibleValue = 4294967295;

    test('underflows', () => {
      const code = `
          unsigned int main() {
              unsigned int x = ${smallestPossibleValue - 1};
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
          unsigned int main() {
              unsigned int x = ${largestPossibleValue + 1};
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
