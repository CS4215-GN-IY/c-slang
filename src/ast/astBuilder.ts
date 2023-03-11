import { type CVisitor } from '../lang/CVisitor';
import {
  type AssignmentExpression,
  type BaseNode,
  type BlockItem,
  type BlockOrEmptyStatement,
  type Expression,
  type ExpressionOrEmptyStatement,
  type ExternalDeclaration,
  type FunctionDeclaration,
  type Identifier,
  type IterationStatement,
  type JumpStatement,
  type LabeledStatement,
  type Program,
  type SelectionStatement,
  type Statement,
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
  type ForCondition,
  type VisitAlignmentSpecifierReturnValue,
  type VisitDeclarationSpecifierReturnValue,
  type VisitFunctionSpecifierReturnValue,
  type VisitStorageClassSpecifierReturnValue,
  type VisitTypeQualifierReturnValue,
  type VisitTypeSpecifierReturnValue
} from './astBuilderInternalTypes';
import { isTypedefNameReturnValue } from './typeGuards';
import { constructEmptyStatement, constructIdentifier } from './constructors';

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

  visitAssignmentExpression(
    ctx: AssignmentExpressionContext
  ): AssignmentExpression {
    throw new Error('Method not implemented.');
  }

  visitAssignmentOperator(ctx: AssignmentOperatorContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitAtomicTypeSpecifier(ctx: AtomicTypeSpecifierContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitBlockItem(ctx: BlockItemContext): BlockItem {
    const declaration = ctx.declaration();
    if (declaration !== undefined) {
      return this.visitDeclaration(declaration);
    }

    const statement = ctx.statement();
    if (statement !== undefined) {
      return this.visitStatement(statement);
    }

    throw new UnreachableCaseError();
  }

  visitBlockItemList(ctx: BlockItemListContext): BlockItem[] {
    const blockItems = ctx.blockItem();
    return blockItems.map(this.visitBlockItem, this);
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

  visitCompoundStatement(ctx: CompoundStatementContext): BlockOrEmptyStatement {
    const blockItemList = ctx.blockItemList();
    if (blockItemList !== undefined) {
      return this.visitBlockItemList(blockItemList);
    }

    return constructEmptyStatement();
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
    const processedDeclarationSpecifiers = this.visitDeclarationSpecifiers(
      declarationSpecifiers
    );
    const typedefNameReturnValues = processedDeclarationSpecifiers.filter(
      isTypedefNameReturnValue
    );
    typedefNameReturnValues.forEach((typedefNameReturnValue) => {
      declarations.push({
        type: 'VariableDeclarator',
        id: typedefNameReturnValue.typedefName
      });
    });

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
    return constructIdentifier(identifier);
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

  visitExpression(ctx: ExpressionContext): Expression {
    throw new Error('Method not implemented.');
  }

  visitExpressionStatement(
    ctx: ExpressionStatementContext
  ): ExpressionOrEmptyStatement {
    const expression = ctx.expression();

    if (expression === undefined) {
      return constructEmptyStatement();
    }

    return {
      type: 'ExpressionStatement',
      expression: this.visitExpression(expression)
    };
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

  visitForCondition(ctx: ForConditionContext): ForCondition {
    const forDeclaration = ctx.forDeclaration();
    const expression = ctx.expression();

    if (forDeclaration !== undefined && expression !== undefined) {
      throw new BrokenInvariantError(
        'Encountered a ForCondition with both an init declaration and init expression.'
      );
    }

    const init =
      forDeclaration !== undefined
        ? this.visitForDeclaration(forDeclaration)
        : expression !== undefined
        ? this.visitExpression(expression)
        : undefined;

    const firstForExpression = ctx.forExpression(0);
    const test =
      firstForExpression !== undefined
        ? this.visitForExpression(firstForExpression)
        : undefined;
    const secondForExpression = ctx.forExpression(1);
    const update =
      secondForExpression !== undefined
        ? this.visitForExpression(secondForExpression)
        : undefined;

    return {
      type: 'ForCondition',
      init,
      test,
      update
    };
  }

  visitForDeclaration(ctx: ForDeclarationContext): VariableDeclaration {
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
    const processedDeclarationSpecifiers = this.visitDeclarationSpecifiers(
      declarationSpecifiers
    );
    const typedefNameReturnValues = processedDeclarationSpecifiers.filter(
      isTypedefNameReturnValue
    );
    typedefNameReturnValues.forEach((typedefNameReturnValue) => {
      declarations.push({
        type: 'VariableDeclarator',
        id: typedefNameReturnValue.typedefName
      });
    });

    return {
      type: 'VariableDeclaration',
      // TODO: Implement this based off whether the 'const' keyword is used.
      isConstant: false,
      declarations
    };
  }

  visitForExpression(ctx: ForExpressionContext): AssignmentExpression[] {
    const assignmentExpressions = ctx.assignmentExpression();
    return assignmentExpressions.map(this.visitAssignmentExpression, this);
  }

  visitFunctionDefinition(ctx: FunctionDefinitionContext): FunctionDeclaration {
    const declarator = ctx.declarator();
    const compoundStatement = ctx.compoundStatement();

    if (declarator === undefined) {
      throw new BrokenInvariantError(
        'Encountered a FunctionDefinition without a declarator.'
      );
    }

    if (compoundStatement === undefined) {
      throw new BrokenInvariantError(
        'Encountered a FunctionDefinition without a compound statement.'
      );
    }

    return {
      type: 'FunctionDeclaration',
      id: this.visitDeclarator(declarator),
      body: this.visitCompoundStatement(compoundStatement)
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

  visitIterationStatement(ctx: IterationStatementContext): IterationStatement {
    const expression = ctx.expression();
    const statement = ctx.statement();

    const doWhileToken = ctx.Do();
    if (
      doWhileToken !== undefined &&
      expression !== undefined &&
      statement !== undefined
    ) {
      return {
        type: 'DoWhileStatement',
        test: this.visitExpression(expression),
        body: this.visitStatement(statement)
      };
    }

    const whileToken = ctx.While();
    if (
      whileToken !== undefined &&
      expression !== undefined &&
      statement !== undefined
    ) {
      return {
        type: 'WhileStatement',
        test: this.visitExpression(expression),
        body: this.visitStatement(statement)
      };
    }

    const forToken = ctx.For();
    const forCondition = ctx.forCondition();
    if (forToken !== undefined && forCondition !== undefined) {
      return {
        ...this.visitForCondition(forCondition),
        type: 'ForStatement',
        body: this.visitStatement(statement)
      };
    }

    throw new UnreachableCaseError();
  }

  visitJumpStatement(ctx: JumpStatementContext): JumpStatement {
    const breakToken = ctx.Break();
    if (breakToken !== undefined) {
      return {
        type: 'BreakStatement'
      };
    }

    const continueToken = ctx.Continue();
    if (continueToken !== undefined) {
      return {
        type: 'ContinueStatement'
      };
    }

    const gotoToken = ctx.Goto();
    const identifier = ctx.Identifier();
    if (gotoToken !== undefined && identifier !== undefined) {
      return {
        type: 'GotoStatement',
        argument: constructIdentifier(identifier)
      };
    }

    const returnToken = ctx.Return();
    const expression = ctx.expression();
    if (returnToken !== undefined) {
      return {
        type: 'ReturnStatement',
        argument:
          expression !== undefined
            ? this.visitExpression(expression)
            : undefined
      };
    }

    throw new UnreachableCaseError();
  }

  visitLabeledStatement(ctx: LabeledStatementContext): LabeledStatement {
    const caseToken = ctx.Case();
    const defaultToken = ctx.Default();
    const identifier = ctx.Identifier();
    const statement = ctx.statement();

    if (
      caseToken === undefined &&
      defaultToken === undefined &&
      identifier !== undefined &&
      statement !== undefined
    ) {
      return {
        type: 'IdentifierStatement',
        label: constructIdentifier(identifier),
        body: this.visitStatement(statement)
      };
    }

    // TODO: Case statement when constant-expression is implemented

    if (defaultToken !== undefined && statement !== undefined) {
      return {
        type: 'DefaultStatement',
        body: this.visitStatement(statement)
      };
    }

    throw new UnreachableCaseError();
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

  visitSelectionStatement(ctx: SelectionStatementContext): SelectionStatement {
    const ifToken = ctx.If();
    const expression = ctx.expression();
    const firstStatement = ctx.statement(0);
    const elseToken = ctx.Else();
    const secondStatement = ctx.statement(1);

    if (
      ifToken !== undefined &&
      elseToken === undefined &&
      secondStatement !== undefined
    ) {
      throw new BrokenInvariantError(
        'Encountered a second statement in an If without an Else.'
      );
    }

    if (
      ifToken !== undefined &&
      expression !== undefined &&
      firstStatement !== undefined
    ) {
      return {
        type: 'IfStatement',
        test: this.visitExpression(expression),
        consequent: this.visitStatement(firstStatement),
        alternate:
          secondStatement !== undefined
            ? this.visitStatement(secondStatement)
            : undefined
      };
    }

    const switchToken = ctx.Switch();
    if (
      switchToken !== undefined &&
      expression !== undefined &&
      firstStatement !== undefined
    ) {
      return {
        type: 'SwitchStatement',
        discriminant: this.visitExpression(expression),
        body: this.visitStatement(firstStatement)
      };
    }

    throw new UnreachableCaseError();
  }

  visitShiftExpression(ctx: ShiftExpressionContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitSpecifierQualifierList(ctx: SpecifierQualifierListContext): BaseNode {
    throw new Error('Method not implemented.');
  }

  visitStatement(ctx: StatementContext): Statement {
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

    // TODO: Implement visiting of rest of nested rules.
    const typedefName = ctx.typedefName();
    if (typedefName !== undefined) {
      return {
        type: 'TypedefName',
        typedefName: this.visitTypedefName(typedefName)
      };
    }

    throw new UnreachableCaseError();
  }

  visitTypedefName(ctx: TypedefNameContext): Identifier {
    const identifier = ctx.Identifier();
    if (identifier === undefined) {
      throw new BrokenInvariantError(
        'Encountered a TypedefName without an Identifier.'
      );
    }
    return constructIdentifier(identifier);
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
