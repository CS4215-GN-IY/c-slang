import { type PostfixExpressionContext } from '../lang/CParser';

export const canBeCallExpression = (ctx: PostfixExpressionContext): boolean => {
  const children = ctx.children?.map((child) => child.toStringTree()) ?? [];
  const hasLeftBracketAfterName = children[1] === '(';
  const hasRightBracketAtEnd = children[children.length - 1] === ')';
  return hasLeftBracketAfterName && hasRightBracketAtEnd;
};
