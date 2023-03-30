import { parse } from '../../parser';

describe('direct declarator', () => {
  test('handles one dimensional array declaration', () => {
    const code = `
        int arr[2];
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'ArrayPattern',
                id: {
                  name: 'arr',
                  type: 'Identifier'
                },
                bracketContents: [
                  {
                    type: 'SquareBracketExpressionContent',
                    expression: {
                      type: 'Constant',
                      value: 2
                    },
                    hasStaticAfterTypes: false,
                    hasStaticBeforeTypes: false
                  }
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles two dimensional array declaration', () => {
    const code = `
        int arr[2][5];
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'ArrayPattern',
                id: {
                  name: 'arr',
                  type: 'Identifier'
                },
                bracketContents: [
                  {
                    type: 'SquareBracketExpressionContent',
                    expression: {
                      type: 'Constant',
                      value: 2
                    },
                    hasStaticAfterTypes: false,
                    hasStaticBeforeTypes: false
                  },
                  {
                    type: 'SquareBracketExpressionContent',
                    expression: {
                      type: 'Constant',
                      value: 5
                    },
                    hasStaticAfterTypes: false,
                    hasStaticBeforeTypes: false
                  }
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function declaration', () => {
    const code = `
        int f(int i, int a);
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                bracketContents: [
                  [
                    {
                      name: 'i',
                      type: 'Identifier'
                    },
                    {
                      name: 'a',
                      type: 'Identifier'
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function declaration with array param', () => {
    const code = `
        int f(int i, int a[]);
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                bracketContents: [
                  [
                    {
                      name: 'i',
                      type: 'Identifier'
                    },
                    {
                      type: 'ArrayPattern',
                      id: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      bracketContents: [
                        {
                          type: 'SquareBracketExpressionlessContent'
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function declaration with array param with *', () => {
    const code = `
        int f(int i, int a[*]);
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                bracketContents: [
                  [
                    {
                      name: 'i',
                      type: 'Identifier'
                    },
                    {
                      type: 'ArrayPattern',
                      id: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      bracketContents: [
                        {
                          type: 'SquareBracketStarContent'
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function declaration with array param with expression', () => {
    const code = `
        int f(int i, int a[i]);
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                bracketContents: [
                  [
                    {
                      name: 'i',
                      type: 'Identifier'
                    },
                    {
                      type: 'ArrayPattern',
                      id: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      bracketContents: [
                        {
                          type: 'SquareBracketExpressionContent',
                          expression: {
                            type: 'Identifier',
                            name: 'i'
                          },
                          hasStaticAfterTypes: false,
                          hasStaticBeforeTypes: false
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function declaration with no param', () => {
    const code = `
        int main();
    `;
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'FunctionPattern',
                id: {
                  name: 'main',
                  type: 'Identifier'
                },
                bracketContents: [[]]
              }
            }
          ]
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});
