import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

describe('function return type', () => {
  test('casts to function return type if return value is an integer symbol', () => {
    const code = `
          char main() {
              unsigned char x = 230;
              return x;
          }
      `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(-26);
  });

  test('casts to function return type if return value is a constant', () => {
    const code = `
          char main() {
              return 230;
          }
      `;
    const ast = parse(code);
    const instructions = compileProgram(ast);
    const result = interpret(instructions);
    expect(result.value).toEqual(-26);
  });
});
