import { type TypeSpecifier } from './keywordWhitelists/typeSpecifiers';
import {
  type SequenceExpression,
  type Identifier,
  type VariableDeclaration
} from './types';

export interface BaseReturnValue {
  type: string;
}

export type VisitDeclarationSpecifierReturnValue =
  | VisitStorageClassSpecifierReturnValue
  | VisitTypeSpecifierReturnValue
  | VisitTypeQualifierReturnValue
  | VisitFunctionSpecifierReturnValue
  | VisitAlignmentSpecifierReturnValue;

export type VisitStorageClassSpecifierReturnValue =
  StorageClassSpecifierReturnValue;

export interface StorageClassSpecifierReturnValue extends BaseReturnValue {
  type: 'StorageClassSpecifier';
  // TODO: Implement the proper type.
  storageClassSpecifier: unknown;
}

export type VisitTypeSpecifierReturnValue =
  | TypeSpecifierReturnValue
  | VisitTypedefNameReturnValue;

export interface TypeSpecifierReturnValue extends BaseReturnValue {
  type: 'TypeSpecifier';
  typeSpecifier: TypeSpecifier;
}

export type VisitTypedefNameReturnValue = TypedefNameReturnValue;

export interface TypedefNameReturnValue extends BaseReturnValue {
  type: 'TypedefName';
  typedefName: Identifier;
}

export type VisitTypeQualifierReturnValue = TypeQualifierReturnValue;

export interface TypeQualifierReturnValue extends BaseReturnValue {
  type: 'TypeQualifier';
  // TODO: Implement the proper type.
  typeQualifier: unknown;
}

export type VisitFunctionSpecifierReturnValue = FunctionSpecifierReturnValue;

export interface FunctionSpecifierReturnValue extends BaseReturnValue {
  type: 'FunctionSpecifier';
  // TODO: Implement the proper type.
  functionSpecifier: unknown;
}

export type VisitAlignmentSpecifierReturnValue = AlignmentSpecifierReturnValue;

export interface AlignmentSpecifierReturnValue extends BaseReturnValue {
  type: 'AlignmentSpecifier';
  // TODO: Implement the proper type.
  alignmentSpecifier: unknown;
}

export interface ForCondition extends BaseReturnValue {
  type: 'ForCondition';
  init?: VariableDeclaration | SequenceExpression;
  test?: SequenceExpression;
  update?: SequenceExpression;
}

export interface FunctionDirectDeclaratorReturnValue extends BaseReturnValue {
  type: 'FunctionDirectDeclarator';
  functionId: Identifier;
  functionParams: Identifier[];
}
