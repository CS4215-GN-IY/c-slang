import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('relational expression', () => {
  test('handles less than', () => {
    const code = 'int main() { 4 < 5; }';
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
                    operator: '<',
                    left: {
                      type: 'Constant',
                      value: '4'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles greater than', () => {
    const code = 'int main() { 4 > 5; }';
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
                    operator: '>',
                    left: {
                      type: 'Constant',
                      value: '4'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles less than or equals to', () => {
    const code = 'int main() { 4 <= 5; }';
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
                    operator: '<=',
                    left: {
                      type: 'Constant',
                      value: '4'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles greater than or equals to', () => {
    const code = 'int main() { 4 >= 5; }';
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
                    operator: '>=',
                    left: {
                      type: 'Constant',
                      value: '4'
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('is left associative', () => {
    const code = 'int main() { 1 < 2 > 3 <= 4 >= 5 >= 6 <= 7 > 8 < 9; }';
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
                    operator: '<',
                    left: {
                      type: 'BinaryExpression',
                      operator: '>',
                      left: {
                        type: 'BinaryExpression',
                        operator: '<=',
                        left: {
                          type: 'BinaryExpression',
                          operator: '>=',
                          left: {
                            type: 'BinaryExpression',
                            operator: '>=',
                            left: {
                              type: 'BinaryExpression',
                              operator: '<=',
                              left: {
                                type: 'BinaryExpression',
                                operator: '>',
                                left: {
                                  type: 'BinaryExpression',
                                  operator: '<',
                                  left: {
                                    type: 'Constant',
                                    value: '1'
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
                          },
                          right: {
                            type: 'Constant',
                            value: '6'
                          }
                        },
                        right: {
                          type: 'Constant',
                          value: '7'
                        }
                      },
                      right: {
                        type: 'Constant',
                        value: '8'
                      }
                    },
                    right: {
                      type: 'Constant',
                      value: '9'
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

  test('has lower precedence than <<, >>', () => {
    const code = 'int main() { 1 < 2 << 3 > 4 <= 5 >> 6 >= 7; }';
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
                    operator: '>=',
                    left: {
                      type: 'BinaryExpression',
                      operator: '<=',
                      left: {
                        type: 'BinaryExpression',
                        operator: '>',
                        left: {
                          type: 'BinaryExpression',
                          operator: '<',
                          left: {
                            type: 'Constant',
                            value: '1'
                          },
                          right: {
                            type: 'BinaryExpression',
                            operator: '<<',
                            left: {
                              type: 'Constant',
                              value: '2'
                            },
                            right: {
                              type: 'Constant',
                              value: '3'
                            }
                          }
                        },
                        right: {
                          type: 'Constant',
                          value: '4'
                        }
                      },
                      right: {
                        type: 'BinaryExpression',
                        operator: '>>',
                        left: {
                          type: 'Constant',
                          value: '5'
                        },
                        right: {
                          type: 'Constant',
                          value: '6'
                        }
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
