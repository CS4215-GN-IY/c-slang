import { parse } from '../../parser';
import { type Program } from '../../../ast/types';

describe('primary expression', () => {
  test('handles identifiers', () => {
    const code = 'int main() { a; }';
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
                    type: 'Identifier',
                    name: 'a'
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

  test('handles integer constants', () => {
    const code = 'int main() { 4215; }';
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
                    value: '4215'
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

  test('handles floating constants', () => {
    const code = 'int main() { 123.45; }';
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
                    value: '123.45'
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

  test('handles integer constants', () => {
    const code = 'int main() { 4215; }';
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
                    value: '4215'
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

  test('handles character constants', () => {
    const code = "int main() { 'h'; }";
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
                    value: "'h'"
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

  test('handles string literals', () => {
    const code = 'int main() { "Hello world!"; }';
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
                    type: 'StringLiteral',
                    value: '"Hello world!"'
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
