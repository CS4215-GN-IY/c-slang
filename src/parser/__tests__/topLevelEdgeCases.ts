import { parse } from '../parser';
import { type Program } from '../../ast/types/ast';

describe('Top-level edge cases', () => {
  it('returns an empty Program for the empty string', () => {
    const code = '';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: []
    };
    expect(ast).toEqual(expectedAst);
  });

  it('filters out the empty statement', () => {
    const code = ';';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: []
    };
    expect(ast).toEqual(expectedAst);
  });
});
