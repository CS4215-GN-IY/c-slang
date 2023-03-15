import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('return statement', () => {
  it('handles argument', () => {
    const code = 'int main() { return 0; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'main'
          },
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'Constant',
                      value: '0'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles no argument', () => {
    const code = 'int f() { return; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'f'
          },
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement'
              }
            ]
          }
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});

describe('goto statement', () => {
  it('goes to identifier', () => {
    const code = 'int main() { x : return 0; goto x; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'main'
          },
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'IdentifierStatement',
                label: {
                  type: 'Identifier',
                  name: 'x'
                },
                body: {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'ExpressionSequence',
                    expressions: [
                      {
                        type: 'Constant',
                        value: '0'
                      }
                    ]
                  }
                }
              },
              {
                type: 'GotoStatement',
                argument: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});
