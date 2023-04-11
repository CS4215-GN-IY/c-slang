import { parse } from '../../parser';
import { type Program } from '../../../ast/types/ast';
import { type DataType } from '../../../ast/types/dataTypes';
import { TYPE_SPECIFIER_SEQUENCE_TO_TYPE } from '../../../ast/typeSpecifierSequenceToType';

describe('function definition', () => {
  test.each(Object.entries(TYPE_SPECIFIER_SEQUENCE_TO_TYPE))(
    `Handles '%s' as the return & parameter type`,
    (typeSpecifierSequence: string, dataType: DataType) => {
      const code = `${typeSpecifierSequence} main(${typeSpecifierSequence} a) { return a; }`;
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
            returnDataType: dataType,
            params: [
              {
                type: 'ParameterDeclaratorDeclaration',
                dataType,
                declarator: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              items: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'Identifier',
                        name: 'a'
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
    }
  );

  test('throws an error for invalid return types', () => {
    const code = 'short long main(int a) { return a; }';
    expect(() => parse(code)).toThrow("'short long' is not a valid type.");
  });

  test('throws an error for invalid parameter types', () => {
    const code = 'int main(short long a) { return a; }';
    expect(() => parse(code)).toThrow("'short long' is not a valid type.");
  });
});
