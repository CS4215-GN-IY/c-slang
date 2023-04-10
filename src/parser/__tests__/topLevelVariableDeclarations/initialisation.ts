import { parse } from '../../parser';
import { type Program } from '../../../ast/types/ast';

describe('Top-level variable declarations (initialisation)', () => {
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
              pattern: {
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

  it('handles multiple uninitialised variable declarations on the same line', () => {
    const code = 'int a, b, c;';
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
              pattern: {
                type: 'Identifier',
                name: 'a'
              }
            },
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'Identifier',
                name: 'b'
              }
            },
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'Identifier',
                name: 'c'
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles multiple uninitialised variable declarations on different lines', () => {
    const code = `
      int a;
      int b;
      int c;
    `;
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
              pattern: {
                type: 'Identifier',
                name: 'a'
              }
            }
          ]
        },
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'Identifier',
                name: 'b'
              }
            }
          ]
        },
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'Identifier',
                name: 'c'
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles initialised variable declarations', () => {
    const code = 'int a = b;';
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
              pattern: {
                type: 'Identifier',
                name: 'a'
              },
              initialValue: {
                type: 'Identifier',
                name: 'b'
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});
