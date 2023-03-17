export interface BaseNode {
  // Every leaf interface that extends BaseNode must specify
  // a string literal as a type property. This allows us to
  // make use of TypeScript's discriminated unions.
  type: string;
}

export interface NodeMap {
  Expression: Expression;
  FunctionDeclaration: FunctionDeclaration;
  Program: Program;
  Statement: Statement;
  VariableDeclaration: VariableDeclaration;
}

export type Node = NodeMap[keyof NodeMap];

export interface Program extends BaseNode {
  type: 'Program';
  body: ExternalDeclaration[];
}

export type ExternalDeclaration = FunctionDeclaration | VariableDeclaration;

export type Statement =
  | LabeledStatement
  | BlockOrEmptyStatement
  | ExpressionOrEmptyStatement
  | SelectionStatement
  | IterationStatement
  | JumpStatement;

export interface BaseStatement extends BaseNode {}

export type LabeledStatement = IdentifierStatement | DefaultStatement;

export interface IdentifierStatement extends BaseStatement {
  type: 'IdentifierStatement';
  label: Identifier;
  body: Statement;
}

export interface DefaultStatement extends BaseStatement {
  type: 'DefaultStatement';
  body: Statement;
}

export type BlockOrEmptyStatement = BlockStatement | EmptyStatement;

export interface BlockStatement extends BaseStatement {
  type: 'BlockStatement';
  items: BlockItem[];
}

export type BlockItem = VariableDeclaration | Statement;

export type ExpressionOrEmptyStatement = EmptyStatement | ExpressionStatement;

export interface EmptyStatement extends BaseStatement {
  type: 'EmptyStatement';
}

export interface ExpressionStatement extends BaseStatement {
  type: 'ExpressionStatement';
  sequence: ExpressionSequence;
}

export type SelectionStatement = IfStatement | SwitchStatement;

export interface IfStatement extends BaseStatement {
  type: 'IfStatement';
  test: ExpressionSequence;
  consequent: Statement;
  alternate?: Statement;
}

export interface SwitchStatement extends BaseStatement {
  type: 'SwitchStatement';
  discriminant: ExpressionSequence;
  body: Statement;
}

export type IterationStatement =
  | DoWhileStatement
  | ForStatement
  | WhileStatement;

export interface DoWhileStatement extends BaseStatement {
  type: 'DoWhileStatement';
  test: ExpressionSequence;
  body: Statement;
}

export interface ForStatement extends BaseStatement {
  type: 'ForStatement';
  init?: VariableDeclaration | ExpressionSequence;
  test?: ExpressionSequence;
  update?: ExpressionSequence;
  body: Statement;
}

export interface WhileStatement extends BaseStatement {
  type: 'WhileStatement';
  test: ExpressionSequence;
  body: Statement;
}

export type JumpStatement =
  | BreakStatement
  | ContinueStatement
  | GotoStatement
  | ReturnStatement;

export interface BreakStatement extends BaseStatement {
  type: 'BreakStatement';
}

export interface ContinueStatement extends BaseStatement {
  type: 'ContinueStatement';
}

export interface GotoStatement extends BaseStatement {
  type: 'GotoStatement';
  argument: Identifier;
}

export interface ReturnStatement extends BaseStatement {
  type: 'ReturnStatement';
  argument?: ExpressionSequence;
}

export interface ExpressionSequence extends BaseNode {
  type: 'ExpressionSequence';
  expressions: Expression[];
}

export type Expression =
  | ArrayAccessExpression
  | AssignmentExpression
  | BinaryExpression
  | CallExpression
  | Constant
  // An ExpressionSequence is also an Expression because there can be sequences of expressions within
  // parentheses that are delimited by comma. For example, (8 - 2, a *= 3, 7 - 4) * 3 evaluates to 6.
  // The result of evaluating the last expression in the sequence of expressions in the parentheses is
  // used. However, we still need to evaluate the previous expressions in the sequence as they can
  // possibly have side effects.
  | ExpressionSequence
  | Identifier
  | LogicalExpression
  | MemberExpression
  | StringLiteral
  | UpdateExpression;

export interface BaseExpression extends BaseNode {}

export interface Identifier extends BaseExpression {
  type: 'Identifier';
  name: string;
}

export interface Constant extends BaseExpression {
  type: 'Constant';
  value: string;
}

export interface StringLiteral extends BaseExpression {
  type: 'StringLiteral';
  value: string;
}

export interface ArrayAccessExpression extends BaseExpression {
  type: 'ArrayAccessExpression';
  expression: Expression;
  indexBeingAccessed: Expression;
}

export interface CallExpression extends BaseExpression {
  type: 'CallExpression';
  callee: Expression;
  arguments: Expression[];
}

export interface MemberExpression extends BaseExpression {
  type: 'MemberExpression';
  expression: Expression;
  member: Identifier;
  // True if '->', false if '.'
  isPointerAccess: boolean;
}

export interface UpdateExpression extends BaseExpression {
  type: 'UpdateExpression';
  operator: UpdateOperator;
  operand: Expression;
  // True if prefix, false if postfix.
  isPrefix: boolean;
}

export type UpdateOperator = '++' | '--';

export interface BinaryExpression extends BaseExpression {
  type: 'BinaryExpression';
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export type BinaryOperator =
  | '*'
  | '/'
  | '%'
  | '+'
  | '-'
  | '<<'
  | '>>'
  | '<'
  | '>'
  | '<='
  | '>='
  | '=='
  | '!='
  | '&'
  | '^'
  | '|';

export interface LogicalExpression extends BaseExpression {
  type: 'LogicalExpression';
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export type LogicalOperator = '&&' | '||';

export interface AssignmentExpression extends BaseExpression {
  type: 'AssignmentExpression';
  operator: AssignmentOperator;
  // TODO: Not the final type.
  left: string;
  right: Expression;
}

export type AssignmentOperator =
  | '='
  | '*='
  | '/='
  | '%='
  | '+='
  | '-='
  | '<<='
  | '>>='
  | '&='
  | '^='
  | '|=';

export interface BaseDeclaration extends BaseStatement {}

export interface FunctionDeclaration extends BaseDeclaration {
  type: 'FunctionDeclaration';
  // TODO: Add declaration specifiers
  id: Identifier;
  body: BlockOrEmptyStatement;
}

export interface VariableDeclaration extends BaseDeclaration {
  type: 'VariableDeclaration';
  isConstant: boolean;
  // For multiple variable declarations on the same line that are delimited by comma.
  declarations: VariableDeclarator[];
}

export interface VariableDeclarator extends BaseNode {
  type: 'VariableDeclarator';
  id: Identifier;
  initialValue?: Expression;
}
