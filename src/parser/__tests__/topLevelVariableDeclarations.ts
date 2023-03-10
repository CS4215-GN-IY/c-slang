import { parse } from '../parser';
import { type Program } from '../../ast/types';

describe('Top-level variable declarations', () => {
  it('handles uninitialised variable declarations', () => {
    const code = 'int a;';
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
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles initialised variable declarations', () => {
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
