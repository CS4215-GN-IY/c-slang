import { parse } from '../../parser';
import { StaticStatus } from '../../../ast/types';

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
                      staticStatus: StaticStatus.NONE
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
