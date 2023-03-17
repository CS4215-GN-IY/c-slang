import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('shift expression', () => {
  test('handles left shift', () => {
    const code = 'int main() { 4215 << 3; }';
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
            items: [
              {
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '<<',
                      left: {
                        type: 'Constant',
                        value: '4215'
                      },
                      right: {
                        type: 'Constant',
                        value: '3'
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

  test('handles right shift', () => {
    const code = 'int main() { 4215 >> 3; }';
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
            items: [
              {
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '>>',
                      left: {
                        type: 'Constant',
                        value: '4215'
                      },
                      right: {
                        type: 'Constant',
                        value: '3'
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
    const code = 'int main() { 4215 << 2 >> 3 >> 4 << 5; }';
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
            items: [
              {
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '<<',
                      left: {
                        type: 'BinaryExpression',
                        operator: '>>',
                        left: {
                          type: 'BinaryExpression',
                          operator: '>>',
                          left: {
                            type: 'BinaryExpression',
                            operator: '<<',
                            left: {
                              type: 'Constant',
                              value: '4215'
                            },
                            right: {
                              type: 'Constant',
                              value: '2'
                            }
                          },
                          right: {
                            type: 'Constant',
                            value: '3'
                          }
                        },
                        right: {
                          type: 'Constant',
                          value: '4'
                        }
                      },
                      right: {
                        type: 'Constant',
                        value: '5'
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

  test('has lower precedence than +, -', () => {
    const code = 'int main() { 4215 << 3 + 4 >> 2 - 1; }';
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
            items: [
              {
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '>>',
                      left: {
                        type: 'BinaryExpression',
                        operator: '<<',
                        left: {
                          type: 'Constant',
                          value: '4215'
                        },
                        right: {
                          type: 'BinaryExpression',
                          operator: '+',
                          left: {
                            type: 'Constant',
                            value: '3'
                          },
                          right: {
                            type: 'Constant',
                            value: '4'
                          }
                        }
                      },
                      right: {
                        type: 'BinaryExpression',
                        operator: '-',
                        left: {
                          type: 'Constant',
                          value: '2'
                        },
                        right: {
                          type: 'Constant',
                          value: '1'
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
