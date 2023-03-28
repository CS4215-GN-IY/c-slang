import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('additive expression', () => {
  test('handles addition', () => {
    const code = 'int main() { 3 + 7; }';
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

  test('handles subtraction', () => {
    const code = 'int main() { 8 - 5; }';
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
                      type: 'BinaryExpression',
                      operator: '-',
                      left: {
                        type: 'Constant',
                        value: 8
                      },
                      right: {
                        type: 'Constant',
                        value: 5
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

  test('is left associative', () => {
    const code = 'int main() { 4 + 3 - 2 - 6 + 5; }';
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
                      type: 'BinaryExpression',
                      operator: '+',
                      left: {
                        type: 'BinaryExpression',
                        operator: '-',
                        left: {
                          type: 'BinaryExpression',
                          operator: '-',
                          left: {
                            type: 'BinaryExpression',
                            operator: '+',
                            left: {
                              type: 'Constant',
                              value: 4
                            },
                            right: {
                              type: 'Constant',
                              value: 3
                            }
                          },
                          right: {
                            type: 'Constant',
                            value: 2
                          }
                        },
                        right: {
                          type: 'Constant',
                          value: 6
                        }
                      },
                      right: {
                        type: 'Constant',
                        value: 5
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

  test('has lower precedence than *, /, %', () => {
    const code = 'int main() { 7 * 3 + 2 / 6 - 5 % 4; }';
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
                      type: 'BinaryExpression',
                      operator: '-',
                      left: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                          type: 'BinaryExpression',
                          operator: '*',
                          left: {
                            type: 'Constant',
                            value: 7
                          },
                          right: {
                            type: 'Constant',
                            value: 3
                          }
                        },
                        right: {
                          type: 'BinaryExpression',
                          operator: '/',
                          left: {
                            type: 'Constant',
                            value: 2
                          },
                          right: {
                            type: 'Constant',
                            value: 6
                          }
                        }
                      },
                      right: {
                        type: 'BinaryExpression',
                        operator: '%',
                        left: {
                          type: 'Constant',
                          value: 5
                        },
                        right: {
                          type: 'Constant',
                          value: 4
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
