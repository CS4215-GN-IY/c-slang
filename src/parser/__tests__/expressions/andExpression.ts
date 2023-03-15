import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('and expression', () => {
  test('handles bitwise AND', () => {
    const code = 'int main() { 4 & 5; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '&',
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
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('is left associative', () => {
    const code = 'int main() { 1 & 2 & 3; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '&',
                      left: {
                        type: 'BinaryExpression',
                        operator: '&',
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

  test('has lower precedence than ==, !=', () => {
    const code = 'int main() { 1 == 2 & 3 != 4; }';
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
                type: 'ExpressionStatement',
                sequence: {
                  type: 'ExpressionSequence',
                  expressions: [
                    {
                      type: 'BinaryExpression',
                      operator: '&',
                      left: {
                        type: 'BinaryExpression',
                        operator: '==',
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
                        type: 'BinaryExpression',
                        operator: '!=',
                        left: {
                          type: 'Constant',
                          value: '3'
                        },
                        right: {
                          type: 'Constant',
                          value: '4'
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
