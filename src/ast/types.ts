export interface BaseNode {
  // Every leaf interface that extends BaseNode must specify
  // a string literal as a type property. This allows us to
  // make use of TypeScript's discriminated unions.
  type: string;
}

export interface Program extends BaseNode {
  type: 'Program';
  declarations: ExternalDeclaration[];
}

export type ExternalDeclaration = FunctionDefinition | Declaration;

// TODO: Implement actual type.
export interface FunctionDefinition extends BaseNode {
  type: 'FunctionDefinition';
}

// TODO: Implement actual type.
export interface Declaration extends BaseNode {
  type: 'Declaration';
}
