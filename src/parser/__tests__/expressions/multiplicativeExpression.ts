import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('multiplicative expression', () => {
  test('handles multiplication', () => {
    const code = 'int main() { 2 * 3; }';
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                      type: 'Constant',
                      value: '2'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles division', () => {
    const code = 'int main() { 10 / 3; }';
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    operator: '/',
                    left: {
                      type: 'Constant',
                      value: '10'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles modulo', () => {
    const code = 'int main() { 7 % 3; }';
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                      type: 'Constant',
                      value: '7'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('is left associative', () => {
    const code = 'int main() { 10 * 2 / 5 % 3 % 1 / 4 * 7; }';
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                      type: 'BinaryExpression',
                      operator: '/',
                      left: {
                        type: 'BinaryExpression',
                        operator: '%',
                        left: {
                          type: 'BinaryExpression',
                          operator: '%',
                          left: {
                            type: 'BinaryExpression',
                            operator: '/',
                            left: {
                              type: 'BinaryExpression',
                              operator: '*',
                              left: {
                                type: 'Constant',
                                value: '10'
                              },
                              right: {
                                type: 'Constant',
                                value: '2'
                              }
                            },
                            right: {
                              type: 'Constant',
                              value: '5'
                            }
                          },
                          right: {
                            type: 'Constant',
                            value: '3'
                          }
                        },
                        right: {
                          type: 'Constant',
                          value: '1'
                        }
                      },
                      right: {
                        type: 'Constant',
                        value: '4'
                      }
                    },
                    right: {
                      type: 'Constant',
                      value: '7'
                    }
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
});
