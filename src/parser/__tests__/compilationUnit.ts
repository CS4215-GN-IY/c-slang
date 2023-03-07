import { parse } from '../parser';
import { type Program } from '../../ast/types';

describe('compilationUnit', () => {
  it('returns an empty Program for the empty string', () => {
    const code = '';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: []
    };
    expect(ast).toEqual(expectedAst);
  });
});
