import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('unary expression', () => {
  test('handles prefix increment', () => {
    const code = 'int main() { ++a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UpdateExpression',
                      operator: '++',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      isPrefix: true
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

  test('handles prefix decrement', () => {
    const code = 'int main() { --a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UpdateExpression',
                      operator: '--',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      isPrefix: true
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

  test('handles sizeof operator', () => {
    const code = 'int main() { sizeof a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: 'sizeof',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles address-of operator', () => {
    const code = 'int main() { &a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '&',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles indirection operator', () => {
    const code = 'int main() { *a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '*',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles unary plus operator', () => {
    const code = 'int main() { +a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '+',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles negation operator', () => {
    const code = 'int main() { -a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '-',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles bitwise not operator', () => {
    const code = 'int main() { ~a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '~',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles logical not operator', () => {
    const code = 'int main() { !a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UnaryExpression',
                      operator: '!',
                      operand: {
                        type: 'Identifier',
                        name: 'a'
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

  test('handles chaining of unary operators', () => {
    const code = 'int main() { ++--sizeof&*+-~!a; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UpdateExpression',
                      operator: '++',
                      operand: {
                        type: 'UpdateExpression',
                        operator: '--',
                        operand: {
                          type: 'UnaryExpression',
                          operator: 'sizeof',
                          operand: {
                            type: 'UnaryExpression',
                            operator: '&',
                            operand: {
                              type: 'UnaryExpression',
                              operator: '*',
                              operand: {
                                type: 'UnaryExpression',
                                operator: '+',
                                operand: {
                                  type: 'UnaryExpression',
                                  operator: '-',
                                  operand: {
                                    type: 'UnaryExpression',
                                    operator: '~',
                                    operand: {
                                      type: 'UnaryExpression',
                                      operator: '!',
                                      operand: {
                                        type: 'Identifier',
                                        name: 'a'
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        isPrefix: true
                      },
                      isPrefix: true
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

  // TODO: Enable this test case once TypeName parsing is supported.
  // test("throws UnsupportedKeywordError for '_Alignof'", () => {
  //   const code = `
  //     int main(void) {
  //       _Alignof(int);
  //     }
  //   `;
  //   expect(() => parse(code)).toThrow(
  //     "'_Alignof' is a valid keyword in C17 but is not (currently) supported."
  //   );
  // });
});
