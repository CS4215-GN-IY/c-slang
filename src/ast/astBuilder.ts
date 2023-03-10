import { type CVisitor } from '../lang/CVisitor';
import {
  type BaseNode,
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type Program,
  type VariableDeclaration,
  type VariableDeclarator
} from './types';
import {
  type ErrorNode,
  type ParseTree,
  type RuleNode,
  type TerminalNode
} from 'antlr4ts/tree';
import {
  type AbstractDeclaratorContext,
  type AdditiveExpressionContext,
  type AlignmentSpecifierContext,
  type AndExpressionContext,
  type ArgumentExpressionListContext,
  type AssignmentExpressionContext,
  type AssignmentOperatorContext,
  type AtomicTypeSpecifierContext,
  type BlockItemContext,
  type BlockItemListContext,
  type CastExpressionContext,
  type CompilationUnitContext,
  type CompoundStatementContext,
  type ConditionalExpressionContext,
  type ConstantExpressionContext,
  type DeclarationContext,
  type DeclarationListContext,
  type DeclarationSpecifierContext,
  type DeclarationSpecifiers2Context,
  type DeclarationSpecifiersContext,
  type DeclaratorContext,
  type DesignationContext,
  type DesignatorContext,
  type DesignatorListContext,
  type DirectAbstractDeclaratorContext,
  type DirectDeclaratorContext,
  type EnumerationConstantContext,
  type EnumeratorContext,
  type EnumeratorListContext,
  type EnumSpecifierContext,
  type EqualityExpressionContext,
  type ExclusiveOrExpressionContext,
  type ExpressionContext,
  type ExpressionStatementContext,
  type ExternalDeclarationContext,
  type ForConditionContext,
  type ForDeclarationContext,
  type ForExpressionContext,
  type FunctionDefinitionContext,
  type FunctionSpecifierContext,
  type GccAttributeContext,
  type GccAttributeListContext,
  type GccAttributeSpecifierContext,
  type GccDeclaratorExtensionContext,
  type GenericAssociationContext,
  type GenericAssocListContext,
  type GenericSelectionContext,
  type IdentifierListContext,
  type InclusiveOrExpressionContext,
  type InitDeclaratorContext,
  type InitDeclaratorListContext,
  type InitializerContext,
  type InitializerListContext,
  type IterationStatementContext,
  type JumpStatementContext,
  type LabeledStatementContext,
  type LogicalAndExpressionContext,
  type LogicalOrExpressionContext,
  type MultiplicativeExpressionContext,
  type NestedParenthesesBlockContext,
  type ParameterDeclarationContext,
  type ParameterListContext,
  type ParameterTypeListContext,
  type PointerContext,
  type PostfixExpressionContext,
  type PrimaryExpressionContext,
  type RelationalExpressionContext,
  type SelectionStatementContext,
  type ShiftExpressionContext,
  type SpecifierQualifierListContext,
  type StatementContext,
  type StaticAssertDeclarationContext,
  type StorageClassSpecifierContext,
  type StructDeclarationContext,
  type StructDeclarationListContext,
  type StructDeclaratorContext,
  type StructDeclaratorListContext,
  type StructOrUnionContext,
  type StructOrUnionSpecifierContext,
  type TranslationUnitContext,
  type TypedefNameContext,
  type TypeNameContext,
  type TypeQualifierContext,
  type TypeQualifierListContext,
  type TypeSpecifierContext,
  type UnaryExpressionContext,
  type UnaryOperatorContext,
  type VcSpecificModiferContext
} from '../lang/CParser';
import {
  BrokenInvariantError,
  UnreachableCaseError,
  UnsupportedKeywordError
} from './errors';
import { isNotNull } from '../utils/typeGuards';
import { isValidTypeSpecifier } from './keywordWhitelists/typeSpecifiers';
import {
  type VisitAlignmentSpecifierReturnValue,
  type VisitDeclarationSpecifierReturnValue,
  type VisitFunctionSpecifierReturnValue,
  type VisitStorageClassSpecifierReturnValue,
  type VisitTypeQualifierReturnValue,
  type VisitTypeSpecifierReturnValue
} from './astBuilderInternalTypes';

export class ASTBuilder implements CVisitor<any> {
  visit(tree: ParseTree): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitChildren(node: RuleNode): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitTerminal(node: TerminalNode): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitErrorNode(node: ErrorNode): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAbstractDeclarator(ctx: AbstractDeclaratorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAdditiveExpression(ctx: AdditiveExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAlignmentSpecifier(
    ctx: AlignmentSpecifierContext
  ): VisitAlignmentSpecifierReturnValue {
    throw new Error('Method not implemented.');
  }

  visitAndExpression(ctx: AndExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitArgumentExpressionList(ctx: ArgumentExpressionListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAssignmentExpression(ctx: AssignmentExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAssignmentOperator(ctx: AssignmentOperatorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAtomicTypeSpecifier(ctx: AtomicTypeSpecifierContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitBlockItem(ctx: BlockItemContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitBlockItemList(ctx: BlockItemListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitCastExpression(ctx: CastExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitCompilationUnit(ctx: CompilationUnitContext): Program {
    const translationUnit = ctx.translationUnit();
    if (translationUnit === undefined) {
      return {
        type: 'Program',
        body: []
      };
    }
    return this.visitTranslationUnit(translationUnit);
  }

  visitCompoundStatement(ctx: CompoundStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitConditionalExpression(ctx: ConditionalExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitConstantExpression(ctx: ConstantExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDeclaration(ctx: DeclarationContext): VariableDeclaration {
    const initDeclaratorList = ctx.initDeclaratorList();
    const declarations =
      initDeclaratorList === undefined
        ? []
        : this.visitInitDeclaratorList(initDeclaratorList);

    const declarationSpecifiers = ctx.declarationSpecifiers();
    if (declarationSpecifiers === undefined) {
      throw new BrokenInvariantError(
        'Encountered a Declaration without DeclarationSpecifiers.'
      );
    }
    this.visitDeclarationSpecifiers(declarationSpecifiers);

    return {
      type: 'VariableDeclaration',
      // TODO: Implement this based off whether the 'const' keyword is used.
      isConstant: false,
      declarations
    };
  }

  visitDeclarationList(ctx: DeclarationListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDeclarationSpecifier(
    ctx: DeclarationSpecifierContext
  ): VisitDeclarationSpecifierReturnValue {
    const storageClassSpecifier = ctx.storageClassSpecifier();
    if (storageClassSpecifier !== undefined) {
      return this.visitStorageClassSpecifier(storageClassSpecifier);
    }

    const typeSpecifier = ctx.typeSpecifier();
    if (typeSpecifier !== undefined) {
      return this.visitTypeSpecifier(typeSpecifier);
    }

    const typeQualifier = ctx.typeQualifier();
    if (typeQualifier !== undefined) {
      return this.visitTypeQualifier(typeQualifier);
    }

    const functionSpecifier = ctx.functionSpecifier();
    if (functionSpecifier !== undefined) {
      return this.visitFunctionSpecifier(functionSpecifier);
    }

    const alignmentSpecifier = ctx.alignmentSpecifier();
    if (alignmentSpecifier !== undefined) {
      return this.visitAlignmentSpecifier(alignmentSpecifier);
    }

    throw new UnreachableCaseError();
  }

  visitDeclarationSpecifiers(
    ctx: DeclarationSpecifiersContext
  ): VisitDeclarationSpecifierReturnValue[] {
    const declarationSpecifiers = ctx.declarationSpecifier();
    return declarationSpecifiers.map(this.visitDeclarationSpecifier, this);
  }

  visitDeclarationSpecifiers2(ctx: DeclarationSpecifiers2Context): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDeclarator(ctx: DeclaratorContext): Identifier {
    // TODO: Rework this to account for pointers.
    return this.visitDirectDeclarator(ctx.directDeclarator());
  }

  visitDesignation(ctx: DesignationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDesignator(ctx: DesignatorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDesignatorList(ctx: DesignatorListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDirectAbstractDeclarator(
    ctx: DirectAbstractDeclaratorContext
  ): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitDirectDeclarator(ctx: DirectDeclaratorContext): Identifier {
    // TODO: Rework this to deal with non-identifiers.
    const identifier = ctx.Identifier();
    if (identifier === undefined) {
      throw new Error('Non-identifiers are not supported yet.');
    }
    return {
      type: 'Identifier',
      name: identifier.toString()
    };
  }

  visitEnumSpecifier(ctx: EnumSpecifierContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitEnumerationConstant(ctx: EnumerationConstantContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitEnumerator(ctx: EnumeratorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitEnumeratorList(ctx: EnumeratorListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitEqualityExpression(ctx: EqualityExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitExclusiveOrExpression(ctx: ExclusiveOrExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitExpression(ctx: ExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitExpressionStatement(ctx: ExpressionStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitExternalDeclaration(
    ctx: ExternalDeclarationContext
  ): ExternalDeclaration | null {
    const functionDefinition = ctx.functionDefinition();
    const declaration = ctx.declaration();
    if (functionDefinition === undefined && declaration === undefined) {
      // Indicates a semicolon.
      return null;
    }
    if (functionDefinition !== undefined && declaration !== undefined) {
      throw new BrokenInvariantError(
        'Encountered an ExternalDeclaration with both a corresponding FunctionDefinition and Declaration.'
      );
    }
    if (functionDefinition !== undefined) {
      return this.visitFunctionDefinition(functionDefinition);
    }
    if (declaration !== undefined) {
      return this.visitDeclaration(declaration);
    }
    throw new UnreachableCaseError();
  }

  visitForCondition(ctx: ForConditionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitForDeclaration(ctx: ForDeclarationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitForExpression(ctx: ForExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitFunctionDefinition(ctx: FunctionDefinitionContext): FunctionDeclaration {
    // TODO: Implement this.
    return {
      type: 'FunctionDeclaration'
    };
  }

  visitFunctionSpecifier(
    ctx: FunctionSpecifierContext
  ): VisitFunctionSpecifierReturnValue {
    throw new Error('Method not implemented.');
  }

  visitGccAttribute(ctx: GccAttributeContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGccAttributeList(ctx: GccAttributeListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGccAttributeSpecifier(ctx: GccAttributeSpecifierContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGccDeclaratorExtension(ctx: GccDeclaratorExtensionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGenericAssocList(ctx: GenericAssocListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGenericAssociation(ctx: GenericAssociationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitGenericSelection(ctx: GenericSelectionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitIdentifierList(ctx: IdentifierListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitInclusiveOrExpression(ctx: InclusiveOrExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitInitDeclarator(ctx: InitDeclaratorContext): VariableDeclarator {
    // TODO: Implement initial value.
    return {
      type: 'VariableDeclarator',
      id: this.visitDeclarator(ctx.declarator())
    };
  }

  visitInitDeclaratorList(
    ctx: InitDeclaratorListContext
  ): VariableDeclarator[] {
    return ctx.initDeclarator().map(this.visitInitDeclarator, this);
  }

  visitInitializer(ctx: InitializerContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitInitializerList(ctx: InitializerListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitIterationStatement(ctx: IterationStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitJumpStatement(ctx: JumpStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitLabeledStatement(ctx: LabeledStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitLogicalAndExpression(ctx: LogicalAndExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitLogicalOrExpression(ctx: LogicalOrExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitMultiplicativeExpression(
    ctx: MultiplicativeExpressionContext
  ): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitNestedParenthesesBlock(ctx: NestedParenthesesBlockContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitParameterDeclaration(ctx: ParameterDeclarationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitParameterList(ctx: ParameterListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitParameterTypeList(ctx: ParameterTypeListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitPointer(ctx: PointerContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitPostfixExpression(ctx: PostfixExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitPrimaryExpression(ctx: PrimaryExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitRelationalExpression(ctx: RelationalExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitSelectionStatement(ctx: SelectionStatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitShiftExpression(ctx: ShiftExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitSpecifierQualifierList(ctx: SpecifierQualifierListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStatement(ctx: StatementContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStaticAssertDeclaration(ctx: StaticAssertDeclarationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStorageClassSpecifier(
    ctx: StorageClassSpecifierContext
  ): VisitStorageClassSpecifierReturnValue {
    throw new Error('Method not implemented.');
  }

  visitStructDeclaration(ctx: StructDeclarationContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStructDeclarationList(ctx: StructDeclarationListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStructDeclarator(ctx: StructDeclaratorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStructDeclaratorList(ctx: StructDeclaratorListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStructOrUnion(ctx: StructOrUnionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStructOrUnionSpecifier(ctx: StructOrUnionSpecifierContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitTranslationUnit(ctx: TranslationUnitContext): Program {
    return {
      type: 'Program',
      body: ctx
        .externalDeclaration()
        .map(this.visitExternalDeclaration, this)
        .filter(isNotNull)
    };
  }

  visitTypeName(ctx: TypeNameContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitTypeQualifier(ctx: TypeQualifierContext): VisitTypeQualifierReturnValue {
    throw new Error('Method not implemented.');
  }

  visitTypeQualifierList(ctx: TypeQualifierListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitTypeSpecifier(ctx: TypeSpecifierContext): VisitTypeSpecifierReturnValue {
    const validateTypeSpecifier = (
      typeSpecifier: string
    ): VisitTypeSpecifierReturnValue => {
      if (isValidTypeSpecifier(typeSpecifier)) {
        return {
          type: 'TypeSpecifier',
          typeSpecifier
        };
      }
      throw new UnsupportedKeywordError(typeSpecifier);
    };

    const isVoid = ctx.Void() !== undefined;
    if (isVoid) {
      return validateTypeSpecifier('void');
    }

    const isChar = ctx.Char() !== undefined;
    if (isChar) {
      return validateTypeSpecifier('char');
    }

    const isShort = ctx.Short() !== undefined;
    if (isShort) {
      return validateTypeSpecifier('short');
    }

    const isInt = ctx.Int() !== undefined;
    if (isInt) {
      return validateTypeSpecifier('int');
    }

    const isLong = ctx.Long() !== undefined;
    if (isLong) {
      return validateTypeSpecifier('long');
    }

    const isFloat = ctx.Float() !== undefined;
    if (isFloat) {
      return validateTypeSpecifier('float');
    }

    const isDouble = ctx.Double() !== undefined;
    if (isDouble) {
      return validateTypeSpecifier('double');
    }

    const isSigned = ctx.Signed() !== undefined;
    if (isSigned) {
      return validateTypeSpecifier('signed');
    }

    const isUnsigned = ctx.Unsigned() !== undefined;
    if (isUnsigned) {
      return validateTypeSpecifier('unsigned');
    }

    const isBool = ctx.Bool() !== undefined;
    if (isBool) {
      return validateTypeSpecifier('_Bool');
    }

    const isComplex = ctx.Complex() !== undefined;
    if (isComplex) {
      return validateTypeSpecifier('_Complex');
    }

    // TODO: Implement visiting of nested rules.

    throw new UnreachableCaseError();
  }

  visitTypedefName(ctx: TypedefNameContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitUnaryExpression(ctx: UnaryExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitUnaryOperator(ctx: UnaryOperatorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitVcSpecificModifer(ctx: VcSpecificModiferContext): BaseNode {
    throw new Error('Method not implemented.');
  }
}
