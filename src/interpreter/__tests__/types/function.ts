import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

describe('function return type', () => {
  test('casts to function return type', () => {
    const code = `
          char main() {
              unsigned char x = 230;
              return x;
          }
      `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result).toEqual(-26);
  });
});
