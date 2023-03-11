export interface BaseNode {
  // Every leaf interface that extends BaseNode must specify
  // a string literal as a type property. This allows us to
  // make use of TypeScript's discriminated unions.
  type: string;
}

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

export type BlockOrEmptyStatement = BlockItem[] | EmptyStatement;

export type BlockItem = VariableDeclaration | Statement;

export type ExpressionOrEmptyStatement = EmptyStatement | ExpressionStatement;

export interface EmptyStatement extends BaseStatement {
  type: 'EmptyStatement';
}

export interface ExpressionStatement extends BaseStatement {
  type: 'ExpressionStatement';
  expression: Expression;
}

export type SelectionStatement = IfStatement | SwitchStatement;

export interface IfStatement extends BaseStatement {
  type: 'IfStatement';
  test: Expression;
  consequent: Statement;
  alternate?: Statement;
}

export interface SwitchStatement extends BaseStatement {
  type: 'SwitchStatement';
  discriminant: Expression;
  body: Statement;
}

export type IterationStatement =
  | DoWhileStatement
  | ForStatement
  | WhileStatement;

export interface DoWhileStatement extends BaseStatement {
  type: 'DoWhileStatement';
  test: Expression;
  body: Statement;
}

export interface ForStatement extends BaseStatement {
  type: 'ForStatement';
  init?: VariableDeclaration | Expression;
  test?: AssignmentExpression[];
  update?: AssignmentExpression[];
  body: Statement;
}

export interface WhileStatement extends BaseStatement {
  type: 'WhileStatement';
  test: Expression;
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
  argument?: Expression;
}

export type Expression = AssignmentExpression | Identifier;

export interface BaseExpression extends BaseNode {}

export interface Identifier extends BaseExpression {
  type: 'Identifier';
  name: string;
}

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

// TODO: Implement this.
export interface FunctionDeclaration extends BaseDeclaration {
  type: 'FunctionDeclaration';
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
