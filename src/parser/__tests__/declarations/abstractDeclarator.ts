import { parse } from '../../parser';

describe('abstract declarator', () => {
  test('bracket with no expression', () => {
    const code = 'void f(int []);';
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
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                params: [
                  {
                    type: 'ParameterAbstractDeclaratorDeclaration',
                    declarator: {
                      type: 'BracketExpressionlessContent'
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

  test('bracket with expression', () => {
    const code = 'void f(int [i]);';
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
                type: 'FunctionPattern',
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                params: [
                  {
                    type: 'ParameterAbstractDeclaratorDeclaration',
                    declarator: {
                      type: 'BracketExpressionContent',
                      expression: {
                        type: 'Identifier',
                        name: 'i'
                      },
                      hasStaticAfterTypes: false,
                      hasStaticBeforeTypes: false
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
