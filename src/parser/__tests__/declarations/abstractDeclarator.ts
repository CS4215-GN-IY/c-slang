import { parse } from '../../parser';
import { StaticStatus } from '../../../ast/types/ast';
import { VOID } from '../../../ast/types/dataTypes';

describe('abstract declarator', () => {
  test('bracket with no expression', () => {
    const code = 'void f(int []);';
    const ast = parse(code);
    const expectedAst = {
      type: 'Program',
      body: [
        {
          type: 'Declaration',
          dataType: VOID,
          isConstant: false,
          declarations: [
            {
              type: 'Declarator',
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
                      type: 'ExpressionlessBracketContent'
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
          type: 'Declaration',
          dataType: VOID,
          isConstant: false,
          declarations: [
            {
              type: 'Declarator',
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
                      type: 'ExpressionBracketContent',
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
