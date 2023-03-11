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

export interface BaseStatement extends BaseNode {}

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
