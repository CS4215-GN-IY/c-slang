import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('function definition', () => {
  test('handles function definitions without parameters', () => {
    const code = 'int main() { return 3 + 7; }';
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
          params: [],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '+',
                      left: {
                        type: 'Constant',
                        value: 3
                      },
                      right: {
                        type: 'Constant',
                        value: 7
                      }
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

  test('handles function definitions with parameters', () => {
    const code = 'int sum(int a, int b) { return a + b; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'sum'
          },
          params: [
            {
              type: 'ParameterDeclaratorDeclaration',
              declarator: {
                type: 'Identifier',
                name: 'a'
              }
            },
            {
              type: 'ParameterDeclaratorDeclaration',
              declarator: {
                type: 'Identifier',
                name: 'b'
              }
            }
          ],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '+',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
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

  test('handles function definitions which return a function pointer', () => {
    const code = 'int (*g(int a, int b))() { return f; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'PointerPattern',
            pattern: {
              type: 'FunctionPattern',
              id: {
                type: 'Identifier',
                name: 'g'
              },
              params: [
                {
                  type: 'ParameterDeclaratorDeclaration',
                  declarator: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'ParameterDeclaratorDeclaration',
                  declarator: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            }
          },
          params: [],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'f'
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

  test('handles function definitions which return a function which returns a function pointer', () => {
    const code = 'int (*(*h(int a, int b))())() { return g; }';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'PointerPattern',
            pattern: {
              type: 'FunctionPattern',
              id: {
                type: 'PointerPattern',
                pattern: {
                  type: 'FunctionPattern',
                  id: {
                    type: 'Identifier',
                    name: 'h'
                  },
                  params: [
                    {
                      type: 'ParameterDeclaratorDeclaration',
                      declarator: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'ParameterDeclaratorDeclaration',
                      declarator: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
                }
              },
              params: []
            }
          },
          params: [],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'g'
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
});
