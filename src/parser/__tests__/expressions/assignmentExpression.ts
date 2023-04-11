import { parse } from '../../parser';
import { type Program } from '../../../ast/types/ast';
import { INT32 } from '../../../ast/types/dataTypes';

describe('assignment expression', () => {
  test('handles simple assignment operator', () => {
    const code = 'int main() { x = 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles multiplication assignment operator', () => {
    const code = 'int main() { x *= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '*=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles division assignment operator', () => {
    const code = 'int main() { x /= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '/=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles remainder assignment operator', () => {
    const code = 'int main() { x %= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '%=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles addition assignment operator', () => {
    const code = 'int main() { x += 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '+=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles subtraction assignment operator', () => {
    const code = 'int main() { x -= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '-=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles left-shift assignment operator', () => {
    const code = 'int main() { x <<= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '<<=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles right-shift assignment operator', () => {
    const code = 'int main() { x >>= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '>>=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles bitwise AND assignment operator', () => {
    const code = 'int main() { x &= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '&=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles bitwise XOR assignment operator', () => {
    const code = 'int main() { x ^= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '^=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles bitwise OR assignment operator', () => {
    const code = 'int main() { x |= 4215; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '|=',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Constant',
                        value: 4215
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

  test('handles chained assignment operators', () => {
    const code =
      'int main() { a = b *= c /= d %= e += f -= g <<= h >>= i &= j ^= k |= l; }';
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
          returnDataType: INT32,
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
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'AssignmentExpression',
                        operator: '*=',
                        left: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        right: {
                          type: 'AssignmentExpression',
                          operator: '/=',
                          left: {
                            type: 'Identifier',
                            name: 'c'
                          },
                          right: {
                            type: 'AssignmentExpression',
                            operator: '%=',
                            left: {
                              type: 'Identifier',
                              name: 'd'
                            },
                            right: {
                              type: 'AssignmentExpression',
                              operator: '+=',
                              left: {
                                type: 'Identifier',
                                name: 'e'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                operator: '-=',
                                left: {
                                  type: 'Identifier',
                                  name: 'f'
                                },
                                right: {
                                  type: 'AssignmentExpression',
                                  operator: '<<=',
                                  left: {
                                    type: 'Identifier',
                                    name: 'g'
                                  },
                                  right: {
                                    type: 'AssignmentExpression',
                                    operator: '>>=',
                                    left: {
                                      type: 'Identifier',
                                      name: 'h'
                                    },
                                    right: {
                                      type: 'AssignmentExpression',
                                      operator: '&=',
                                      left: {
                                        type: 'Identifier',
                                        name: 'i'
                                      },
                                      right: {
                                        type: 'AssignmentExpression',
                                        operator: '^=',
                                        left: {
                                          type: 'Identifier',
                                          name: 'j'
                                        },
                                        right: {
                                          type: 'AssignmentExpression',
                                          operator: '|=',
                                          left: {
                                            type: 'Identifier',
                                            name: 'k'
                                          },
                                          right: {
                                            type: 'Identifier',
                                            name: 'l'
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
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
});
