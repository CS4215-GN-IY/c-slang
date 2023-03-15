import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('postfix expression', () => {
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'CallExpression',
                    id: {
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
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test('handles function calls with arguments', () => {
    const code = 'int main() { func(2); }';
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
                    type: 'CallExpression',
                    id: {
                      type: 'Identifier',
                      name: 'func'
                    },
                    arguments: [
                      {
                        type: 'Constant',
                        value: '2'
                      }
                    ]
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

  test('handles constants', () => {
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
          body: [
            {
              type: 'ExpressionStatement',
              sequence: {
                type: 'ExpressionSequence',
                expressions: [
                  {
                    type: 'Constant',
                    value: '2'
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
