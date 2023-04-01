import { parse } from '../../parser';

describe('variable declaration', () => {
  test('handles initializer list', () => {
    const code = 'int arr[3] = {[2] = 1, 2, 3};';
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          isConstant: false,
          declarations: [
            {
              type: 'VariableDeclarator',
              pattern: {
                type: 'ArrayPattern',
                id: {
                  type: 'Identifier',
                  name: 'arr'
                },
                bracketContents: [
                  {
                    expression: {
                      type: 'Constant',
                      value: 3
                    },
                    staticStatus: 'None',
                    type: 'ExpressionBracketContent'
                  }
                ]
              },
              initialValue: {
                type: 'InitializerListExpression',
                items: [
                  {
                    type: 'DesignationWithInitializerExpression',
                    designators: [
                      {
                        type: 'Constant',
                        value: 2
                      }
                    ],
                    initializer: {
                      type: 'Constant',
                      value: 1
                    }
                  },
                  {
                    type: 'DesignationWithInitializerExpression',
                    designators: [],
                    initializer: {
                      type: 'Constant',
                      value: 2
                    }
                  },
                  {
                    type: 'DesignationWithInitializerExpression',
                    designators: [],
                    initializer: {
                      type: 'Constant',
                      value: 3
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
