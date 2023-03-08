import { parse } from '../parser';
import { type Program } from '../../ast/types';

describe('translationUnit', () => {
  it('filters out null declarations (such as from the empty statement)', () => {
    const code = ';';
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: []
    };
    expect(ast).toEqual(expectedAst);
  });
});
