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

export type LabeledStatement =
  | IdentifierStatement
  | CaseStatement
  | DefaultStatement;

export interface IdentifierStatement extends BaseStatement {
  type: 'IdentifierStatement';
  label: Identifier;
  body: Statement;
}

export interface CaseStatement extends BaseStatement {
  type: 'CaseStatement';
  label: Expression;
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
  sequence: SequenceExpression;
}

export type SelectionStatement = IfStatement | SwitchStatement;

export interface IfStatement extends BaseStatement {
  type: 'IfStatement';
  predicate: SequenceExpression;
  consequent: Statement;
  alternate?: Statement;
}

export interface SwitchStatement extends BaseStatement {
  type: 'SwitchStatement';
  discriminant: SequenceExpression;
  body: Statement;
}

export type IterationStatement =
  | DoWhileStatement
  | ForStatement
  | WhileStatement;

export interface DoWhileStatement extends BaseStatement {
  type: 'DoWhileStatement';
  predicate: SequenceExpression;
  body: Statement;
}

export interface ForStatement extends BaseStatement {
  type: 'ForStatement';
  init?: VariableDeclaration | SequenceExpression;
  predicate?: SequenceExpression;
  update?: SequenceExpression;
  body: Statement;
}

export interface WhileStatement extends BaseStatement {
  type: 'WhileStatement';
  predicate: SequenceExpression;
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
  argument?: SequenceExpression;
}

export interface SequenceExpression extends BaseNode {
  type: 'SequenceExpression';
  expressions: Expression[];
}

export type Expression =
  | ArrayAccessExpression
  | AssignmentExpression
  | BinaryExpression
  | CallExpression
  | ConditionalExpression
  | Constant
  | Identifier
  | LogicalExpression
  | MemberExpression
  | SequenceExpression
  | StringLiteral
  | UnaryExpression
  | UpdateExpression;

export interface BaseExpression extends BaseNode {}

export interface Identifier extends BaseExpression {
  type: 'Identifier';
  name: string;
}

export interface Constant extends BaseExpression {
  type: 'Constant';
  value: string | number;
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

export interface UnaryExpression extends BaseExpression {
  type: 'UnaryExpression';
  operator: UnaryOperator;
  operand: Expression;
}

export type UnaryOperator = '&' | '*' | '+' | '-' | '~' | '!' | 'sizeof';

export interface BinaryExpression extends BaseExpression {
  type: 'BinaryExpression';
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export const BINARY_OPERATORS = [
  '*',
  '/',
  '%',
  '+',
  '-',
  '<<',
  '>>',
  '<',
  '>',
  '<=',
  '>=',
  '==',
  '!=',
  '&',
  '^',
  '|'
] as const;
export type BinaryOperator = (typeof BINARY_OPERATORS)[number];

export interface LogicalExpression extends BaseExpression {
  type: 'LogicalExpression';
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
}

export type LogicalOperator = '&&' | '||';

export interface ConditionalExpression extends BaseExpression {
  type: 'ConditionalExpression';
  predicate: Expression;
  consequent: Expression;
  alternate: Expression;
}

export interface AssignmentExpression extends BaseExpression {
  type: 'AssignmentExpression';
  operator: AssignmentOperator;
  left: Expression;
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
  id: DeclaratorPattern;
  params: ParameterDeclaration[];
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
  pattern: DeclaratorPattern;
  initialValue?: Expression;
}

export type DeclaratorPattern =
  | ArrayPattern
  | FunctionPattern
  | Identifier
  | PointerPattern;

export interface PointerPattern extends BaseNode {
  type: 'PointerPattern';
  pattern: DeclaratorPattern;
}

export interface ArrayPattern extends BaseNode {
  type: 'ArrayPattern';
  id: DeclaratorPattern;
  bracketContents: BracketContent[];
}

export type BracketContent =
  | BracketExpressionContent
  | BracketExpressionlessContent
  | BracketStarContent;

export interface BracketExpressionContent extends BaseNode {
  type: 'BracketExpressionContent';
  // TODO: Add type list when types are supported.
  expression: Expression;
  hasStaticBeforeTypes: boolean;
  hasStaticAfterTypes: boolean;
}

export interface BracketExpressionlessContent extends BaseNode {
  type: 'BracketExpressionlessContent';
  // TODO: Add type list when types are supported.
}

export interface BracketStarContent extends BaseNode {
  type: 'BracketStarContent';
  // TODO: Add type list when types are supported.
}

export interface FunctionPattern extends BaseNode {
  type: 'FunctionPattern';
  id: DeclaratorPattern;
  params: ParameterDeclaration[];
}

export type ParameterDeclaration =
  | ParameterDeclaratorDeclaration
  | ParameterAbstractDeclaratorDeclaration;

export interface ParameterDeclaratorDeclaration {
  type: 'ParameterDeclaratorDeclaration';
  // TODO: Support declaration specifiers
  declarator: DeclaratorPattern;
}

export interface ParameterAbstractDeclaratorDeclaration {
  type: 'ParameterAbstractDeclaratorDeclaration';
  // TODO: Support declaration specifiers
  declarator?: AbstractDeclaratorPattern;
}

export type AbstractDeclaratorPattern =
  | AbstractDeclaratorPointerPattern
  | BracketContent
  | AbstractDeclaratorParamPattern
  | AbstractDeclaratorSequencePattern;

export interface AbstractDeclaratorPointerPattern extends BaseNode {
  type: 'AbstractDeclaratorPointerPattern';
  pattern?: AbstractDeclaratorPattern;
}

export interface AbstractDeclaratorParamPattern extends BaseNode {
  type: 'AbstractDeclaratorParamPattern';
  params: ParameterDeclaration[];
}

export interface AbstractDeclaratorSequencePattern extends BaseNode {
  type: 'AbstractDeclaratorSequencePattern';
  declarators: AbstractDeclaratorPattern[];
}
