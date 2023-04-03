import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('postfix expression', () => {
  test('handles primary expressions', () => {
    const code = 'int main() { 2; }';
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
                      type: 'Constant',
                      value: 2
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

  test('handles array accesses', () => {
    const code = 'int main() { arr[2]; }';
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
                      type: 'ArrayAccessExpression',
                      expression: {
                        type: 'Identifier',
                        name: 'arr'
                      },
                      indexesBeingAccessed: [
                        {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Constant',
                              value: 2
                            }
                          ]
                        }
                      ],
                      isAccessingAddress: false
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

  test('handles multi-dimensional array accesses', () => {
    const code = 'int main() { arr[2][5 * 3][9 - x, 3 + 4]; }';
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
                      type: 'ArrayAccessExpression',
                      expression: {
                        type: 'Identifier',
                        name: 'arr'
                      },
                      indexesBeingAccessed: [
                        {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Constant',
                              value: 2
                            }
                          ]
                        },
                        {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'BinaryExpression',
                              operator: '*',
                              left: {
                                type: 'Constant',
                                value: 5
                              },
                              right: {
                                type: 'Constant',
                                value: 3
                              }
                            }
                          ]
                        },
                        {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'BinaryExpression',
                              operator: '-',
                              left: {
                                type: 'Constant',
                                value: 9
                              },
                              right: {
                                type: 'Identifier',
                                name: 'x'
                              }
                            },
                            {
                              type: 'BinaryExpression',
                              operator: '+',
                              left: {
                                type: 'Constant',
                                value: 3
                              },
                              right: {
                                type: 'Constant',
                                value: 4
                              }
                            }
                          ]
                        }
                      ],
                      isAccessingAddress: false
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

  test('handles function calls without arguments', () => {
    const code = 'int main() { func(); }';
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
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'func'
                      },
                      arguments: []
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

  test('handles function calls with arguments', () => {
    const code = 'int main() { func(2, x, 5 * 3); }';
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
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'func'
                      },
                      arguments: [
                        {
                          type: 'Constant',
                          value: 2
                        },
                        {
                          type: 'Identifier',
                          name: 'x'
                        },
                        {
                          type: 'BinaryExpression',
                          operator: '*',
                          left: {
                            type: 'Constant',
                            value: 5
                          },
                          right: {
                            type: 'Constant',
                            value: 3
                          }
                        }
                      ]
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

  test('handles chained function calls', () => {
    const code = 'int main() { func(3)()(2, 7); }';
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
                      type: 'CallExpression',
                      callee: {
                        type: 'CallExpression',
                        callee: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'func'
                          },
                          arguments: [
                            {
                              type: 'Constant',
                              value: 3
                            }
                          ]
                        },
                        arguments: []
                      },
                      arguments: [
                        {
                          type: 'Constant',
                          value: 2
                        },
                        {
                          type: 'Constant',
                          value: 7
                        }
                      ]
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

  test('handles non-pointer member selection', () => {
    const code = 'int main() { pair.head; }';
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
                      type: 'MemberExpression',
                      expression: {
                        type: 'Identifier',
                        name: 'pair'
                      },
                      member: {
                        type: 'Identifier',
                        name: 'head'
                      },
                      isPointerAccess: false
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

  test('handles pointer member selection', () => {
    const code = 'int main() { pair->head; }';
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
                      type: 'MemberExpression',
                      expression: {
                        type: 'Identifier',
                        name: 'pair'
                      },
                      member: {
                        type: 'Identifier',
                        name: 'head'
                      },
                      isPointerAccess: true
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

  test('handles postfix increment', () => {
    const code = 'int main() { a++; }';
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
                      isPrefix: false
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

  test('handles postfix decrement', () => {
    const code = 'int main() { a--; }';
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
                      isPrefix: false
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

  test('handles a combination of array accesses, function calls, member selections & postfix updates', () => {
    const code = 'int main() { func(4215)[7]->moduleCode++; }';
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
                        type: 'MemberExpression',
                        expression: {
                          type: 'ArrayAccessExpression',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'func'
                            },
                            arguments: [
                              {
                                type: 'Constant',
                                value: 4215
                              }
                            ]
                          },
                          indexesBeingAccessed: [
                            {
                              type: 'SequenceExpression',
                              expressions: [
                                {
                                  type: 'Constant',
                                  value: 7
                                }
                              ]
                            }
                          ],
                          isAccessingAddress: false
                        },
                        member: {
                          type: 'Identifier',
                          name: 'moduleCode'
                        },
                        isPointerAccess: true
                      },
                      isPrefix: false
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
