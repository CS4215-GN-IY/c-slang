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
          body: {
            type: 'BlockStatement',
            items: [
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
          body: {
            type: 'BlockStatement',
            items: [
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
          body: {
            type: 'BlockStatement',
            items: [
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
          body: {
            type: 'BlockStatement',
            items: [
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
          body: {
            type: 'BlockStatement',
            items: [
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
          body: {
            type: 'BlockStatement',
            items: [
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
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  test("throws UnsupportedKeywordError for '_Generic'", () => {
    const code = `
      int main(void) {
        // Invalid program - we only want to test that the keyword '_Generic' is banned.
        _Generic((X), long double: cbrtl, default: cbrt, float: cbrtf)(X);
      }
    `;
    expect(() => parse(code)).toThrow(
      "'_Generic' is a valid keyword in C17 but is not (currently) supported."
    );
  });

  test("throws UnsupportedKeywordError for '__builtin_va_arg'", () => {
    const code = `
      int main(void) {
        // Invalid program - we only want to test that the keyword '__builtin_va_arg' is banned.
        __builtin_va_arg(a, int);
      }
    `;
    expect(() => parse(code)).toThrow(
      "'__builtin_va_arg' is a valid keyword in C17 but is not (currently) supported."
    );
  });

  test("throws UnsupportedKeywordError for '__builtin_offsetof'", () => {
    const code = `
      int main(void) {
        // Invalid program - we only want to test that the keyword '__builtin_offsetof' is banned.
        __builtin_offsetof(int, a);
      }
    `;
    expect(() => parse(code)).toThrow(
      "'__builtin_offsetof' is a valid keyword in C17 but is not (currently) supported."
    );
  });
});
