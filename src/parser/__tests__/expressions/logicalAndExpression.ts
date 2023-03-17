import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('logical and expression', () => {
  test('handles logical AND', () => {
    const code = 'int main() { 1 && 0; }';
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'LogicalExpression',
                      operator: '&&',
                      left: {
                        type: 'Constant',
                        value: '1'
                      },
                      right: {
                        type: 'Constant',
                        value: '0'
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
    const code = 'int main() { 1 && 2 && 3; }';
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'LogicalExpression',
                      operator: '&&',
                      left: {
                        type: 'LogicalExpression',
                        operator: '&&',
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

  test('has lower precedence than |', () => {
    const code = 'int main() { 1 && 2 | 3; }';
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'LogicalExpression',
                      operator: '&&',
                      left: {
                        type: 'Constant',
                        value: '1'
                      },
                      right: {
                        type: 'BinaryExpression',
                        operator: '|',
                        left: {
                          type: 'Constant',
                          value: '2'
                        },
                        right: {
                          type: 'Constant',
                          value: '3'
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
