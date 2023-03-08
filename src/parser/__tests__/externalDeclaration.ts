import { parse } from '../parser';
import { type Program } from '../../ast/types';

describe('externalDeclaration', () => {
  it('ignores empty statements', () => {
    const code = ';;;';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: []
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles variable declarations', () => {
    const code = 'int a = 5;';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a'
              }
              // TODO: Implement initial value.
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});
