import { parse } from '../../../parser/parser';
import { compileProgram } from '../../compiler';
import { interpret } from '../../virtualMachine';

test('dump memory', () => {
  const code = `
        int* f() {
            int *p = malloc(32);
            *p = 4215;
            __dump_memory__();
            return p;
        }

        int main() {
            __dump_memory__();
            int *p = f();
            __dump_memory__();
            return *p;
        }
    `;
  const ast = parse(code);
  const instructions = compileProgram(ast);
  const result = interpret(instructions);
  expect(result.debugOutput.length).toEqual(3);
});
