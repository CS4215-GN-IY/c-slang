import { parse } from '../../parser';
import { INT32 } from '../../../ast/types/dataTypes';

describe('variable declaration', () => {
  test('handles initializer list', () => {
    const code = 'int arr[3] = {[2] = 1, 2, 3};';
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'Declaration',
          dataType: INT32,
          isConstant: false,
          declarations: [
            {
              type: 'Declarator',
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
                initializers: [
                  {
                    type: 'InitializerExpression',
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
                    type: 'InitializerExpression',
                    designators: [],
                    initializer: {
                      type: 'Constant',
                      value: 2
                    }
                  },
                  {
                    type: 'InitializerExpression',
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
