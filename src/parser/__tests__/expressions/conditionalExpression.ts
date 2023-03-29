import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('conditional expression', () => {
  test('handles conditional operator', () => {
    const code = 'int main() { a ? b : c; }';
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
                      type: 'ConditionalExpression',
                      predicate: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      consequent: {
                        type: 'SequenceExpression',
                        expressions: [
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      },
                      alternate: {
                        type: 'Identifier',
                        name: 'c'
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

  test('handles nested conditional operators', () => {
    const code = 'int main() { a ? b : c ? d : e; }';
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
                      type: 'ConditionalExpression',
                      predicate: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      consequent: {
                        type: 'SequenceExpression',
                        expressions: [
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      },
                      alternate: {
                        type: 'ConditionalExpression',
                        predicate: {
                          type: 'Identifier',
                          name: 'c'
                        },
                        consequent: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Identifier',
                              name: 'd'
                            }
                          ]
                        },
                        alternate: {
                          type: 'Identifier',
                          name: 'e'
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
