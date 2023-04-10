import { parse } from '../../parser';
import { type Program } from '../../../ast/types/ast';
import { type DataType } from '../../../ast/types/dataTypes';
import { TYPE_SPECIFIER_SEQUENCE_TO_TYPE } from '../../../ast/typeSpecifierSequenceToType';

describe('variable declaration', () => {
  test.each(Object.entries(TYPE_SPECIFIER_SEQUENCE_TO_TYPE))(
    `Handles '%s'`,
    (typeSpecifierSequence: string, dataType: DataType) => {
      const code = `int main() { ${typeSpecifierSequence} x; }`;
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
                  type: 'Declaration',
                  dataType,
                  isConstant: false,
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      pattern: {
                        type: 'Identifier',
                        name: 'x'
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      };
      expect(ast).toEqual(expectedAst);
    }
  );

  test('throws an error for invalid types', () => {
    const code = 'int main() { short long x; }';
    expect(() => parse(code)).toThrow("'short long' is not a valid type.");
  });
});
