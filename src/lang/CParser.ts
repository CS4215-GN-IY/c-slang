// Generated from ./src/lang/C.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { CListener } from './CListener';
import { CVisitor } from './CVisitor';

export class CParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly Auto = 9;
  public static readonly Break = 10;
  public static readonly Case = 11;
  public static readonly Char = 12;
  public static readonly Const = 13;
  public static readonly Continue = 14;
  public static readonly Default = 15;
  public static readonly Do = 16;
  public static readonly Double = 17;
  public static readonly Else = 18;
  public static readonly Enum = 19;
  public static readonly Extern = 20;
  public static readonly Float = 21;
  public static readonly For = 22;
  public static readonly Goto = 23;
  public static readonly If = 24;
  public static readonly Inline = 25;
  public static readonly Int = 26;
  public static readonly Long = 27;
  public static readonly Register = 28;
  public static readonly Restrict = 29;
  public static readonly Return = 30;
  public static readonly Short = 31;
  public static readonly Signed = 32;
  public static readonly Sizeof = 33;
  public static readonly Static = 34;
  public static readonly Struct = 35;
  public static readonly Switch = 36;
  public static readonly Typedef = 37;
  public static readonly Union = 38;
  public static readonly Unsigned = 39;
  public static readonly Void = 40;
  public static readonly Volatile = 41;
  public static readonly While = 42;
  public static readonly Alignas = 43;
  public static readonly Alignof = 44;
  public static readonly Atomic = 45;
  public static readonly Bool = 46;
  public static readonly Complex = 47;
  public static readonly Generic = 48;
  public static readonly Imaginary = 49;
  public static readonly Noreturn = 50;
  public static readonly StaticAssert = 51;
  public static readonly ThreadLocal = 52;
  public static readonly LeftParen = 53;
  public static readonly RightParen = 54;
  public static readonly LeftBracket = 55;
  public static readonly RightBracket = 56;
  public static readonly LeftBrace = 57;
  public static readonly RightBrace = 58;
  public static readonly Less = 59;
  public static readonly LessEqual = 60;
  public static readonly Greater = 61;
  public static readonly GreaterEqual = 62;
  public static readonly LeftShift = 63;
  public static readonly RightShift = 64;
  public static readonly Plus = 65;
  public static readonly PlusPlus = 66;
  public static readonly Minus = 67;
  public static readonly MinusMinus = 68;
  public static readonly Star = 69;
  public static readonly Div = 70;
  public static readonly Mod = 71;
  public static readonly And = 72;
  public static readonly Or = 73;
  public static readonly AndAnd = 74;
  public static readonly OrOr = 75;
  public static readonly Caret = 76;
  public static readonly Not = 77;
  public static readonly Tilde = 78;
  public static readonly Question = 79;
  public static readonly Colon = 80;
  public static readonly Semi = 81;
  public static readonly Comma = 82;
  public static readonly Assign = 83;
  public static readonly StarAssign = 84;
  public static readonly DivAssign = 85;
  public static readonly ModAssign = 86;
  public static readonly PlusAssign = 87;
  public static readonly MinusAssign = 88;
  public static readonly LeftShiftAssign = 89;
  public static readonly RightShiftAssign = 90;
  public static readonly AndAssign = 91;
  public static readonly XorAssign = 92;
  public static readonly OrAssign = 93;
  public static readonly Equal = 94;
  public static readonly NotEqual = 95;
  public static readonly Arrow = 96;
  public static readonly Dot = 97;
  public static readonly Ellipsis = 98;
  public static readonly Identifier = 99;
  public static readonly Constant = 100;
  public static readonly DigitSequence = 101;
  public static readonly StringLiteral = 102;
  public static readonly ComplexDefine = 103;
  public static readonly IncludeDirective = 104;
  public static readonly AsmBlock = 105;
  public static readonly LineAfterPreprocessing = 106;
  public static readonly LineDirective = 107;
  public static readonly PragmaDirective = 108;
  public static readonly Whitespace = 109;
  public static readonly Newline = 110;
  public static readonly BlockComment = 111;
  public static readonly LineComment = 112;
  public static readonly RULE_primaryExpression = 0;
  public static readonly RULE_genericSelection = 1;
  public static readonly RULE_genericAssocList = 2;
  public static readonly RULE_genericAssociation = 3;
  public static readonly RULE_postfixExpression = 4;
  public static readonly RULE_argumentExpressionList = 5;
  public static readonly RULE_unaryExpression = 6;
  public static readonly RULE_unaryOperator = 7;
  public static readonly RULE_castExpression = 8;
  public static readonly RULE_multiplicativeExpression = 9;
  public static readonly RULE_additiveExpression = 10;
  public static readonly RULE_shiftExpression = 11;
  public static readonly RULE_relationalExpression = 12;
  public static readonly RULE_equalityExpression = 13;
  public static readonly RULE_andExpression = 14;
  public static readonly RULE_exclusiveOrExpression = 15;
  public static readonly RULE_inclusiveOrExpression = 16;
  public static readonly RULE_logicalAndExpression = 17;
  public static readonly RULE_logicalOrExpression = 18;
  public static readonly RULE_conditionalExpression = 19;
  public static readonly RULE_assignmentExpression = 20;
  public static readonly RULE_assignmentOperator = 21;
  public static readonly RULE_expression = 22;
  public static readonly RULE_constantExpression = 23;
  public static readonly RULE_declaration = 24;
  public static readonly RULE_declarationSpecifiers = 25;
  public static readonly RULE_declarationSpecifiers2 = 26;
  public static readonly RULE_declarationSpecifier = 27;
  public static readonly RULE_initDeclaratorList = 28;
  public static readonly RULE_initDeclarator = 29;
  public static readonly RULE_storageClassSpecifier = 30;
  public static readonly RULE_typeSpecifier = 31;
  public static readonly RULE_structOrUnionSpecifier = 32;
  public static readonly RULE_structOrUnion = 33;
  public static readonly RULE_structDeclarationList = 34;
  public static readonly RULE_structDeclaration = 35;
  public static readonly RULE_specifierQualifierList = 36;
  public static readonly RULE_structDeclaratorList = 37;
  public static readonly RULE_structDeclarator = 38;
  public static readonly RULE_enumSpecifier = 39;
  public static readonly RULE_enumeratorList = 40;
  public static readonly RULE_enumerator = 41;
  public static readonly RULE_enumerationConstant = 42;
  public static readonly RULE_atomicTypeSpecifier = 43;
  public static readonly RULE_typeQualifier = 44;
  public static readonly RULE_functionSpecifier = 45;
  public static readonly RULE_alignmentSpecifier = 46;
  public static readonly RULE_declarator = 47;
  public static readonly RULE_directDeclarator = 48;
  public static readonly RULE_functionDeclarator = 49;
  public static readonly RULE_functionDirectDeclarator = 50;
  public static readonly RULE_nestedParenthesesBlock = 51;
  public static readonly RULE_pointer = 52;
  public static readonly RULE_typeQualifierList = 53;
  public static readonly RULE_parameterTypeList = 54;
  public static readonly RULE_parameterList = 55;
  public static readonly RULE_parameterDeclaration = 56;
  public static readonly RULE_identifierList = 57;
  public static readonly RULE_typeName = 58;
  public static readonly RULE_abstractDeclarator = 59;
  public static readonly RULE_directAbstractDeclarator = 60;
  public static readonly RULE_typedefName = 61;
  public static readonly RULE_initializer = 62;
  public static readonly RULE_initializerList = 63;
  public static readonly RULE_designation = 64;
  public static readonly RULE_designatorList = 65;
  public static readonly RULE_designator = 66;
  public static readonly RULE_staticAssertDeclaration = 67;
  public static readonly RULE_statement = 68;
  public static readonly RULE_labeledStatement = 69;
  public static readonly RULE_compoundStatement = 70;
  public static readonly RULE_blockItemList = 71;
  public static readonly RULE_blockItem = 72;
  public static readonly RULE_expressionStatement = 73;
  public static readonly RULE_selectionStatement = 74;
  public static readonly RULE_iterationStatement = 75;
  public static readonly RULE_forCondition = 76;
  public static readonly RULE_forDeclaration = 77;
  public static readonly RULE_forExpression = 78;
  public static readonly RULE_jumpStatement = 79;
  public static readonly RULE_compilationUnit = 80;
  public static readonly RULE_translationUnit = 81;
  public static readonly RULE_externalDeclaration = 82;
  public static readonly RULE_functionDefinition = 83;
  public static readonly RULE_declarationList = 84;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'primaryExpression',
    'genericSelection',
    'genericAssocList',
    'genericAssociation',
    'postfixExpression',
    'argumentExpressionList',
    'unaryExpression',
    'unaryOperator',
    'castExpression',
    'multiplicativeExpression',
    'additiveExpression',
    'shiftExpression',
    'relationalExpression',
    'equalityExpression',
    'andExpression',
    'exclusiveOrExpression',
    'inclusiveOrExpression',
    'logicalAndExpression',
    'logicalOrExpression',
    'conditionalExpression',
    'assignmentExpression',
    'assignmentOperator',
    'expression',
    'constantExpression',
    'declaration',
    'declarationSpecifiers',
    'declarationSpecifiers2',
    'declarationSpecifier',
    'initDeclaratorList',
    'initDeclarator',
    'storageClassSpecifier',
    'typeSpecifier',
    'structOrUnionSpecifier',
    'structOrUnion',
    'structDeclarationList',
    'structDeclaration',
    'specifierQualifierList',
    'structDeclaratorList',
    'structDeclarator',
    'enumSpecifier',
    'enumeratorList',
    'enumerator',
    'enumerationConstant',
    'atomicTypeSpecifier',
    'typeQualifier',
    'functionSpecifier',
    'alignmentSpecifier',
    'declarator',
    'directDeclarator',
    'functionDeclarator',
    'functionDirectDeclarator',
    'nestedParenthesesBlock',
    'pointer',
    'typeQualifierList',
    'parameterTypeList',
    'parameterList',
    'parameterDeclaration',
    'identifierList',
    'typeName',
    'abstractDeclarator',
    'directAbstractDeclarator',
    'typedefName',
    'initializer',
    'initializerList',
    'designation',
    'designatorList',
    'designator',
    'staticAssertDeclaration',
    'statement',
    'labeledStatement',
    'compoundStatement',
    'blockItemList',
    'blockItem',
    'expressionStatement',
    'selectionStatement',
    'iterationStatement',
    'forCondition',
    'forDeclaration',
    'forExpression',
    'jumpStatement',
    'compilationUnit',
    'translationUnit',
    'externalDeclaration',
    'functionDefinition',
    'declarationList'
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'__builtin_va_arg'",
    "'__builtin_offsetof'",
    "'__m128'",
    "'__m128d'",
    "'__m128i'",
    "'__asm'",
    "'__asm__'",
    "'__volatile__'",
    "'auto'",
    "'break'",
    "'case'",
    "'char'",
    "'const'",
    "'continue'",
    "'default'",
    "'do'",
    "'double'",
    "'else'",
    "'enum'",
    "'extern'",
    "'float'",
    "'for'",
    "'goto'",
    "'if'",
    "'inline'",
    "'int'",
    "'long'",
    "'register'",
    "'restrict'",
    "'return'",
    "'short'",
    "'signed'",
    "'sizeof'",
    "'static'",
    "'struct'",
    "'switch'",
    "'typedef'",
    "'union'",
    "'unsigned'",
    "'void'",
    "'volatile'",
    "'while'",
    "'_Alignas'",
    "'_Alignof'",
    "'_Atomic'",
    "'_Bool'",
    "'_Complex'",
    "'_Generic'",
    "'_Imaginary'",
    "'_Noreturn'",
    "'_Static_assert'",
    "'_Thread_local'",
    "'('",
    "')'",
    "'['",
    "']'",
    "'{'",
    "'}'",
    "'<'",
    "'<='",
    "'>'",
    "'>='",
    "'<<'",
    "'>>'",
    "'+'",
    "'++'",
    "'-'",
    "'--'",
    "'*'",
    "'/'",
    "'%'",
    "'&'",
    "'|'",
    "'&&'",
    "'||'",
    "'^'",
    "'!'",
    "'~'",
    "'?'",
    "':'",
    "';'",
    "','",
    "'='",
    "'*='",
    "'/='",
    "'%='",
    "'+='",
    "'-='",
    "'<<='",
    "'>>='",
    "'&='",
    "'^='",
    "'|='",
    "'=='",
    "'!='",
    "'->'",
    "'.'",
    "'...'"
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'Auto',
    'Break',
    'Case',
    'Char',
    'Const',
    'Continue',
    'Default',
    'Do',
    'Double',
    'Else',
    'Enum',
    'Extern',
    'Float',
    'For',
    'Goto',
    'If',
    'Inline',
    'Int',
    'Long',
    'Register',
    'Restrict',
    'Return',
    'Short',
    'Signed',
    'Sizeof',
    'Static',
    'Struct',
    'Switch',
    'Typedef',
    'Union',
    'Unsigned',
    'Void',
    'Volatile',
    'While',
    'Alignas',
    'Alignof',
    'Atomic',
    'Bool',
    'Complex',
    'Generic',
    'Imaginary',
    'Noreturn',
    'StaticAssert',
    'ThreadLocal',
    'LeftParen',
    'RightParen',
    'LeftBracket',
    'RightBracket',
    'LeftBrace',
    'RightBrace',
    'Less',
    'LessEqual',
    'Greater',
    'GreaterEqual',
    'LeftShift',
    'RightShift',
    'Plus',
    'PlusPlus',
    'Minus',
    'MinusMinus',
    'Star',
    'Div',
    'Mod',
    'And',
    'Or',
    'AndAnd',
    'OrOr',
    'Caret',
    'Not',
    'Tilde',
    'Question',
    'Colon',
    'Semi',
    'Comma',
    'Assign',
    'StarAssign',
    'DivAssign',
    'ModAssign',
    'PlusAssign',
    'MinusAssign',
    'LeftShiftAssign',
    'RightShiftAssign',
    'AndAssign',
    'XorAssign',
    'OrAssign',
    'Equal',
    'NotEqual',
    'Arrow',
    'Dot',
    'Ellipsis',
    'Identifier',
    'Constant',
    'DigitSequence',
    'StringLiteral',
    'ComplexDefine',
    'IncludeDirective',
    'AsmBlock',
    'LineAfterPreprocessing',
    'LineDirective',
    'PragmaDirective',
    'Whitespace',
    'Newline',
    'BlockComment',
    'LineComment'
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    CParser._LITERAL_NAMES,
    CParser._SYMBOLIC_NAMES,
    []
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return CParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'C.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return CParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return CParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(CParser._ATN, this);
  }
  // @RuleVersion(0)
  public primaryExpression(): PrimaryExpressionContext {
    let _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 0, CParser.RULE_primaryExpression);
    let _la: number;
    try {
      this.state = 196;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.Identifier:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 170;
            this.match(CParser.Identifier);
          }
          break;
        case CParser.Constant:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 171;
            this.match(CParser.Constant);
          }
          break;
        case CParser.StringLiteral:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 173;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 172;
                  this.match(CParser.StringLiteral);
                }
              }
              this.state = 175;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === CParser.StringLiteral);
          }
          break;
        case CParser.LeftParen:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 177;
            this.match(CParser.LeftParen);
            this.state = 178;
            this.expression();
            this.state = 179;
            this.match(CParser.RightParen);
          }
          break;
        case CParser.Generic:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 181;
            this.genericSelection();
          }
          break;
        case CParser.T__0:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 182;
            this.match(CParser.T__0);
            this.state = 183;
            this.match(CParser.LeftParen);
            this.state = 184;
            this.unaryExpression();
            this.state = 185;
            this.match(CParser.Comma);
            this.state = 186;
            this.typeName();
            this.state = 187;
            this.match(CParser.RightParen);
          }
          break;
        case CParser.T__1:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 189;
            this.match(CParser.T__1);
            this.state = 190;
            this.match(CParser.LeftParen);
            this.state = 191;
            this.typeName();
            this.state = 192;
            this.match(CParser.Comma);
            this.state = 193;
            this.unaryExpression();
            this.state = 194;
            this.match(CParser.RightParen);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public genericSelection(): GenericSelectionContext {
    let _localctx: GenericSelectionContext = new GenericSelectionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 2, CParser.RULE_genericSelection);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 198;
        this.match(CParser.Generic);
        this.state = 199;
        this.match(CParser.LeftParen);
        this.state = 200;
        this.assignmentExpression();
        this.state = 201;
        this.match(CParser.Comma);
        this.state = 202;
        this.genericAssocList();
        this.state = 203;
        this.match(CParser.RightParen);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public genericAssocList(): GenericAssocListContext {
    let _localctx: GenericAssocListContext = new GenericAssocListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 4, CParser.RULE_genericAssocList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 205;
        this.genericAssociation();
        this.state = 210;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 206;
              this.match(CParser.Comma);
              this.state = 207;
              this.genericAssociation();
            }
          }
          this.state = 212;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public genericAssociation(): GenericAssociationContext {
    let _localctx: GenericAssociationContext = new GenericAssociationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 6, CParser.RULE_genericAssociation);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 215;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case CParser.T__2:
          case CParser.T__3:
          case CParser.T__4:
          case CParser.Char:
          case CParser.Const:
          case CParser.Double:
          case CParser.Enum:
          case CParser.Float:
          case CParser.Int:
          case CParser.Long:
          case CParser.Restrict:
          case CParser.Short:
          case CParser.Signed:
          case CParser.Struct:
          case CParser.Union:
          case CParser.Unsigned:
          case CParser.Void:
          case CParser.Volatile:
          case CParser.Atomic:
          case CParser.Bool:
          case CParser.Complex:
          case CParser.Identifier:
            {
              this.state = 213;
              this.typeName();
            }
            break;
          case CParser.Default:
            {
              this.state = 214;
              this.match(CParser.Default);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 217;
        this.match(CParser.Colon);
        this.state = 218;
        this.assignmentExpression();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public postfixExpression(): PostfixExpressionContext {
    let _localctx: PostfixExpressionContext = new PostfixExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 8, CParser.RULE_postfixExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 220;
        this.primaryExpression();
        this.state = 235;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (CParser.LeftParen - 53)) |
                (1 << (CParser.LeftBracket - 53)) |
                (1 << (CParser.PlusPlus - 53)) |
                (1 << (CParser.MinusMinus - 53)))) !==
              0) ||
          _la === CParser.Arrow ||
          _la === CParser.Dot
        ) {
          {
            this.state = 233;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case CParser.LeftBracket:
                {
                  this.state = 221;
                  this.match(CParser.LeftBracket);
                  this.state = 222;
                  this.expression();
                  this.state = 223;
                  this.match(CParser.RightBracket);
                }
                break;
              case CParser.LeftParen:
                {
                  this.state = 225;
                  this.match(CParser.LeftParen);
                  this.state = 227;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (
                    _la === CParser.T__0 ||
                    _la === CParser.T__1 ||
                    (((_la - 33) & ~0x1f) === 0 &&
                      ((1 << (_la - 33)) &
                        ((1 << (CParser.Sizeof - 33)) |
                          (1 << (CParser.Alignof - 33)) |
                          (1 << (CParser.Generic - 33)) |
                          (1 << (CParser.LeftParen - 33)))) !==
                        0) ||
                    (((_la - 65) & ~0x1f) === 0 &&
                      ((1 << (_la - 65)) &
                        ((1 << (CParser.Plus - 65)) |
                          (1 << (CParser.PlusPlus - 65)) |
                          (1 << (CParser.Minus - 65)) |
                          (1 << (CParser.MinusMinus - 65)) |
                          (1 << (CParser.Star - 65)) |
                          (1 << (CParser.And - 65)) |
                          (1 << (CParser.Not - 65)) |
                          (1 << (CParser.Tilde - 65)))) !==
                        0) ||
                    (((_la - 99) & ~0x1f) === 0 &&
                      ((1 << (_la - 99)) &
                        ((1 << (CParser.Identifier - 99)) |
                          (1 << (CParser.Constant - 99)) |
                          (1 << (CParser.StringLiteral - 99)))) !==
                        0)
                  ) {
                    {
                      this.state = 226;
                      this.argumentExpressionList();
                    }
                  }

                  this.state = 229;
                  this.match(CParser.RightParen);
                }
                break;
              case CParser.Arrow:
              case CParser.Dot:
                {
                  this.state = 230;
                  _la = this._input.LA(1);
                  if (!(_la === CParser.Arrow || _la === CParser.Dot)) {
                    this._errHandler.recoverInline(this);
                  } else {
                    if (this._input.LA(1) === Token.EOF) {
                      this.matchedEOF = true;
                    }

                    this._errHandler.reportMatch(this);
                    this.consume();
                  }
                  this.state = 231;
                  this.match(CParser.Identifier);
                }
                break;
              case CParser.PlusPlus:
              case CParser.MinusMinus:
                {
                  this.state = 232;
                  _la = this._input.LA(1);
                  if (
                    !(_la === CParser.PlusPlus || _la === CParser.MinusMinus)
                  ) {
                    this._errHandler.recoverInline(this);
                  } else {
                    if (this._input.LA(1) === Token.EOF) {
                      this.matchedEOF = true;
                    }

                    this._errHandler.reportMatch(this);
                    this.consume();
                  }
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          this.state = 237;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public argumentExpressionList(): ArgumentExpressionListContext {
    let _localctx: ArgumentExpressionListContext =
      new ArgumentExpressionListContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, CParser.RULE_argumentExpressionList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 238;
        this.assignmentExpression();
        this.state = 243;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 239;
              this.match(CParser.Comma);
              this.state = 240;
              this.assignmentExpression();
            }
          }
          this.state = 245;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public unaryExpression(): UnaryExpressionContext {
    let _localctx: UnaryExpressionContext = new UnaryExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 12, CParser.RULE_unaryExpression);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 249;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 246;
                _la = this._input.LA(1);
                if (
                  !(
                    _la === CParser.Sizeof ||
                    _la === CParser.PlusPlus ||
                    _la === CParser.MinusMinus
                  )
                ) {
                  this._errHandler.recoverInline(this);
                } else {
                  if (this._input.LA(1) === Token.EOF) {
                    this.matchedEOF = true;
                  }

                  this._errHandler.reportMatch(this);
                  this.consume();
                }
              }
            }
          }
          this.state = 251;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
        }
        this.state = 261;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case CParser.T__0:
          case CParser.T__1:
          case CParser.Generic:
          case CParser.LeftParen:
          case CParser.Identifier:
          case CParser.Constant:
          case CParser.StringLiteral:
            {
              this.state = 252;
              this.postfixExpression();
            }
            break;
          case CParser.Plus:
          case CParser.Minus:
          case CParser.Star:
          case CParser.And:
          case CParser.Not:
          case CParser.Tilde:
            {
              this.state = 253;
              this.unaryOperator();
              this.state = 254;
              this.castExpression();
            }
            break;
          case CParser.Sizeof:
          case CParser.Alignof:
            {
              this.state = 256;
              _la = this._input.LA(1);
              if (!(_la === CParser.Sizeof || _la === CParser.Alignof)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 257;
              this.match(CParser.LeftParen);
              this.state = 258;
              this.typeName();
              this.state = 259;
              this.match(CParser.RightParen);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public unaryOperator(): UnaryOperatorContext {
    let _localctx: UnaryOperatorContext = new UnaryOperatorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 14, CParser.RULE_unaryOperator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 263;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public castExpression(): CastExpressionContext {
    let _localctx: CastExpressionContext = new CastExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 16, CParser.RULE_castExpression);
    try {
      this.state = 271;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 265;
            this.match(CParser.LeftParen);
            this.state = 266;
            this.typeName();
            this.state = 267;
            this.match(CParser.RightParen);
            this.state = 268;
            this.castExpression();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 270;
            this.unaryExpression();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public multiplicativeExpression(): MultiplicativeExpressionContext {
    let _localctx: MultiplicativeExpressionContext =
      new MultiplicativeExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, CParser.RULE_multiplicativeExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 273;
        this.castExpression();
        this.state = 278;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la - 69) & ~0x1f) === 0 &&
          ((1 << (_la - 69)) &
            ((1 << (CParser.Star - 69)) |
              (1 << (CParser.Div - 69)) |
              (1 << (CParser.Mod - 69)))) !==
            0
        ) {
          {
            {
              this.state = 274;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 69) & ~0x1f) === 0 &&
                  ((1 << (_la - 69)) &
                    ((1 << (CParser.Star - 69)) |
                      (1 << (CParser.Div - 69)) |
                      (1 << (CParser.Mod - 69)))) !==
                    0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 275;
              this.castExpression();
            }
          }
          this.state = 280;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public additiveExpression(): AdditiveExpressionContext {
    let _localctx: AdditiveExpressionContext = new AdditiveExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 20, CParser.RULE_additiveExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 281;
        this.multiplicativeExpression();
        this.state = 286;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Plus || _la === CParser.Minus) {
          {
            {
              this.state = 282;
              _la = this._input.LA(1);
              if (!(_la === CParser.Plus || _la === CParser.Minus)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 283;
              this.multiplicativeExpression();
            }
          }
          this.state = 288;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public shiftExpression(): ShiftExpressionContext {
    let _localctx: ShiftExpressionContext = new ShiftExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 22, CParser.RULE_shiftExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 289;
        this.additiveExpression();
        this.state = 294;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.LeftShift || _la === CParser.RightShift) {
          {
            {
              this.state = 290;
              _la = this._input.LA(1);
              if (!(_la === CParser.LeftShift || _la === CParser.RightShift)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 291;
              this.additiveExpression();
            }
          }
          this.state = 296;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public relationalExpression(): RelationalExpressionContext {
    let _localctx: RelationalExpressionContext =
      new RelationalExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 24, CParser.RULE_relationalExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 297;
        this.shiftExpression();
        this.state = 302;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la - 59) & ~0x1f) === 0 &&
          ((1 << (_la - 59)) &
            ((1 << (CParser.Less - 59)) |
              (1 << (CParser.LessEqual - 59)) |
              (1 << (CParser.Greater - 59)) |
              (1 << (CParser.GreaterEqual - 59)))) !==
            0
        ) {
          {
            {
              this.state = 298;
              _la = this._input.LA(1);
              if (
                !(
                  ((_la - 59) & ~0x1f) === 0 &&
                  ((1 << (_la - 59)) &
                    ((1 << (CParser.Less - 59)) |
                      (1 << (CParser.LessEqual - 59)) |
                      (1 << (CParser.Greater - 59)) |
                      (1 << (CParser.GreaterEqual - 59)))) !==
                    0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 299;
              this.shiftExpression();
            }
          }
          this.state = 304;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public equalityExpression(): EqualityExpressionContext {
    let _localctx: EqualityExpressionContext = new EqualityExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 26, CParser.RULE_equalityExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 305;
        this.relationalExpression();
        this.state = 310;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Equal || _la === CParser.NotEqual) {
          {
            {
              this.state = 306;
              _la = this._input.LA(1);
              if (!(_la === CParser.Equal || _la === CParser.NotEqual)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 307;
              this.relationalExpression();
            }
          }
          this.state = 312;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public andExpression(): AndExpressionContext {
    let _localctx: AndExpressionContext = new AndExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 28, CParser.RULE_andExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 313;
        this.equalityExpression();
        this.state = 318;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.And) {
          {
            {
              this.state = 314;
              this.match(CParser.And);
              this.state = 315;
              this.equalityExpression();
            }
          }
          this.state = 320;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public exclusiveOrExpression(): ExclusiveOrExpressionContext {
    let _localctx: ExclusiveOrExpressionContext =
      new ExclusiveOrExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, CParser.RULE_exclusiveOrExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 321;
        this.andExpression();
        this.state = 326;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Caret) {
          {
            {
              this.state = 322;
              this.match(CParser.Caret);
              this.state = 323;
              this.andExpression();
            }
          }
          this.state = 328;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public inclusiveOrExpression(): InclusiveOrExpressionContext {
    let _localctx: InclusiveOrExpressionContext =
      new InclusiveOrExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, CParser.RULE_inclusiveOrExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 329;
        this.exclusiveOrExpression();
        this.state = 334;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Or) {
          {
            {
              this.state = 330;
              this.match(CParser.Or);
              this.state = 331;
              this.exclusiveOrExpression();
            }
          }
          this.state = 336;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public logicalAndExpression(): LogicalAndExpressionContext {
    let _localctx: LogicalAndExpressionContext =
      new LogicalAndExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, CParser.RULE_logicalAndExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 337;
        this.inclusiveOrExpression();
        this.state = 342;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.AndAnd) {
          {
            {
              this.state = 338;
              this.match(CParser.AndAnd);
              this.state = 339;
              this.inclusiveOrExpression();
            }
          }
          this.state = 344;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public logicalOrExpression(): LogicalOrExpressionContext {
    let _localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 36, CParser.RULE_logicalOrExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 345;
        this.logicalAndExpression();
        this.state = 350;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.OrOr) {
          {
            {
              this.state = 346;
              this.match(CParser.OrOr);
              this.state = 347;
              this.logicalAndExpression();
            }
          }
          this.state = 352;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public conditionalExpression(): ConditionalExpressionContext {
    let _localctx: ConditionalExpressionContext =
      new ConditionalExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 38, CParser.RULE_conditionalExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 353;
        this.logicalOrExpression();
        this.state = 359;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Question) {
          {
            this.state = 354;
            this.match(CParser.Question);
            this.state = 355;
            this.expression();
            this.state = 356;
            this.match(CParser.Colon);
            this.state = 357;
            this.conditionalExpression();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignmentExpression(): AssignmentExpressionContext {
    let _localctx: AssignmentExpressionContext =
      new AssignmentExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 40, CParser.RULE_assignmentExpression);
    try {
      this.state = 366;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 361;
            this.conditionalExpression();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 362;
            this.unaryExpression();
            this.state = 363;
            this.assignmentOperator();
            this.state = 364;
            this.assignmentExpression();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignmentOperator(): AssignmentOperatorContext {
    let _localctx: AssignmentOperatorContext = new AssignmentOperatorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 42, CParser.RULE_assignmentOperator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 368;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 83) & ~0x1f) === 0 &&
            ((1 << (_la - 83)) &
              ((1 << (CParser.Assign - 83)) |
                (1 << (CParser.StarAssign - 83)) |
                (1 << (CParser.DivAssign - 83)) |
                (1 << (CParser.ModAssign - 83)) |
                (1 << (CParser.PlusAssign - 83)) |
                (1 << (CParser.MinusAssign - 83)) |
                (1 << (CParser.LeftShiftAssign - 83)) |
                (1 << (CParser.RightShiftAssign - 83)) |
                (1 << (CParser.AndAssign - 83)) |
                (1 << (CParser.XorAssign - 83)) |
                (1 << (CParser.OrAssign - 83)))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expression(): ExpressionContext {
    let _localctx: ExpressionContext = new ExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 44, CParser.RULE_expression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 370;
        this.assignmentExpression();
        this.state = 375;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 371;
              this.match(CParser.Comma);
              this.state = 372;
              this.assignmentExpression();
            }
          }
          this.state = 377;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public constantExpression(): ConstantExpressionContext {
    let _localctx: ConstantExpressionContext = new ConstantExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 46, CParser.RULE_constantExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 378;
        this.conditionalExpression();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declaration(): DeclarationContext {
    let _localctx: DeclarationContext = new DeclarationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 48, CParser.RULE_declaration);
    let _la: number;
    try {
      this.state = 387;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.T__2:
        case CParser.T__3:
        case CParser.T__4:
        case CParser.Auto:
        case CParser.Char:
        case CParser.Const:
        case CParser.Double:
        case CParser.Enum:
        case CParser.Extern:
        case CParser.Float:
        case CParser.Inline:
        case CParser.Int:
        case CParser.Long:
        case CParser.Register:
        case CParser.Restrict:
        case CParser.Short:
        case CParser.Signed:
        case CParser.Static:
        case CParser.Struct:
        case CParser.Typedef:
        case CParser.Union:
        case CParser.Unsigned:
        case CParser.Void:
        case CParser.Volatile:
        case CParser.Alignas:
        case CParser.Atomic:
        case CParser.Bool:
        case CParser.Complex:
        case CParser.Noreturn:
        case CParser.ThreadLocal:
        case CParser.Identifier:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 380;
            this.declarationSpecifiers();
            this.state = 382;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (((_la - 53) & ~0x1f) === 0 &&
                ((1 << (_la - 53)) &
                  ((1 << (CParser.LeftParen - 53)) |
                    (1 << (CParser.Star - 53)) |
                    (1 << (CParser.Caret - 53)))) !==
                  0) ||
              _la === CParser.Identifier
            ) {
              {
                this.state = 381;
                this.initDeclaratorList();
              }
            }

            this.state = 384;
            this.match(CParser.Semi);
          }
          break;
        case CParser.StaticAssert:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 386;
            this.staticAssertDeclaration();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declarationSpecifiers(): DeclarationSpecifiersContext {
    let _localctx: DeclarationSpecifiersContext =
      new DeclarationSpecifiersContext(this._ctx, this.state);
    this.enterRule(_localctx, 50, CParser.RULE_declarationSpecifiers);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 390;
        this._errHandler.sync(this);
        _alt = 1;
        do {
          switch (_alt) {
            case 1:
              {
                {
                  this.state = 389;
                  this.declarationSpecifier();
                }
              }
              break;
            default:
              throw new NoViableAltException(this);
          }
          this.state = 392;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
        } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declarationSpecifiers2(): DeclarationSpecifiers2Context {
    let _localctx: DeclarationSpecifiers2Context =
      new DeclarationSpecifiers2Context(this._ctx, this.state);
    this.enterRule(_localctx, 52, CParser.RULE_declarationSpecifiers2);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 395;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 394;
              this.declarationSpecifier();
            }
          }
          this.state = 397;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Auto) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.ThreadLocal - 32)))) !==
              0) ||
          _la === CParser.Identifier
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declarationSpecifier(): DeclarationSpecifierContext {
    let _localctx: DeclarationSpecifierContext =
      new DeclarationSpecifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 54, CParser.RULE_declarationSpecifier);
    try {
      this.state = 404;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 28, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 399;
            this.storageClassSpecifier();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 400;
            this.typeSpecifier();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 401;
            this.typeQualifier();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 402;
            this.functionSpecifier();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 403;
            this.alignmentSpecifier();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public initDeclaratorList(): InitDeclaratorListContext {
    let _localctx: InitDeclaratorListContext = new InitDeclaratorListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 56, CParser.RULE_initDeclaratorList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 406;
        this.initDeclarator();
        this.state = 411;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 407;
              this.match(CParser.Comma);
              this.state = 408;
              this.initDeclarator();
            }
          }
          this.state = 413;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public initDeclarator(): InitDeclaratorContext {
    let _localctx: InitDeclaratorContext = new InitDeclaratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 58, CParser.RULE_initDeclarator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 414;
        this.declarator();
        this.state = 417;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Assign) {
          {
            this.state = 415;
            this.match(CParser.Assign);
            this.state = 416;
            this.initializer();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public storageClassSpecifier(): StorageClassSpecifierContext {
    let _localctx: StorageClassSpecifierContext =
      new StorageClassSpecifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 60, CParser.RULE_storageClassSpecifier);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 419;
        _la = this._input.LA(1);
        if (
          !(
            ((_la & ~0x1f) === 0 &&
              ((1 << _la) &
                ((1 << CParser.Auto) |
                  (1 << CParser.Extern) |
                  (1 << CParser.Register))) !==
                0) ||
            (((_la - 34) & ~0x1f) === 0 &&
              ((1 << (_la - 34)) &
                ((1 << (CParser.Static - 34)) |
                  (1 << (CParser.Typedef - 34)) |
                  (1 << (CParser.ThreadLocal - 34)))) !==
                0)
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeSpecifier(): TypeSpecifierContext {
    let _localctx: TypeSpecifierContext = new TypeSpecifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 62, CParser.RULE_typeSpecifier);
    let _la: number;
    try {
      this.state = 426;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.T__2:
        case CParser.T__3:
        case CParser.T__4:
        case CParser.Char:
        case CParser.Double:
        case CParser.Float:
        case CParser.Int:
        case CParser.Long:
        case CParser.Short:
        case CParser.Signed:
        case CParser.Unsigned:
        case CParser.Void:
        case CParser.Bool:
        case CParser.Complex:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 421;
            _la = this._input.LA(1);
            if (
              !(
                ((_la & ~0x1f) === 0 &&
                  ((1 << _la) &
                    ((1 << CParser.T__2) |
                      (1 << CParser.T__3) |
                      (1 << CParser.T__4) |
                      (1 << CParser.Char) |
                      (1 << CParser.Double) |
                      (1 << CParser.Float) |
                      (1 << CParser.Int) |
                      (1 << CParser.Long) |
                      (1 << CParser.Short))) !==
                    0) ||
                (((_la - 32) & ~0x1f) === 0 &&
                  ((1 << (_la - 32)) &
                    ((1 << (CParser.Signed - 32)) |
                      (1 << (CParser.Unsigned - 32)) |
                      (1 << (CParser.Void - 32)) |
                      (1 << (CParser.Bool - 32)) |
                      (1 << (CParser.Complex - 32)))) !==
                    0)
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
          break;
        case CParser.Atomic:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 422;
            this.atomicTypeSpecifier();
          }
          break;
        case CParser.Struct:
        case CParser.Union:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 423;
            this.structOrUnionSpecifier();
          }
          break;
        case CParser.Enum:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 424;
            this.enumSpecifier();
          }
          break;
        case CParser.Identifier:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 425;
            this.typedefName();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structOrUnionSpecifier(): StructOrUnionSpecifierContext {
    let _localctx: StructOrUnionSpecifierContext =
      new StructOrUnionSpecifierContext(this._ctx, this.state);
    this.enterRule(_localctx, 64, CParser.RULE_structOrUnionSpecifier);
    let _la: number;
    try {
      this.state = 439;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 33, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 428;
            this.structOrUnion();
            this.state = 430;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === CParser.Identifier) {
              {
                this.state = 429;
                this.match(CParser.Identifier);
              }
            }

            this.state = 432;
            this.match(CParser.LeftBrace);
            this.state = 433;
            this.structDeclarationList();
            this.state = 434;
            this.match(CParser.RightBrace);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 436;
            this.structOrUnion();
            this.state = 437;
            this.match(CParser.Identifier);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structOrUnion(): StructOrUnionContext {
    let _localctx: StructOrUnionContext = new StructOrUnionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 66, CParser.RULE_structOrUnion);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 441;
        _la = this._input.LA(1);
        if (!(_la === CParser.Struct || _la === CParser.Union)) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structDeclarationList(): StructDeclarationListContext {
    let _localctx: StructDeclarationListContext =
      new StructDeclarationListContext(this._ctx, this.state);
    this.enterRule(_localctx, 68, CParser.RULE_structDeclarationList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 444;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 443;
              this.structDeclaration();
            }
          }
          this.state = 446;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Float) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.StaticAssert - 32)))) !==
              0) ||
          _la === CParser.Identifier
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structDeclaration(): StructDeclarationContext {
    let _localctx: StructDeclarationContext = new StructDeclarationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 70, CParser.RULE_structDeclaration);
    try {
      this.state = 456;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 35, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 448;
            this.specifierQualifierList();
            this.state = 449;
            this.structDeclaratorList();
            this.state = 450;
            this.match(CParser.Semi);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 452;
            this.specifierQualifierList();
            this.state = 453;
            this.match(CParser.Semi);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 455;
            this.staticAssertDeclaration();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public specifierQualifierList(): SpecifierQualifierListContext {
    let _localctx: SpecifierQualifierListContext =
      new SpecifierQualifierListContext(this._ctx, this.state);
    this.enterRule(_localctx, 72, CParser.RULE_specifierQualifierList);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 460;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 36, this._ctx)) {
          case 1:
            {
              this.state = 458;
              this.typeSpecifier();
            }
            break;

          case 2:
            {
              this.state = 459;
              this.typeQualifier();
            }
            break;
        }
        this.state = 463;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 37, this._ctx)) {
          case 1:
            {
              this.state = 462;
              this.specifierQualifierList();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structDeclaratorList(): StructDeclaratorListContext {
    let _localctx: StructDeclaratorListContext =
      new StructDeclaratorListContext(this._ctx, this.state);
    this.enterRule(_localctx, 74, CParser.RULE_structDeclaratorList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 465;
        this.structDeclarator();
        this.state = 470;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 466;
              this.match(CParser.Comma);
              this.state = 467;
              this.structDeclarator();
            }
          }
          this.state = 472;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structDeclarator(): StructDeclaratorContext {
    let _localctx: StructDeclaratorContext = new StructDeclaratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 76, CParser.RULE_structDeclarator);
    let _la: number;
    try {
      this.state = 479;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 40, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 473;
            this.declarator();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 475;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              (((_la - 53) & ~0x1f) === 0 &&
                ((1 << (_la - 53)) &
                  ((1 << (CParser.LeftParen - 53)) |
                    (1 << (CParser.Star - 53)) |
                    (1 << (CParser.Caret - 53)))) !==
                  0) ||
              _la === CParser.Identifier
            ) {
              {
                this.state = 474;
                this.declarator();
              }
            }

            this.state = 477;
            this.match(CParser.Colon);
            this.state = 478;
            this.constantExpression();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enumSpecifier(): EnumSpecifierContext {
    let _localctx: EnumSpecifierContext = new EnumSpecifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 78, CParser.RULE_enumSpecifier);
    let _la: number;
    try {
      this.state = 494;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 43, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 481;
            this.match(CParser.Enum);
            this.state = 483;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === CParser.Identifier) {
              {
                this.state = 482;
                this.match(CParser.Identifier);
              }
            }

            this.state = 485;
            this.match(CParser.LeftBrace);
            this.state = 486;
            this.enumeratorList();
            this.state = 488;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === CParser.Comma) {
              {
                this.state = 487;
                this.match(CParser.Comma);
              }
            }

            this.state = 490;
            this.match(CParser.RightBrace);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 492;
            this.match(CParser.Enum);
            this.state = 493;
            this.match(CParser.Identifier);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enumeratorList(): EnumeratorListContext {
    let _localctx: EnumeratorListContext = new EnumeratorListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 80, CParser.RULE_enumeratorList);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 496;
        this.enumerator();
        this.state = 501;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 497;
                this.match(CParser.Comma);
                this.state = 498;
                this.enumerator();
              }
            }
          }
          this.state = 503;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enumerator(): EnumeratorContext {
    let _localctx: EnumeratorContext = new EnumeratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 82, CParser.RULE_enumerator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 504;
        this.enumerationConstant();
        this.state = 507;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Assign) {
          {
            this.state = 505;
            this.match(CParser.Assign);
            this.state = 506;
            this.constantExpression();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public enumerationConstant(): EnumerationConstantContext {
    let _localctx: EnumerationConstantContext = new EnumerationConstantContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 84, CParser.RULE_enumerationConstant);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 509;
        this.match(CParser.Identifier);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public atomicTypeSpecifier(): AtomicTypeSpecifierContext {
    let _localctx: AtomicTypeSpecifierContext = new AtomicTypeSpecifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 86, CParser.RULE_atomicTypeSpecifier);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 511;
        this.match(CParser.Atomic);
        this.state = 512;
        this.match(CParser.LeftParen);
        this.state = 513;
        this.typeName();
        this.state = 514;
        this.match(CParser.RightParen);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeQualifier(): TypeQualifierContext {
    let _localctx: TypeQualifierContext = new TypeQualifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 88, CParser.RULE_typeQualifier);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 516;
        _la = this._input.LA(1);
        if (
          !(
            _la === CParser.Const ||
            _la === CParser.Restrict ||
            _la === CParser.Volatile ||
            _la === CParser.Atomic
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionSpecifier(): FunctionSpecifierContext {
    let _localctx: FunctionSpecifierContext = new FunctionSpecifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 90, CParser.RULE_functionSpecifier);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 518;
        _la = this._input.LA(1);
        if (!(_la === CParser.Inline || _la === CParser.Noreturn)) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public alignmentSpecifier(): AlignmentSpecifierContext {
    let _localctx: AlignmentSpecifierContext = new AlignmentSpecifierContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 92, CParser.RULE_alignmentSpecifier);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 520;
        this.match(CParser.Alignas);
        this.state = 521;
        this.match(CParser.LeftParen);
        this.state = 524;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 46, this._ctx)) {
          case 1:
            {
              this.state = 522;
              this.typeName();
            }
            break;

          case 2:
            {
              this.state = 523;
              this.constantExpression();
            }
            break;
        }
        this.state = 526;
        this.match(CParser.RightParen);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declarator(): DeclaratorContext {
    let _localctx: DeclaratorContext = new DeclaratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 94, CParser.RULE_declarator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 529;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Star || _la === CParser.Caret) {
          {
            this.state = 528;
            this.pointer();
          }
        }

        this.state = 531;
        this.directDeclarator(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public directDeclarator(): DirectDeclaratorContext;
  public directDeclarator(_p: number): DirectDeclaratorContext;
  // @RuleVersion(0)
  public directDeclarator(_p?: number): DirectDeclaratorContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let _localctx: DirectDeclaratorContext = new DirectDeclaratorContext(
      this._ctx,
      _parentState
    );
    let _prevctx: DirectDeclaratorContext = _localctx;
    let _startState: number = 96;
    this.enterRecursionRule(_localctx, 96, CParser.RULE_directDeclarator, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 542;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 48, this._ctx)) {
          case 1:
            {
              this.state = 534;
              this.match(CParser.Identifier);
            }
            break;

          case 2:
            {
              this.state = 535;
              this.match(CParser.LeftParen);
              this.state = 536;
              this.declarator();
              this.state = 537;
              this.match(CParser.RightParen);
            }
            break;

          case 3:
            {
              this.state = 539;
              this.match(CParser.Identifier);
              this.state = 540;
              this.match(CParser.Colon);
              this.state = 541;
              this.match(CParser.DigitSequence);
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 589;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 55, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 587;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 54, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 544;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 7)'
                      );
                    }
                    this.state = 545;
                    this.match(CParser.LeftBracket);
                    this.state = 547;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.Const ||
                      _la === CParser.Restrict ||
                      _la === CParser.Volatile ||
                      _la === CParser.Atomic
                    ) {
                      {
                        this.state = 546;
                        this.typeQualifierList();
                      }
                    }

                    this.state = 550;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.T__0 ||
                      _la === CParser.T__1 ||
                      (((_la - 33) & ~0x1f) === 0 &&
                        ((1 << (_la - 33)) &
                          ((1 << (CParser.Sizeof - 33)) |
                            (1 << (CParser.Alignof - 33)) |
                            (1 << (CParser.Generic - 33)) |
                            (1 << (CParser.LeftParen - 33)))) !==
                          0) ||
                      (((_la - 65) & ~0x1f) === 0 &&
                        ((1 << (_la - 65)) &
                          ((1 << (CParser.Plus - 65)) |
                            (1 << (CParser.PlusPlus - 65)) |
                            (1 << (CParser.Minus - 65)) |
                            (1 << (CParser.MinusMinus - 65)) |
                            (1 << (CParser.Star - 65)) |
                            (1 << (CParser.And - 65)) |
                            (1 << (CParser.Not - 65)) |
                            (1 << (CParser.Tilde - 65)))) !==
                          0) ||
                      (((_la - 99) & ~0x1f) === 0 &&
                        ((1 << (_la - 99)) &
                          ((1 << (CParser.Identifier - 99)) |
                            (1 << (CParser.Constant - 99)) |
                            (1 << (CParser.StringLiteral - 99)))) !==
                          0)
                    ) {
                      {
                        this.state = 549;
                        this.assignmentExpression();
                      }
                    }

                    this.state = 552;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 2:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 553;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 6)'
                      );
                    }
                    this.state = 554;
                    this.match(CParser.LeftBracket);
                    this.state = 555;
                    this.match(CParser.Static);
                    this.state = 557;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.Const ||
                      _la === CParser.Restrict ||
                      _la === CParser.Volatile ||
                      _la === CParser.Atomic
                    ) {
                      {
                        this.state = 556;
                        this.typeQualifierList();
                      }
                    }

                    this.state = 559;
                    this.assignmentExpression();
                    this.state = 560;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 3:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 562;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)'
                      );
                    }
                    this.state = 563;
                    this.match(CParser.LeftBracket);
                    this.state = 564;
                    this.typeQualifierList();
                    this.state = 565;
                    this.match(CParser.Static);
                    this.state = 566;
                    this.assignmentExpression();
                    this.state = 567;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 4:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 569;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)'
                      );
                    }
                    this.state = 570;
                    this.match(CParser.LeftBracket);
                    this.state = 572;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.Const ||
                      _la === CParser.Restrict ||
                      _la === CParser.Volatile ||
                      _la === CParser.Atomic
                    ) {
                      {
                        this.state = 571;
                        this.typeQualifierList();
                      }
                    }

                    this.state = 574;
                    this.match(CParser.Star);
                    this.state = 575;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 5:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 576;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)'
                      );
                    }
                    this.state = 577;
                    this.match(CParser.LeftParen);
                    this.state = 578;
                    this.parameterTypeList();
                    this.state = 579;
                    this.match(CParser.RightParen);
                  }
                  break;

                case 6:
                  {
                    _localctx = new DirectDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directDeclarator
                    );
                    this.state = 581;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 2)'
                      );
                    }
                    this.state = 582;
                    this.match(CParser.LeftParen);
                    this.state = 584;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === CParser.Identifier) {
                      {
                        this.state = 583;
                        this.identifierList();
                      }
                    }

                    this.state = 586;
                    this.match(CParser.RightParen);
                  }
                  break;
              }
            }
          }
          this.state = 591;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 55, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionDeclarator(): FunctionDeclaratorContext {
    let _localctx: FunctionDeclaratorContext = new FunctionDeclaratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 98, CParser.RULE_functionDeclarator);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 593;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Star || _la === CParser.Caret) {
          {
            this.state = 592;
            this.pointer();
          }
        }

        this.state = 595;
        this.functionDirectDeclarator();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionDirectDeclarator(): FunctionDirectDeclaratorContext {
    let _localctx: FunctionDirectDeclaratorContext =
      new FunctionDirectDeclaratorContext(this._ctx, this.state);
    this.enterRule(_localctx, 100, CParser.RULE_functionDirectDeclarator);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 602;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case CParser.Identifier:
            {
              this.state = 597;
              this.match(CParser.Identifier);
            }
            break;
          case CParser.LeftParen:
            {
              this.state = 598;
              this.match(CParser.LeftParen);
              this.state = 599;
              this.functionDeclarator();
              this.state = 600;
              this.match(CParser.RightParen);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 604;
        this.match(CParser.LeftParen);
        this.state = 607;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 58, this._ctx)) {
          case 1:
            {
              this.state = 605;
              this.parameterTypeList();
            }
            break;

          case 2:
            {
              this.state = 606;
              this.identifierList();
            }
            break;
        }
        this.state = 609;
        this.match(CParser.RightParen);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public nestedParenthesesBlock(): NestedParenthesesBlockContext {
    let _localctx: NestedParenthesesBlockContext =
      new NestedParenthesesBlockContext(this._ctx, this.state);
    this.enterRule(_localctx, 102, CParser.RULE_nestedParenthesesBlock);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 618;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__0) |
                (1 << CParser.T__1) |
                (1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.T__5) |
                (1 << CParser.T__6) |
                (1 << CParser.T__7) |
                (1 << CParser.Auto) |
                (1 << CParser.Break) |
                (1 << CParser.Case) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Continue) |
                (1 << CParser.Default) |
                (1 << CParser.Do) |
                (1 << CParser.Double) |
                (1 << CParser.Else) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.For) |
                (1 << CParser.Goto) |
                (1 << CParser.If) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Return) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Sizeof - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Switch - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.While - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Alignof - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Generic - 32)) |
                (1 << (CParser.Imaginary - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)) |
                (1 << (CParser.LeftParen - 32)) |
                (1 << (CParser.LeftBracket - 32)) |
                (1 << (CParser.RightBracket - 32)) |
                (1 << (CParser.LeftBrace - 32)) |
                (1 << (CParser.RightBrace - 32)) |
                (1 << (CParser.Less - 32)) |
                (1 << (CParser.LessEqual - 32)) |
                (1 << (CParser.Greater - 32)) |
                (1 << (CParser.GreaterEqual - 32)) |
                (1 << (CParser.LeftShift - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (CParser.RightShift - 64)) |
                (1 << (CParser.Plus - 64)) |
                (1 << (CParser.PlusPlus - 64)) |
                (1 << (CParser.Minus - 64)) |
                (1 << (CParser.MinusMinus - 64)) |
                (1 << (CParser.Star - 64)) |
                (1 << (CParser.Div - 64)) |
                (1 << (CParser.Mod - 64)) |
                (1 << (CParser.And - 64)) |
                (1 << (CParser.Or - 64)) |
                (1 << (CParser.AndAnd - 64)) |
                (1 << (CParser.OrOr - 64)) |
                (1 << (CParser.Caret - 64)) |
                (1 << (CParser.Not - 64)) |
                (1 << (CParser.Tilde - 64)) |
                (1 << (CParser.Question - 64)) |
                (1 << (CParser.Colon - 64)) |
                (1 << (CParser.Semi - 64)) |
                (1 << (CParser.Comma - 64)) |
                (1 << (CParser.Assign - 64)) |
                (1 << (CParser.StarAssign - 64)) |
                (1 << (CParser.DivAssign - 64)) |
                (1 << (CParser.ModAssign - 64)) |
                (1 << (CParser.PlusAssign - 64)) |
                (1 << (CParser.MinusAssign - 64)) |
                (1 << (CParser.LeftShiftAssign - 64)) |
                (1 << (CParser.RightShiftAssign - 64)) |
                (1 << (CParser.AndAssign - 64)) |
                (1 << (CParser.XorAssign - 64)) |
                (1 << (CParser.OrAssign - 64)) |
                (1 << (CParser.Equal - 64)) |
                (1 << (CParser.NotEqual - 64)))) !==
              0) ||
          (((_la - 96) & ~0x1f) === 0 &&
            ((1 << (_la - 96)) &
              ((1 << (CParser.Arrow - 96)) |
                (1 << (CParser.Dot - 96)) |
                (1 << (CParser.Ellipsis - 96)) |
                (1 << (CParser.Identifier - 96)) |
                (1 << (CParser.Constant - 96)) |
                (1 << (CParser.DigitSequence - 96)) |
                (1 << (CParser.StringLiteral - 96)) |
                (1 << (CParser.ComplexDefine - 96)) |
                (1 << (CParser.IncludeDirective - 96)) |
                (1 << (CParser.AsmBlock - 96)) |
                (1 << (CParser.LineAfterPreprocessing - 96)) |
                (1 << (CParser.LineDirective - 96)) |
                (1 << (CParser.PragmaDirective - 96)) |
                (1 << (CParser.Whitespace - 96)) |
                (1 << (CParser.Newline - 96)) |
                (1 << (CParser.BlockComment - 96)) |
                (1 << (CParser.LineComment - 96)))) !==
              0)
        ) {
          {
            this.state = 616;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case CParser.T__0:
              case CParser.T__1:
              case CParser.T__2:
              case CParser.T__3:
              case CParser.T__4:
              case CParser.T__5:
              case CParser.T__6:
              case CParser.T__7:
              case CParser.Auto:
              case CParser.Break:
              case CParser.Case:
              case CParser.Char:
              case CParser.Const:
              case CParser.Continue:
              case CParser.Default:
              case CParser.Do:
              case CParser.Double:
              case CParser.Else:
              case CParser.Enum:
              case CParser.Extern:
              case CParser.Float:
              case CParser.For:
              case CParser.Goto:
              case CParser.If:
              case CParser.Inline:
              case CParser.Int:
              case CParser.Long:
              case CParser.Register:
              case CParser.Restrict:
              case CParser.Return:
              case CParser.Short:
              case CParser.Signed:
              case CParser.Sizeof:
              case CParser.Static:
              case CParser.Struct:
              case CParser.Switch:
              case CParser.Typedef:
              case CParser.Union:
              case CParser.Unsigned:
              case CParser.Void:
              case CParser.Volatile:
              case CParser.While:
              case CParser.Alignas:
              case CParser.Alignof:
              case CParser.Atomic:
              case CParser.Bool:
              case CParser.Complex:
              case CParser.Generic:
              case CParser.Imaginary:
              case CParser.Noreturn:
              case CParser.StaticAssert:
              case CParser.ThreadLocal:
              case CParser.LeftBracket:
              case CParser.RightBracket:
              case CParser.LeftBrace:
              case CParser.RightBrace:
              case CParser.Less:
              case CParser.LessEqual:
              case CParser.Greater:
              case CParser.GreaterEqual:
              case CParser.LeftShift:
              case CParser.RightShift:
              case CParser.Plus:
              case CParser.PlusPlus:
              case CParser.Minus:
              case CParser.MinusMinus:
              case CParser.Star:
              case CParser.Div:
              case CParser.Mod:
              case CParser.And:
              case CParser.Or:
              case CParser.AndAnd:
              case CParser.OrOr:
              case CParser.Caret:
              case CParser.Not:
              case CParser.Tilde:
              case CParser.Question:
              case CParser.Colon:
              case CParser.Semi:
              case CParser.Comma:
              case CParser.Assign:
              case CParser.StarAssign:
              case CParser.DivAssign:
              case CParser.ModAssign:
              case CParser.PlusAssign:
              case CParser.MinusAssign:
              case CParser.LeftShiftAssign:
              case CParser.RightShiftAssign:
              case CParser.AndAssign:
              case CParser.XorAssign:
              case CParser.OrAssign:
              case CParser.Equal:
              case CParser.NotEqual:
              case CParser.Arrow:
              case CParser.Dot:
              case CParser.Ellipsis:
              case CParser.Identifier:
              case CParser.Constant:
              case CParser.DigitSequence:
              case CParser.StringLiteral:
              case CParser.ComplexDefine:
              case CParser.IncludeDirective:
              case CParser.AsmBlock:
              case CParser.LineAfterPreprocessing:
              case CParser.LineDirective:
              case CParser.PragmaDirective:
              case CParser.Whitespace:
              case CParser.Newline:
              case CParser.BlockComment:
              case CParser.LineComment:
                {
                  this.state = 611;
                  _la = this._input.LA(1);
                  if (
                    _la <= 0 ||
                    _la === CParser.LeftParen ||
                    _la === CParser.RightParen
                  ) {
                    this._errHandler.recoverInline(this);
                  } else {
                    if (this._input.LA(1) === Token.EOF) {
                      this.matchedEOF = true;
                    }

                    this._errHandler.reportMatch(this);
                    this.consume();
                  }
                }
                break;
              case CParser.LeftParen:
                {
                  this.state = 612;
                  this.match(CParser.LeftParen);
                  this.state = 613;
                  this.nestedParenthesesBlock();
                  this.state = 614;
                  this.match(CParser.RightParen);
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
          }
          this.state = 620;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public pointer(): PointerContext {
    let _localctx: PointerContext = new PointerContext(this._ctx, this.state);
    this.enterRule(_localctx, 104, CParser.RULE_pointer);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 625;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 621;
              _la = this._input.LA(1);
              if (!(_la === CParser.Star || _la === CParser.Caret)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 623;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.Const ||
                _la === CParser.Restrict ||
                _la === CParser.Volatile ||
                _la === CParser.Atomic
              ) {
                {
                  this.state = 622;
                  this.typeQualifierList();
                }
              }
            }
          }
          this.state = 627;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === CParser.Star || _la === CParser.Caret);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeQualifierList(): TypeQualifierListContext {
    let _localctx: TypeQualifierListContext = new TypeQualifierListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 106, CParser.RULE_typeQualifierList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 630;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 629;
              this.typeQualifier();
            }
          }
          this.state = 632;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          _la === CParser.Const ||
          _la === CParser.Restrict ||
          _la === CParser.Volatile ||
          _la === CParser.Atomic
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameterTypeList(): ParameterTypeListContext {
    let _localctx: ParameterTypeListContext = new ParameterTypeListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 108, CParser.RULE_parameterTypeList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 634;
        this.parameterList();
        this.state = 637;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.Comma) {
          {
            this.state = 635;
            this.match(CParser.Comma);
            this.state = 636;
            this.match(CParser.Ellipsis);
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameterList(): ParameterListContext {
    let _localctx: ParameterListContext = new ParameterListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 110, CParser.RULE_parameterList);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 639;
        this.parameterDeclaration();
        this.state = 644;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 640;
                this.match(CParser.Comma);
                this.state = 641;
                this.parameterDeclaration();
              }
            }
          }
          this.state = 646;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameterDeclaration(): ParameterDeclarationContext {
    let _localctx: ParameterDeclarationContext =
      new ParameterDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 112, CParser.RULE_parameterDeclaration);
    let _la: number;
    try {
      this.state = 654;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 67, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 647;
            this.declarationSpecifiers();
            this.state = 648;
            this.declarator();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 650;
            this.declarationSpecifiers2();
            this.state = 652;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la - 53) & ~0x1f) === 0 &&
              ((1 << (_la - 53)) &
                ((1 << (CParser.LeftParen - 53)) |
                  (1 << (CParser.LeftBracket - 53)) |
                  (1 << (CParser.Star - 53)) |
                  (1 << (CParser.Caret - 53)))) !==
                0
            ) {
              {
                this.state = 651;
                this.abstractDeclarator();
              }
            }
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public identifierList(): IdentifierListContext {
    let _localctx: IdentifierListContext = new IdentifierListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 114, CParser.RULE_identifierList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 656;
        this.match(CParser.Identifier);
        this.state = 661;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 657;
              this.match(CParser.Comma);
              this.state = 658;
              this.match(CParser.Identifier);
            }
          }
          this.state = 663;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeName(): TypeNameContext {
    let _localctx: TypeNameContext = new TypeNameContext(this._ctx, this.state);
    this.enterRule(_localctx, 116, CParser.RULE_typeName);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 664;
        this.specifierQualifierList();
        this.state = 666;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la - 53) & ~0x1f) === 0 &&
          ((1 << (_la - 53)) &
            ((1 << (CParser.LeftParen - 53)) |
              (1 << (CParser.LeftBracket - 53)) |
              (1 << (CParser.Star - 53)) |
              (1 << (CParser.Caret - 53)))) !==
            0
        ) {
          {
            this.state = 665;
            this.abstractDeclarator();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public abstractDeclarator(): AbstractDeclaratorContext {
    let _localctx: AbstractDeclaratorContext = new AbstractDeclaratorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 118, CParser.RULE_abstractDeclarator);
    let _la: number;
    try {
      this.state = 673;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 71, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 668;
            this.pointer();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 670;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === CParser.Star || _la === CParser.Caret) {
              {
                this.state = 669;
                this.pointer();
              }
            }

            this.state = 672;
            this.directAbstractDeclarator(0);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public directAbstractDeclarator(): DirectAbstractDeclaratorContext;
  public directAbstractDeclarator(_p: number): DirectAbstractDeclaratorContext;
  // @RuleVersion(0)
  public directAbstractDeclarator(
    _p?: number
  ): DirectAbstractDeclaratorContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let _localctx: DirectAbstractDeclaratorContext =
      new DirectAbstractDeclaratorContext(this._ctx, _parentState);
    let _prevctx: DirectAbstractDeclaratorContext = _localctx;
    let _startState: number = 120;
    this.enterRecursionRule(
      _localctx,
      120,
      CParser.RULE_directAbstractDeclarator,
      _p
    );
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 710;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 76, this._ctx)) {
          case 1:
            {
              this.state = 676;
              this.match(CParser.LeftParen);
              this.state = 677;
              this.abstractDeclarator();
              this.state = 678;
              this.match(CParser.RightParen);
            }
            break;

          case 2:
            {
              this.state = 680;
              this.match(CParser.LeftBracket);
              this.state = 682;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.Const ||
                _la === CParser.Restrict ||
                _la === CParser.Volatile ||
                _la === CParser.Atomic
              ) {
                {
                  this.state = 681;
                  this.typeQualifierList();
                }
              }

              this.state = 685;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.T__0 ||
                _la === CParser.T__1 ||
                (((_la - 33) & ~0x1f) === 0 &&
                  ((1 << (_la - 33)) &
                    ((1 << (CParser.Sizeof - 33)) |
                      (1 << (CParser.Alignof - 33)) |
                      (1 << (CParser.Generic - 33)) |
                      (1 << (CParser.LeftParen - 33)))) !==
                    0) ||
                (((_la - 65) & ~0x1f) === 0 &&
                  ((1 << (_la - 65)) &
                    ((1 << (CParser.Plus - 65)) |
                      (1 << (CParser.PlusPlus - 65)) |
                      (1 << (CParser.Minus - 65)) |
                      (1 << (CParser.MinusMinus - 65)) |
                      (1 << (CParser.Star - 65)) |
                      (1 << (CParser.And - 65)) |
                      (1 << (CParser.Not - 65)) |
                      (1 << (CParser.Tilde - 65)))) !==
                    0) ||
                (((_la - 99) & ~0x1f) === 0 &&
                  ((1 << (_la - 99)) &
                    ((1 << (CParser.Identifier - 99)) |
                      (1 << (CParser.Constant - 99)) |
                      (1 << (CParser.StringLiteral - 99)))) !==
                    0)
              ) {
                {
                  this.state = 684;
                  this.assignmentExpression();
                }
              }

              this.state = 687;
              this.match(CParser.RightBracket);
            }
            break;

          case 3:
            {
              this.state = 688;
              this.match(CParser.LeftBracket);
              this.state = 689;
              this.match(CParser.Static);
              this.state = 691;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.Const ||
                _la === CParser.Restrict ||
                _la === CParser.Volatile ||
                _la === CParser.Atomic
              ) {
                {
                  this.state = 690;
                  this.typeQualifierList();
                }
              }

              this.state = 693;
              this.assignmentExpression();
              this.state = 694;
              this.match(CParser.RightBracket);
            }
            break;

          case 4:
            {
              this.state = 696;
              this.match(CParser.LeftBracket);
              this.state = 697;
              this.typeQualifierList();
              this.state = 698;
              this.match(CParser.Static);
              this.state = 699;
              this.assignmentExpression();
              this.state = 700;
              this.match(CParser.RightBracket);
            }
            break;

          case 5:
            {
              this.state = 702;
              this.match(CParser.LeftBracket);
              this.state = 703;
              this.match(CParser.Star);
              this.state = 704;
              this.match(CParser.RightBracket);
            }
            break;

          case 6:
            {
              this.state = 705;
              this.match(CParser.LeftParen);
              this.state = 707;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                ((_la & ~0x1f) === 0 &&
                  ((1 << _la) &
                    ((1 << CParser.T__2) |
                      (1 << CParser.T__3) |
                      (1 << CParser.T__4) |
                      (1 << CParser.Auto) |
                      (1 << CParser.Char) |
                      (1 << CParser.Const) |
                      (1 << CParser.Double) |
                      (1 << CParser.Enum) |
                      (1 << CParser.Extern) |
                      (1 << CParser.Float) |
                      (1 << CParser.Inline) |
                      (1 << CParser.Int) |
                      (1 << CParser.Long) |
                      (1 << CParser.Register) |
                      (1 << CParser.Restrict) |
                      (1 << CParser.Short))) !==
                    0) ||
                (((_la - 32) & ~0x1f) === 0 &&
                  ((1 << (_la - 32)) &
                    ((1 << (CParser.Signed - 32)) |
                      (1 << (CParser.Static - 32)) |
                      (1 << (CParser.Struct - 32)) |
                      (1 << (CParser.Typedef - 32)) |
                      (1 << (CParser.Union - 32)) |
                      (1 << (CParser.Unsigned - 32)) |
                      (1 << (CParser.Void - 32)) |
                      (1 << (CParser.Volatile - 32)) |
                      (1 << (CParser.Alignas - 32)) |
                      (1 << (CParser.Atomic - 32)) |
                      (1 << (CParser.Bool - 32)) |
                      (1 << (CParser.Complex - 32)) |
                      (1 << (CParser.Noreturn - 32)) |
                      (1 << (CParser.ThreadLocal - 32)))) !==
                    0) ||
                _la === CParser.Identifier
              ) {
                {
                  this.state = 706;
                  this.parameterTypeList();
                }
              }

              this.state = 709;
              this.match(CParser.RightParen);
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 749;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 747;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 81, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new DirectAbstractDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directAbstractDeclarator
                    );
                    this.state = 712;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)'
                      );
                    }
                    this.state = 713;
                    this.match(CParser.LeftBracket);
                    this.state = 715;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.Const ||
                      _la === CParser.Restrict ||
                      _la === CParser.Volatile ||
                      _la === CParser.Atomic
                    ) {
                      {
                        this.state = 714;
                        this.typeQualifierList();
                      }
                    }

                    this.state = 718;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.T__0 ||
                      _la === CParser.T__1 ||
                      (((_la - 33) & ~0x1f) === 0 &&
                        ((1 << (_la - 33)) &
                          ((1 << (CParser.Sizeof - 33)) |
                            (1 << (CParser.Alignof - 33)) |
                            (1 << (CParser.Generic - 33)) |
                            (1 << (CParser.LeftParen - 33)))) !==
                          0) ||
                      (((_la - 65) & ~0x1f) === 0 &&
                        ((1 << (_la - 65)) &
                          ((1 << (CParser.Plus - 65)) |
                            (1 << (CParser.PlusPlus - 65)) |
                            (1 << (CParser.Minus - 65)) |
                            (1 << (CParser.MinusMinus - 65)) |
                            (1 << (CParser.Star - 65)) |
                            (1 << (CParser.And - 65)) |
                            (1 << (CParser.Not - 65)) |
                            (1 << (CParser.Tilde - 65)))) !==
                          0) ||
                      (((_la - 99) & ~0x1f) === 0 &&
                        ((1 << (_la - 99)) &
                          ((1 << (CParser.Identifier - 99)) |
                            (1 << (CParser.Constant - 99)) |
                            (1 << (CParser.StringLiteral - 99)))) !==
                          0)
                    ) {
                      {
                        this.state = 717;
                        this.assignmentExpression();
                      }
                    }

                    this.state = 720;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 2:
                  {
                    _localctx = new DirectAbstractDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directAbstractDeclarator
                    );
                    this.state = 721;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)'
                      );
                    }
                    this.state = 722;
                    this.match(CParser.LeftBracket);
                    this.state = 723;
                    this.match(CParser.Static);
                    this.state = 725;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      _la === CParser.Const ||
                      _la === CParser.Restrict ||
                      _la === CParser.Volatile ||
                      _la === CParser.Atomic
                    ) {
                      {
                        this.state = 724;
                        this.typeQualifierList();
                      }
                    }

                    this.state = 727;
                    this.assignmentExpression();
                    this.state = 728;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 3:
                  {
                    _localctx = new DirectAbstractDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directAbstractDeclarator
                    );
                    this.state = 730;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)'
                      );
                    }
                    this.state = 731;
                    this.match(CParser.LeftBracket);
                    this.state = 732;
                    this.typeQualifierList();
                    this.state = 733;
                    this.match(CParser.Static);
                    this.state = 734;
                    this.assignmentExpression();
                    this.state = 735;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 4:
                  {
                    _localctx = new DirectAbstractDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directAbstractDeclarator
                    );
                    this.state = 737;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 2)'
                      );
                    }
                    this.state = 738;
                    this.match(CParser.LeftBracket);
                    this.state = 739;
                    this.match(CParser.Star);
                    this.state = 740;
                    this.match(CParser.RightBracket);
                  }
                  break;

                case 5:
                  {
                    _localctx = new DirectAbstractDeclaratorContext(
                      _parentctx,
                      _parentState
                    );
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      CParser.RULE_directAbstractDeclarator
                    );
                    this.state = 741;
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 1)'
                      );
                    }
                    this.state = 742;
                    this.match(CParser.LeftParen);
                    this.state = 744;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (
                      ((_la & ~0x1f) === 0 &&
                        ((1 << _la) &
                          ((1 << CParser.T__2) |
                            (1 << CParser.T__3) |
                            (1 << CParser.T__4) |
                            (1 << CParser.Auto) |
                            (1 << CParser.Char) |
                            (1 << CParser.Const) |
                            (1 << CParser.Double) |
                            (1 << CParser.Enum) |
                            (1 << CParser.Extern) |
                            (1 << CParser.Float) |
                            (1 << CParser.Inline) |
                            (1 << CParser.Int) |
                            (1 << CParser.Long) |
                            (1 << CParser.Register) |
                            (1 << CParser.Restrict) |
                            (1 << CParser.Short))) !==
                          0) ||
                      (((_la - 32) & ~0x1f) === 0 &&
                        ((1 << (_la - 32)) &
                          ((1 << (CParser.Signed - 32)) |
                            (1 << (CParser.Static - 32)) |
                            (1 << (CParser.Struct - 32)) |
                            (1 << (CParser.Typedef - 32)) |
                            (1 << (CParser.Union - 32)) |
                            (1 << (CParser.Unsigned - 32)) |
                            (1 << (CParser.Void - 32)) |
                            (1 << (CParser.Volatile - 32)) |
                            (1 << (CParser.Alignas - 32)) |
                            (1 << (CParser.Atomic - 32)) |
                            (1 << (CParser.Bool - 32)) |
                            (1 << (CParser.Complex - 32)) |
                            (1 << (CParser.Noreturn - 32)) |
                            (1 << (CParser.ThreadLocal - 32)))) !==
                          0) ||
                      _la === CParser.Identifier
                    ) {
                      {
                        this.state = 743;
                        this.parameterTypeList();
                      }
                    }

                    this.state = 746;
                    this.match(CParser.RightParen);
                  }
                  break;
              }
            }
          }
          this.state = 751;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typedefName(): TypedefNameContext {
    let _localctx: TypedefNameContext = new TypedefNameContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 122, CParser.RULE_typedefName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 752;
        this.match(CParser.Identifier);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public initializer(): InitializerContext {
    let _localctx: InitializerContext = new InitializerContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 124, CParser.RULE_initializer);
    let _la: number;
    try {
      this.state = 762;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.T__0:
        case CParser.T__1:
        case CParser.Sizeof:
        case CParser.Alignof:
        case CParser.Generic:
        case CParser.LeftParen:
        case CParser.Plus:
        case CParser.PlusPlus:
        case CParser.Minus:
        case CParser.MinusMinus:
        case CParser.Star:
        case CParser.And:
        case CParser.Not:
        case CParser.Tilde:
        case CParser.Identifier:
        case CParser.Constant:
        case CParser.StringLiteral:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 754;
            this.assignmentExpression();
          }
          break;
        case CParser.LeftBrace:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 755;
            this.match(CParser.LeftBrace);
            this.state = 756;
            this.initializerList();
            this.state = 758;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === CParser.Comma) {
              {
                this.state = 757;
                this.match(CParser.Comma);
              }
            }

            this.state = 760;
            this.match(CParser.RightBrace);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public initializerList(): InitializerListContext {
    let _localctx: InitializerListContext = new InitializerListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 126, CParser.RULE_initializerList);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 765;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === CParser.LeftBracket || _la === CParser.Dot) {
          {
            this.state = 764;
            this.designation();
          }
        }

        this.state = 767;
        this.initializer();
        this.state = 775;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 87, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 768;
                this.match(CParser.Comma);
                this.state = 770;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === CParser.LeftBracket || _la === CParser.Dot) {
                  {
                    this.state = 769;
                    this.designation();
                  }
                }

                this.state = 772;
                this.initializer();
              }
            }
          }
          this.state = 777;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 87, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public designation(): DesignationContext {
    let _localctx: DesignationContext = new DesignationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 128, CParser.RULE_designation);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 778;
        this.designatorList();
        this.state = 779;
        this.match(CParser.Assign);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public designatorList(): DesignatorListContext {
    let _localctx: DesignatorListContext = new DesignatorListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 130, CParser.RULE_designatorList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 782;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 781;
              this.designator();
            }
          }
          this.state = 784;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === CParser.LeftBracket || _la === CParser.Dot);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public designator(): DesignatorContext {
    let _localctx: DesignatorContext = new DesignatorContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 132, CParser.RULE_designator);
    try {
      this.state = 792;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.LeftBracket:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 786;
            this.match(CParser.LeftBracket);
            this.state = 787;
            this.constantExpression();
            this.state = 788;
            this.match(CParser.RightBracket);
          }
          break;
        case CParser.Dot:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 790;
            this.match(CParser.Dot);
            this.state = 791;
            this.match(CParser.Identifier);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public staticAssertDeclaration(): StaticAssertDeclarationContext {
    let _localctx: StaticAssertDeclarationContext =
      new StaticAssertDeclarationContext(this._ctx, this.state);
    this.enterRule(_localctx, 134, CParser.RULE_staticAssertDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 794;
        this.match(CParser.StaticAssert);
        this.state = 795;
        this.match(CParser.LeftParen);
        this.state = 796;
        this.constantExpression();
        this.state = 797;
        this.match(CParser.Comma);
        this.state = 799;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 798;
              this.match(CParser.StringLiteral);
            }
          }
          this.state = 801;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === CParser.StringLiteral);
        this.state = 803;
        this.match(CParser.RightParen);
        this.state = 804;
        this.match(CParser.Semi);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    let _localctx: StatementContext = new StatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 136, CParser.RULE_statement);
    let _la: number;
    try {
      this.state = 843;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 96, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 806;
            this.labeledStatement();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 807;
            this.compoundStatement();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 808;
            this.expressionStatement();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 809;
            this.selectionStatement();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 810;
            this.iterationStatement();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 811;
            this.jumpStatement();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 812;
            _la = this._input.LA(1);
            if (!(_la === CParser.T__5 || _la === CParser.T__6)) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 813;
            _la = this._input.LA(1);
            if (!(_la === CParser.T__7 || _la === CParser.Volatile)) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 814;
            this.match(CParser.LeftParen);
            this.state = 823;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              _la === CParser.T__0 ||
              _la === CParser.T__1 ||
              (((_la - 33) & ~0x1f) === 0 &&
                ((1 << (_la - 33)) &
                  ((1 << (CParser.Sizeof - 33)) |
                    (1 << (CParser.Alignof - 33)) |
                    (1 << (CParser.Generic - 33)) |
                    (1 << (CParser.LeftParen - 33)))) !==
                  0) ||
              (((_la - 65) & ~0x1f) === 0 &&
                ((1 << (_la - 65)) &
                  ((1 << (CParser.Plus - 65)) |
                    (1 << (CParser.PlusPlus - 65)) |
                    (1 << (CParser.Minus - 65)) |
                    (1 << (CParser.MinusMinus - 65)) |
                    (1 << (CParser.Star - 65)) |
                    (1 << (CParser.And - 65)) |
                    (1 << (CParser.Not - 65)) |
                    (1 << (CParser.Tilde - 65)))) !==
                  0) ||
              (((_la - 99) & ~0x1f) === 0 &&
                ((1 << (_la - 99)) &
                  ((1 << (CParser.Identifier - 99)) |
                    (1 << (CParser.Constant - 99)) |
                    (1 << (CParser.StringLiteral - 99)))) !==
                  0)
            ) {
              {
                this.state = 815;
                this.logicalOrExpression();
                this.state = 820;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === CParser.Comma) {
                  {
                    {
                      this.state = 816;
                      this.match(CParser.Comma);
                      this.state = 817;
                      this.logicalOrExpression();
                    }
                  }
                  this.state = 822;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                }
              }
            }

            this.state = 838;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === CParser.Colon) {
              {
                {
                  this.state = 825;
                  this.match(CParser.Colon);
                  this.state = 834;
                  this._errHandler.sync(this);
                  _la = this._input.LA(1);
                  if (
                    _la === CParser.T__0 ||
                    _la === CParser.T__1 ||
                    (((_la - 33) & ~0x1f) === 0 &&
                      ((1 << (_la - 33)) &
                        ((1 << (CParser.Sizeof - 33)) |
                          (1 << (CParser.Alignof - 33)) |
                          (1 << (CParser.Generic - 33)) |
                          (1 << (CParser.LeftParen - 33)))) !==
                        0) ||
                    (((_la - 65) & ~0x1f) === 0 &&
                      ((1 << (_la - 65)) &
                        ((1 << (CParser.Plus - 65)) |
                          (1 << (CParser.PlusPlus - 65)) |
                          (1 << (CParser.Minus - 65)) |
                          (1 << (CParser.MinusMinus - 65)) |
                          (1 << (CParser.Star - 65)) |
                          (1 << (CParser.And - 65)) |
                          (1 << (CParser.Not - 65)) |
                          (1 << (CParser.Tilde - 65)))) !==
                        0) ||
                    (((_la - 99) & ~0x1f) === 0 &&
                      ((1 << (_la - 99)) &
                        ((1 << (CParser.Identifier - 99)) |
                          (1 << (CParser.Constant - 99)) |
                          (1 << (CParser.StringLiteral - 99)))) !==
                        0)
                  ) {
                    {
                      this.state = 826;
                      this.logicalOrExpression();
                      this.state = 831;
                      this._errHandler.sync(this);
                      _la = this._input.LA(1);
                      while (_la === CParser.Comma) {
                        {
                          {
                            this.state = 827;
                            this.match(CParser.Comma);
                            this.state = 828;
                            this.logicalOrExpression();
                          }
                        }
                        this.state = 833;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                      }
                    }
                  }
                }
              }
              this.state = 840;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 841;
            this.match(CParser.RightParen);
            this.state = 842;
            this.match(CParser.Semi);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public labeledStatement(): LabeledStatementContext {
    let _localctx: LabeledStatementContext = new LabeledStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 138, CParser.RULE_labeledStatement);
    try {
      this.state = 856;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.Identifier:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 845;
            this.match(CParser.Identifier);
            this.state = 846;
            this.match(CParser.Colon);
            this.state = 847;
            this.statement();
          }
          break;
        case CParser.Case:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 848;
            this.match(CParser.Case);
            this.state = 849;
            this.constantExpression();
            this.state = 850;
            this.match(CParser.Colon);
            this.state = 851;
            this.statement();
          }
          break;
        case CParser.Default:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 853;
            this.match(CParser.Default);
            this.state = 854;
            this.match(CParser.Colon);
            this.state = 855;
            this.statement();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public compoundStatement(): CompoundStatementContext {
    let _localctx: CompoundStatementContext = new CompoundStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 140, CParser.RULE_compoundStatement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 858;
        this.match(CParser.LeftBrace);
        this.state = 860;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__0) |
                (1 << CParser.T__1) |
                (1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.T__5) |
                (1 << CParser.T__6) |
                (1 << CParser.Auto) |
                (1 << CParser.Break) |
                (1 << CParser.Case) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Continue) |
                (1 << CParser.Default) |
                (1 << CParser.Do) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.For) |
                (1 << CParser.Goto) |
                (1 << CParser.If) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Return) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Sizeof - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Switch - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.While - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Alignof - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Generic - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)) |
                (1 << (CParser.LeftParen - 32)) |
                (1 << (CParser.LeftBrace - 32)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.PlusPlus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.MinusMinus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)) |
                (1 << (CParser.Semi - 65)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (CParser.Identifier - 99)) |
                (1 << (CParser.Constant - 99)) |
                (1 << (CParser.StringLiteral - 99)))) !==
              0)
        ) {
          {
            this.state = 859;
            this.blockItemList();
          }
        }

        this.state = 862;
        this.match(CParser.RightBrace);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public blockItemList(): BlockItemListContext {
    let _localctx: BlockItemListContext = new BlockItemListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 142, CParser.RULE_blockItemList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 865;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 864;
              this.blockItem();
            }
          }
          this.state = 867;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__0) |
                (1 << CParser.T__1) |
                (1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.T__5) |
                (1 << CParser.T__6) |
                (1 << CParser.Auto) |
                (1 << CParser.Break) |
                (1 << CParser.Case) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Continue) |
                (1 << CParser.Default) |
                (1 << CParser.Do) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.For) |
                (1 << CParser.Goto) |
                (1 << CParser.If) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Return) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Sizeof - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Switch - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.While - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Alignof - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Generic - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)) |
                (1 << (CParser.LeftParen - 32)) |
                (1 << (CParser.LeftBrace - 32)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.PlusPlus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.MinusMinus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)) |
                (1 << (CParser.Semi - 65)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (CParser.Identifier - 99)) |
                (1 << (CParser.Constant - 99)) |
                (1 << (CParser.StringLiteral - 99)))) !==
              0)
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public blockItem(): BlockItemContext {
    let _localctx: BlockItemContext = new BlockItemContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 144, CParser.RULE_blockItem);
    try {
      this.state = 871;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 100, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 869;
            this.statement();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 870;
            this.declaration();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionStatement(): ExpressionStatementContext {
    let _localctx: ExpressionStatementContext = new ExpressionStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 146, CParser.RULE_expressionStatement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 874;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === CParser.T__0 ||
          _la === CParser.T__1 ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) &
              ((1 << (CParser.Sizeof - 33)) |
                (1 << (CParser.Alignof - 33)) |
                (1 << (CParser.Generic - 33)) |
                (1 << (CParser.LeftParen - 33)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.PlusPlus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.MinusMinus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (CParser.Identifier - 99)) |
                (1 << (CParser.Constant - 99)) |
                (1 << (CParser.StringLiteral - 99)))) !==
              0)
        ) {
          {
            this.state = 873;
            this.expression();
          }
        }

        this.state = 876;
        this.match(CParser.Semi);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public selectionStatement(): SelectionStatementContext {
    let _localctx: SelectionStatementContext = new SelectionStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 148, CParser.RULE_selectionStatement);
    try {
      this.state = 893;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.If:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 878;
            this.match(CParser.If);
            this.state = 879;
            this.match(CParser.LeftParen);
            this.state = 880;
            this.expression();
            this.state = 881;
            this.match(CParser.RightParen);
            this.state = 882;
            this.statement();
            this.state = 885;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 102, this._ctx)
            ) {
              case 1:
                {
                  this.state = 883;
                  this.match(CParser.Else);
                  this.state = 884;
                  this.statement();
                }
                break;
            }
          }
          break;
        case CParser.Switch:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 887;
            this.match(CParser.Switch);
            this.state = 888;
            this.match(CParser.LeftParen);
            this.state = 889;
            this.expression();
            this.state = 890;
            this.match(CParser.RightParen);
            this.state = 891;
            this.statement();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public iterationStatement(): IterationStatementContext {
    let _localctx: IterationStatementContext = new IterationStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 150, CParser.RULE_iterationStatement);
    try {
      this.state = 915;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case CParser.While:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 895;
            this.match(CParser.While);
            this.state = 896;
            this.match(CParser.LeftParen);
            this.state = 897;
            this.expression();
            this.state = 898;
            this.match(CParser.RightParen);
            this.state = 899;
            this.statement();
          }
          break;
        case CParser.Do:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 901;
            this.match(CParser.Do);
            this.state = 902;
            this.statement();
            this.state = 903;
            this.match(CParser.While);
            this.state = 904;
            this.match(CParser.LeftParen);
            this.state = 905;
            this.expression();
            this.state = 906;
            this.match(CParser.RightParen);
            this.state = 907;
            this.match(CParser.Semi);
          }
          break;
        case CParser.For:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 909;
            this.match(CParser.For);
            this.state = 910;
            this.match(CParser.LeftParen);
            this.state = 911;
            this.forCondition();
            this.state = 912;
            this.match(CParser.RightParen);
            this.state = 913;
            this.statement();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public forCondition(): ForConditionContext {
    let _localctx: ForConditionContext = new ForConditionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 152, CParser.RULE_forCondition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 921;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 106, this._ctx)) {
          case 1:
            {
              this.state = 917;
              this.forDeclaration();
            }
            break;

          case 2:
            {
              this.state = 919;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.T__0 ||
                _la === CParser.T__1 ||
                (((_la - 33) & ~0x1f) === 0 &&
                  ((1 << (_la - 33)) &
                    ((1 << (CParser.Sizeof - 33)) |
                      (1 << (CParser.Alignof - 33)) |
                      (1 << (CParser.Generic - 33)) |
                      (1 << (CParser.LeftParen - 33)))) !==
                    0) ||
                (((_la - 65) & ~0x1f) === 0 &&
                  ((1 << (_la - 65)) &
                    ((1 << (CParser.Plus - 65)) |
                      (1 << (CParser.PlusPlus - 65)) |
                      (1 << (CParser.Minus - 65)) |
                      (1 << (CParser.MinusMinus - 65)) |
                      (1 << (CParser.Star - 65)) |
                      (1 << (CParser.And - 65)) |
                      (1 << (CParser.Not - 65)) |
                      (1 << (CParser.Tilde - 65)))) !==
                    0) ||
                (((_la - 99) & ~0x1f) === 0 &&
                  ((1 << (_la - 99)) &
                    ((1 << (CParser.Identifier - 99)) |
                      (1 << (CParser.Constant - 99)) |
                      (1 << (CParser.StringLiteral - 99)))) !==
                    0)
              ) {
                {
                  this.state = 918;
                  this.expression();
                }
              }
            }
            break;
        }
        this.state = 923;
        this.match(CParser.Semi);
        this.state = 925;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === CParser.T__0 ||
          _la === CParser.T__1 ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) &
              ((1 << (CParser.Sizeof - 33)) |
                (1 << (CParser.Alignof - 33)) |
                (1 << (CParser.Generic - 33)) |
                (1 << (CParser.LeftParen - 33)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.PlusPlus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.MinusMinus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (CParser.Identifier - 99)) |
                (1 << (CParser.Constant - 99)) |
                (1 << (CParser.StringLiteral - 99)))) !==
              0)
        ) {
          {
            this.state = 924;
            this.forExpression();
          }
        }

        this.state = 927;
        this.match(CParser.Semi);
        this.state = 929;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          _la === CParser.T__0 ||
          _la === CParser.T__1 ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) &
              ((1 << (CParser.Sizeof - 33)) |
                (1 << (CParser.Alignof - 33)) |
                (1 << (CParser.Generic - 33)) |
                (1 << (CParser.LeftParen - 33)))) !==
              0) ||
          (((_la - 65) & ~0x1f) === 0 &&
            ((1 << (_la - 65)) &
              ((1 << (CParser.Plus - 65)) |
                (1 << (CParser.PlusPlus - 65)) |
                (1 << (CParser.Minus - 65)) |
                (1 << (CParser.MinusMinus - 65)) |
                (1 << (CParser.Star - 65)) |
                (1 << (CParser.And - 65)) |
                (1 << (CParser.Not - 65)) |
                (1 << (CParser.Tilde - 65)))) !==
              0) ||
          (((_la - 99) & ~0x1f) === 0 &&
            ((1 << (_la - 99)) &
              ((1 << (CParser.Identifier - 99)) |
                (1 << (CParser.Constant - 99)) |
                (1 << (CParser.StringLiteral - 99)))) !==
              0)
        ) {
          {
            this.state = 928;
            this.forExpression();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public forDeclaration(): ForDeclarationContext {
    let _localctx: ForDeclarationContext = new ForDeclarationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 154, CParser.RULE_forDeclaration);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 931;
        this.declarationSpecifiers();
        this.state = 933;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 53) & ~0x1f) === 0 &&
            ((1 << (_la - 53)) &
              ((1 << (CParser.LeftParen - 53)) |
                (1 << (CParser.Star - 53)) |
                (1 << (CParser.Caret - 53)))) !==
              0) ||
          _la === CParser.Identifier
        ) {
          {
            this.state = 932;
            this.initDeclaratorList();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public forExpression(): ForExpressionContext {
    let _localctx: ForExpressionContext = new ForExpressionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 156, CParser.RULE_forExpression);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 935;
        this.assignmentExpression();
        this.state = 940;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === CParser.Comma) {
          {
            {
              this.state = 936;
              this.match(CParser.Comma);
              this.state = 937;
              this.assignmentExpression();
            }
          }
          this.state = 942;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public jumpStatement(): JumpStatementContext {
    let _localctx: JumpStatementContext = new JumpStatementContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 158, CParser.RULE_jumpStatement);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 950;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case CParser.Goto:
            {
              this.state = 943;
              this.match(CParser.Goto);
              this.state = 944;
              this.match(CParser.Identifier);
            }
            break;
          case CParser.Break:
          case CParser.Continue:
            {
              this.state = 945;
              _la = this._input.LA(1);
              if (!(_la === CParser.Break || _la === CParser.Continue)) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
            }
            break;
          case CParser.Return:
            {
              this.state = 946;
              this.match(CParser.Return);
              this.state = 948;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                _la === CParser.T__0 ||
                _la === CParser.T__1 ||
                (((_la - 33) & ~0x1f) === 0 &&
                  ((1 << (_la - 33)) &
                    ((1 << (CParser.Sizeof - 33)) |
                      (1 << (CParser.Alignof - 33)) |
                      (1 << (CParser.Generic - 33)) |
                      (1 << (CParser.LeftParen - 33)))) !==
                    0) ||
                (((_la - 65) & ~0x1f) === 0 &&
                  ((1 << (_la - 65)) &
                    ((1 << (CParser.Plus - 65)) |
                      (1 << (CParser.PlusPlus - 65)) |
                      (1 << (CParser.Minus - 65)) |
                      (1 << (CParser.MinusMinus - 65)) |
                      (1 << (CParser.Star - 65)) |
                      (1 << (CParser.And - 65)) |
                      (1 << (CParser.Not - 65)) |
                      (1 << (CParser.Tilde - 65)))) !==
                    0) ||
                (((_la - 99) & ~0x1f) === 0 &&
                  ((1 << (_la - 99)) &
                    ((1 << (CParser.Identifier - 99)) |
                      (1 << (CParser.Constant - 99)) |
                      (1 << (CParser.StringLiteral - 99)))) !==
                    0)
              ) {
                {
                  this.state = 947;
                  this.expression();
                }
              }
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 952;
        this.match(CParser.Semi);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public compilationUnit(): CompilationUnitContext {
    let _localctx: CompilationUnitContext = new CompilationUnitContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 160, CParser.RULE_compilationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 955;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Auto) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)) |
                (1 << (CParser.LeftParen - 32)))) !==
              0) ||
          (((_la - 69) & ~0x1f) === 0 &&
            ((1 << (_la - 69)) &
              ((1 << (CParser.Star - 69)) |
                (1 << (CParser.Caret - 69)) |
                (1 << (CParser.Semi - 69)) |
                (1 << (CParser.Identifier - 69)))) !==
              0)
        ) {
          {
            this.state = 954;
            this.translationUnit();
          }
        }

        this.state = 957;
        this.match(CParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public translationUnit(): TranslationUnitContext {
    let _localctx: TranslationUnitContext = new TranslationUnitContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 162, CParser.RULE_translationUnit);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 960;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 959;
              this.externalDeclaration();
            }
          }
          this.state = 962;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Auto) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)) |
                (1 << (CParser.LeftParen - 32)))) !==
              0) ||
          (((_la - 69) & ~0x1f) === 0 &&
            ((1 << (_la - 69)) &
              ((1 << (CParser.Star - 69)) |
                (1 << (CParser.Caret - 69)) |
                (1 << (CParser.Semi - 69)) |
                (1 << (CParser.Identifier - 69)))) !==
              0)
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public externalDeclaration(): ExternalDeclarationContext {
    let _localctx: ExternalDeclarationContext = new ExternalDeclarationContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 164, CParser.RULE_externalDeclaration);
    try {
      this.state = 967;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 115, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 964;
            this.functionDefinition();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 965;
            this.declaration();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 966;
            this.match(CParser.Semi);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionDefinition(): FunctionDefinitionContext {
    let _localctx: FunctionDefinitionContext = new FunctionDefinitionContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 166, CParser.RULE_functionDefinition);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 970;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 116, this._ctx)) {
          case 1:
            {
              this.state = 969;
              this.declarationSpecifiers();
            }
            break;
        }
        this.state = 972;
        this.functionDeclarator();
        this.state = 974;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Auto) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)))) !==
              0) ||
          _la === CParser.Identifier
        ) {
          {
            this.state = 973;
            this.declarationList();
          }
        }

        this.state = 976;
        this.compoundStatement();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declarationList(): DeclarationListContext {
    let _localctx: DeclarationListContext = new DeclarationListContext(
      this._ctx,
      this.state
    );
    this.enterRule(_localctx, 168, CParser.RULE_declarationList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 979;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 978;
              this.declaration();
            }
          }
          this.state = 981;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << CParser.T__2) |
                (1 << CParser.T__3) |
                (1 << CParser.T__4) |
                (1 << CParser.Auto) |
                (1 << CParser.Char) |
                (1 << CParser.Const) |
                (1 << CParser.Double) |
                (1 << CParser.Enum) |
                (1 << CParser.Extern) |
                (1 << CParser.Float) |
                (1 << CParser.Inline) |
                (1 << CParser.Int) |
                (1 << CParser.Long) |
                (1 << CParser.Register) |
                (1 << CParser.Restrict) |
                (1 << CParser.Short))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (CParser.Signed - 32)) |
                (1 << (CParser.Static - 32)) |
                (1 << (CParser.Struct - 32)) |
                (1 << (CParser.Typedef - 32)) |
                (1 << (CParser.Union - 32)) |
                (1 << (CParser.Unsigned - 32)) |
                (1 << (CParser.Void - 32)) |
                (1 << (CParser.Volatile - 32)) |
                (1 << (CParser.Alignas - 32)) |
                (1 << (CParser.Atomic - 32)) |
                (1 << (CParser.Bool - 32)) |
                (1 << (CParser.Complex - 32)) |
                (1 << (CParser.Noreturn - 32)) |
                (1 << (CParser.StaticAssert - 32)) |
                (1 << (CParser.ThreadLocal - 32)))) !==
              0) ||
          _la === CParser.Identifier
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public sempred(
    _localctx: RuleContext,
    ruleIndex: number,
    predIndex: number
  ): boolean {
    switch (ruleIndex) {
      case 48:
        return this.directDeclarator_sempred(
          _localctx as DirectDeclaratorContext,
          predIndex
        );

      case 60:
        return this.directAbstractDeclarator_sempred(
          _localctx as DirectAbstractDeclaratorContext,
          predIndex
        );
    }
    return true;
  }
  private directDeclarator_sempred(
    _localctx: DirectDeclaratorContext,
    predIndex: number
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 7);

      case 1:
        return this.precpred(this._ctx, 6);

      case 2:
        return this.precpred(this._ctx, 5);

      case 3:
        return this.precpred(this._ctx, 4);

      case 4:
        return this.precpred(this._ctx, 3);

      case 5:
        return this.precpred(this._ctx, 2);
    }
    return true;
  }
  private directAbstractDeclarator_sempred(
    _localctx: DirectAbstractDeclaratorContext,
    predIndex: number
  ): boolean {
    switch (predIndex) {
      case 6:
        return this.precpred(this._ctx, 5);

      case 7:
        return this.precpred(this._ctx, 4);

      case 8:
        return this.precpred(this._ctx, 3);

      case 9:
        return this.precpred(this._ctx, 2);

      case 10:
        return this.precpred(this._ctx, 1);
    }
    return true;
  }

  private static readonly _serializedATNSegments: number = 2;
  private static readonly _serializedATNSegment0: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03r\u03DA\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044' +
    '\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04' +
    '=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04' +
    'F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04' +
    'O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x03\x02\x03' +
    '\x02\x03\x02\x06\x02\xB0\n\x02\r\x02\x0E\x02\xB1\x03\x02\x03\x02\x03\x02' +
    '\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02' +
    '\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02\xC7\n' +
    '\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03' +
    '\x04\x03\x04\x07\x04\xD3\n\x04\f\x04\x0E\x04\xD6\v\x04\x03\x05\x03\x05' +
    '\x05\x05\xDA\n\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03' +
    '\x06\x03\x06\x03\x06\x03\x06\x05\x06\xE6\n\x06\x03\x06\x03\x06\x03\x06' +
    '\x03\x06\x07\x06\xEC\n\x06\f\x06\x0E\x06\xEF\v\x06\x03\x07\x03\x07\x03' +
    '\x07\x07\x07\xF4\n\x07\f\x07\x0E\x07\xF7\v\x07\x03\b\x07\b\xFA\n\b\f\b' +
    '\x0E\b\xFD\v\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05' +
    '\b\u0108\n\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\u0112' +
    '\n\n\x03\v\x03\v\x03\v\x07\v\u0117\n\v\f\v\x0E\v\u011A\v\v\x03\f\x03\f' +
    '\x03\f\x07\f\u011F\n\f\f\f\x0E\f\u0122\v\f\x03\r\x03\r\x03\r\x07\r\u0127' +
    '\n\r\f\r\x0E\r\u012A\v\r\x03\x0E\x03\x0E\x03\x0E\x07\x0E\u012F\n\x0E\f' +
    '\x0E\x0E\x0E\u0132\v\x0E\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u0137\n\x0F\f' +
    '\x0F\x0E\x0F\u013A\v\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u013F\n\x10\f' +
    '\x10\x0E\x10\u0142\v\x10\x03\x11\x03\x11\x03\x11\x07\x11\u0147\n\x11\f' +
    '\x11\x0E\x11\u014A\v\x11\x03\x12\x03\x12\x03\x12\x07\x12\u014F\n\x12\f' +
    '\x12\x0E\x12\u0152\v\x12\x03\x13\x03\x13\x03\x13\x07\x13\u0157\n\x13\f' +
    '\x13\x0E\x13\u015A\v\x13\x03\x14\x03\x14\x03\x14\x07\x14\u015F\n\x14\f' +
    '\x14\x0E\x14\u0162\v\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x05\x15\u016A\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0171' +
    '\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x07\x18\u0178\n\x18\f\x18' +
    '\x0E\x18\u017B\v\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x05\x1A\u0181\n\x1A' +
    '\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u0186\n\x1A\x03\x1B\x06\x1B\u0189\n\x1B' +
    '\r\x1B\x0E\x1B\u018A\x03\x1C\x06\x1C\u018E\n\x1C\r\x1C\x0E\x1C\u018F\x03' +
    '\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u0197\n\x1D\x03\x1E\x03\x1E' +
    '\x03\x1E\x07\x1E\u019C\n\x1E\f\x1E\x0E\x1E\u019F\v\x1E\x03\x1F\x03\x1F' +
    '\x03\x1F\x05\x1F\u01A4\n\x1F\x03 \x03 \x03!\x03!\x03!\x03!\x03!\x05!\u01AD' +
    '\n!\x03"\x03"\x05"\u01B1\n"\x03"\x03"\x03"\x03"\x03"\x03"\x03' +
    '"\x05"\u01BA\n"\x03#\x03#\x03$\x06$\u01BF\n$\r$\x0E$\u01C0\x03%\x03' +
    '%\x03%\x03%\x03%\x03%\x03%\x03%\x05%\u01CB\n%\x03&\x03&\x05&\u01CF\n&' +
    "\x03&\x05&\u01D2\n&\x03'\x03'\x03'\x07'\u01D7\n'\f'\x0E'\u01DA" +
    "\v'\x03(\x03(\x05(\u01DE\n(\x03(\x03(\x05(\u01E2\n(\x03)\x03)\x05)\u01E6" +
    '\n)\x03)\x03)\x03)\x05)\u01EB\n)\x03)\x03)\x03)\x03)\x05)\u01F1\n)\x03' +
    '*\x03*\x03*\x07*\u01F6\n*\f*\x0E*\u01F9\v*\x03+\x03+\x03+\x05+\u01FE\n' +
    '+\x03,\x03,\x03-\x03-\x03-\x03-\x03-\x03.\x03.\x03/\x03/\x030\x030\x03' +
    '0\x030\x050\u020F\n0\x030\x030\x031\x051\u0214\n1\x031\x031\x032\x032' +
    '\x032\x032\x032\x032\x032\x032\x032\x052\u0221\n2\x032\x032\x032\x052' +
    '\u0226\n2\x032\x052\u0229\n2\x032\x032\x032\x032\x032\x052\u0230\n2\x03' +
    '2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u023F' +
    '\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u024B\n2\x03' +
    '2\x072\u024E\n2\f2\x0E2\u0251\v2\x033\x053\u0254\n3\x033\x033\x034\x03' +
    '4\x034\x034\x034\x054\u025D\n4\x034\x034\x034\x054\u0262\n4\x034\x034' +
    '\x035\x035\x035\x035\x035\x075\u026B\n5\f5\x0E5\u026E\v5\x036\x036\x05' +
    '6\u0272\n6\x066\u0274\n6\r6\x0E6\u0275\x037\x067\u0279\n7\r7\x0E7\u027A' +
    '\x038\x038\x038\x058\u0280\n8\x039\x039\x039\x079\u0285\n9\f9\x0E9\u0288' +
    '\v9\x03:\x03:\x03:\x03:\x03:\x05:\u028F\n:\x05:\u0291\n:\x03;\x03;\x03' +
    ';\x07;\u0296\n;\f;\x0E;\u0299\v;\x03<\x03<\x05<\u029D\n<\x03=\x03=\x05' +
    '=\u02A1\n=\x03=\x05=\u02A4\n=\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x05>' +
    '\u02AD\n>\x03>\x05>\u02B0\n>\x03>\x03>\x03>\x03>\x05>\u02B6\n>\x03>\x03' +
    '>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x05>\u02C6' +
    '\n>\x03>\x05>\u02C9\n>\x03>\x03>\x03>\x05>\u02CE\n>\x03>\x05>\u02D1\n' +
    '>\x03>\x03>\x03>\x03>\x03>\x05>\u02D8\n>\x03>\x03>\x03>\x03>\x03>\x03' +
    '>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x03>\x05>\u02EB\n' +
    '>\x03>\x07>\u02EE\n>\f>\x0E>\u02F1\v>\x03?\x03?\x03@\x03@\x03@\x03@\x05' +
    '@\u02F9\n@\x03@\x03@\x05@\u02FD\n@\x03A\x05A\u0300\nA\x03A\x03A\x03A\x05' +
    'A\u0305\nA\x03A\x07A\u0308\nA\fA\x0EA\u030B\vA\x03B\x03B\x03B\x03C\x06' +
    'C\u0311\nC\rC\x0EC\u0312\x03D\x03D\x03D\x03D\x03D\x03D\x05D\u031B\nD\x03' +
    'E\x03E\x03E\x03E\x03E\x06E\u0322\nE\rE\x0EE\u0323\x03E\x03E\x03E\x03F' +
    '\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x07F\u0335\nF' +
    '\fF\x0EF\u0338\vF\x05F\u033A\nF\x03F\x03F\x03F\x03F\x07F\u0340\nF\fF\x0E' +
    'F\u0343\vF\x05F\u0345\nF\x07F\u0347\nF\fF\x0EF\u034A\vF\x03F\x03F\x05' +
    'F\u034E\nF\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x05' +
    'G\u035B\nG\x03H\x03H\x05H\u035F\nH\x03H\x03H\x03I\x06I\u0364\nI\rI\x0E' +
    'I\u0365\x03J\x03J\x05J\u036A\nJ\x03K\x05K\u036D\nK\x03K\x03K\x03L\x03' +
    'L\x03L\x03L\x03L\x03L\x03L\x05L\u0378\nL\x03L\x03L\x03L\x03L\x03L\x03' +
    'L\x05L\u0380\nL\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03' +
    'M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x05M\u0396\nM\x03N\x03' +
    'N\x05N\u039A\nN\x05N\u039C\nN\x03N\x03N\x05N\u03A0\nN\x03N\x03N\x05N\u03A4' +
    '\nN\x03O\x03O\x05O\u03A8\nO\x03P\x03P\x03P\x07P\u03AD\nP\fP\x0EP\u03B0' +
    '\vP\x03Q\x03Q\x03Q\x03Q\x03Q\x05Q\u03B7\nQ\x05Q\u03B9\nQ\x03Q\x03Q\x03' +
    'R\x05R\u03BE\nR\x03R\x03R\x03S\x06S\u03C3\nS\rS\x0ES\u03C4\x03T\x03T\x03' +
    'T\x05T\u03CA\nT\x03U\x05U\u03CD\nU\x03U\x03U\x05U\u03D1\nU\x03U\x03U\x03' +
    'V\x06V\u03D6\nV\rV\x0EV\u03D7\x03V\x02\x02\x04bzW\x02\x02\x04\x02\x06' +
    '\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02' +
    '\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x02' +
    '2\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02' +
    'N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02' +
    'j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02' +
    '\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02' +
    '\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02' +
    '\xA8\x02\xAA\x02\x02\x17\x03\x02bc\x04\x02DDFF\x05\x02##DDFF\x04\x02#' +
    '#..\x07\x02CCEEGGJJOP\x03\x02GI\x04\x02CCEE\x03\x02AB\x03\x02=@\x03\x02' +
    "`a\x03\x02U_\b\x02\v\v\x16\x16\x1E\x1E$$''66\n\x02\x05\x07\x0E\x0E\x13" +
    '\x13\x17\x17\x1C\x1D!")*01\x04\x02%%((\x06\x02\x0F\x0F\x1F\x1F++//\x04' +
    '\x02\x1B\x1B44\x03\x0278\x04\x02GGNN\x03\x02\b\t\x04\x02\n\n++\x04\x02' +
    '\f\f\x10\x10\x02\u0420\x02\xC6\x03\x02\x02\x02\x04\xC8\x03\x02\x02\x02' +
    '\x06\xCF\x03\x02\x02\x02\b\xD9\x03\x02\x02\x02\n\xDE\x03\x02\x02\x02\f' +
    '\xF0\x03\x02\x02\x02\x0E\xFB\x03\x02\x02\x02\x10\u0109\x03\x02\x02\x02' +
    '\x12\u0111\x03\x02\x02\x02\x14\u0113\x03\x02\x02\x02\x16\u011B\x03\x02' +
    '\x02\x02\x18\u0123\x03\x02\x02\x02\x1A\u012B\x03\x02\x02\x02\x1C\u0133' +
    '\x03\x02\x02\x02\x1E\u013B\x03\x02\x02\x02 \u0143\x03\x02\x02\x02"\u014B' +
    '\x03\x02\x02\x02$\u0153\x03\x02\x02\x02&\u015B\x03\x02\x02\x02(\u0163' +
    '\x03\x02\x02\x02*\u0170\x03\x02\x02\x02,\u0172\x03\x02\x02\x02.\u0174' +
    '\x03\x02\x02\x020\u017C\x03\x02\x02\x022\u0185\x03\x02\x02\x024\u0188' +
    '\x03\x02\x02\x026\u018D\x03\x02\x02\x028\u0196\x03\x02\x02\x02:\u0198' +
    '\x03\x02\x02\x02<\u01A0\x03\x02\x02\x02>\u01A5\x03\x02\x02\x02@\u01AC' +
    '\x03\x02\x02\x02B\u01B9\x03\x02\x02\x02D\u01BB\x03\x02\x02\x02F\u01BE' +
    '\x03\x02\x02\x02H\u01CA\x03\x02\x02\x02J\u01CE\x03\x02\x02\x02L\u01D3' +
    '\x03\x02\x02\x02N\u01E1\x03\x02\x02\x02P\u01F0\x03\x02\x02\x02R\u01F2' +
    '\x03\x02\x02\x02T\u01FA\x03\x02\x02\x02V\u01FF\x03\x02\x02\x02X\u0201' +
    '\x03\x02\x02\x02Z\u0206\x03\x02\x02\x02\\\u0208\x03\x02\x02\x02^\u020A' +
    '\x03\x02\x02\x02`\u0213\x03\x02\x02\x02b\u0220\x03\x02\x02\x02d\u0253' +
    '\x03\x02\x02\x02f\u025C\x03\x02\x02\x02h\u026C\x03\x02\x02\x02j\u0273' +
    '\x03\x02\x02\x02l\u0278\x03\x02\x02\x02n\u027C\x03\x02\x02\x02p\u0281' +
    '\x03\x02\x02\x02r\u0290\x03\x02\x02\x02t\u0292\x03\x02\x02\x02v\u029A' +
    '\x03\x02\x02\x02x\u02A3\x03\x02\x02\x02z\u02C8\x03\x02\x02\x02|\u02F2' +
    '\x03\x02\x02\x02~\u02FC\x03\x02\x02\x02\x80\u02FF\x03\x02\x02\x02\x82' +
    '\u030C\x03\x02\x02\x02\x84\u0310\x03\x02\x02\x02\x86\u031A\x03\x02\x02' +
    '\x02\x88\u031C\x03\x02\x02\x02\x8A\u034D\x03\x02\x02\x02\x8C\u035A\x03' +
    '\x02\x02\x02\x8E\u035C\x03\x02\x02\x02\x90\u0363\x03\x02\x02\x02\x92\u0369' +
    '\x03\x02\x02\x02\x94\u036C\x03\x02\x02\x02\x96\u037F\x03\x02\x02\x02\x98' +
    '\u0395\x03\x02\x02\x02\x9A\u039B\x03\x02\x02\x02\x9C\u03A5\x03\x02\x02' +
    '\x02\x9E\u03A9\x03\x02\x02\x02\xA0\u03B8\x03\x02\x02\x02\xA2\u03BD\x03' +
    '\x02\x02\x02\xA4\u03C2\x03\x02\x02\x02\xA6\u03C9\x03\x02\x02\x02\xA8\u03CC' +
    '\x03\x02\x02\x02\xAA\u03D5\x03\x02\x02\x02\xAC\xC7\x07e\x02\x02\xAD\xC7' +
    '\x07f\x02\x02\xAE\xB0\x07h\x02\x02\xAF\xAE\x03\x02\x02\x02\xB0\xB1\x03' +
    '\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB1\xB2\x03\x02\x02\x02\xB2\xC7\x03' +
    '\x02\x02\x02\xB3\xB4\x077\x02\x02\xB4\xB5\x05.\x18\x02\xB5\xB6\x078\x02' +
    '\x02\xB6\xC7\x03\x02\x02\x02\xB7\xC7\x05\x04\x03\x02\xB8\xB9\x07\x03\x02' +
    '\x02\xB9\xBA\x077\x02\x02\xBA\xBB\x05\x0E\b\x02\xBB\xBC\x07T\x02\x02\xBC' +
    '\xBD\x05v<\x02\xBD\xBE\x078\x02\x02\xBE\xC7\x03\x02\x02\x02\xBF\xC0\x07' +
    '\x04\x02\x02\xC0\xC1\x077\x02\x02\xC1\xC2\x05v<\x02\xC2\xC3\x07T\x02\x02' +
    '\xC3\xC4\x05\x0E\b\x02\xC4\xC5\x078\x02\x02\xC5\xC7\x03\x02\x02\x02\xC6' +
    '\xAC\x03\x02\x02\x02\xC6\xAD\x03\x02\x02\x02\xC6\xAF\x03\x02\x02\x02\xC6' +
    '\xB3\x03\x02\x02\x02\xC6\xB7\x03\x02\x02\x02\xC6\xB8\x03\x02\x02\x02\xC6' +
    '\xBF\x03\x02\x02\x02\xC7\x03\x03\x02\x02\x02\xC8\xC9\x072\x02\x02\xC9' +
    '\xCA\x077\x02\x02\xCA\xCB\x05*\x16\x02\xCB\xCC\x07T\x02\x02\xCC\xCD\x05' +
    '\x06\x04\x02\xCD\xCE\x078\x02\x02\xCE\x05\x03\x02\x02\x02\xCF\xD4\x05' +
    '\b\x05\x02\xD0\xD1\x07T\x02\x02\xD1\xD3\x05\b\x05\x02\xD2\xD0\x03\x02' +
    '\x02\x02\xD3\xD6\x03\x02\x02\x02\xD4\xD2\x03\x02\x02\x02\xD4\xD5\x03\x02' +
    '\x02\x02\xD5\x07\x03\x02\x02\x02\xD6\xD4\x03\x02\x02\x02\xD7\xDA\x05v' +
    '<\x02\xD8\xDA\x07\x11\x02\x02\xD9\xD7\x03\x02\x02\x02\xD9\xD8\x03\x02' +
    '\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\xDC\x07R\x02\x02\xDC\xDD\x05*\x16' +
    '\x02\xDD\t\x03\x02\x02\x02\xDE\xED\x05\x02\x02\x02\xDF\xE0\x079\x02\x02' +
    '\xE0\xE1\x05.\x18\x02\xE1\xE2\x07:\x02\x02\xE2\xEC\x03\x02\x02\x02\xE3' +
    '\xE5\x077\x02\x02\xE4\xE6\x05\f\x07\x02\xE5\xE4\x03\x02\x02\x02\xE5\xE6' +
    '\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7\xEC\x078\x02\x02\xE8\xE9' +
    '\t\x02\x02\x02\xE9\xEC\x07e\x02\x02\xEA\xEC\t\x03\x02\x02\xEB\xDF\x03' +
    '\x02\x02\x02\xEB\xE3\x03\x02\x02\x02\xEB\xE8\x03\x02\x02\x02\xEB\xEA\x03' +
    '\x02\x02\x02\xEC\xEF\x03\x02\x02\x02\xED\xEB\x03\x02\x02\x02\xED\xEE\x03' +
    '\x02\x02\x02\xEE\v\x03\x02\x02\x02\xEF\xED\x03\x02\x02\x02\xF0\xF5\x05' +
    '*\x16\x02\xF1\xF2\x07T\x02\x02\xF2\xF4\x05*\x16\x02\xF3\xF1\x03\x02\x02' +
    '\x02\xF4\xF7\x03\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03\x02\x02' +
    '\x02\xF6\r\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xFA\t\x04\x02\x02' +
    '\xF9\xF8\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02' +
    '\xFB\xFC\x03\x02\x02\x02\xFC\u0107\x03\x02\x02\x02\xFD\xFB\x03\x02\x02' +
    '\x02\xFE\u0108\x05\n\x06\x02\xFF\u0100\x05\x10\t\x02\u0100\u0101\x05\x12' +
    '\n\x02\u0101\u0108\x03\x02\x02\x02\u0102\u0103\t\x05\x02\x02\u0103\u0104' +
    '\x077\x02\x02\u0104\u0105\x05v<\x02\u0105\u0106\x078\x02\x02\u0106\u0108' +
    '\x03\x02\x02\x02\u0107\xFE\x03\x02\x02\x02\u0107\xFF\x03\x02\x02\x02\u0107' +
    '\u0102\x03\x02\x02\x02\u0108\x0F\x03\x02\x02\x02\u0109\u010A\t\x06\x02' +
    '\x02\u010A\x11\x03\x02\x02\x02\u010B\u010C\x077\x02\x02\u010C\u010D\x05' +
    'v<\x02\u010D\u010E\x078\x02\x02\u010E\u010F\x05\x12\n\x02\u010F\u0112' +
    '\x03\x02\x02\x02\u0110\u0112\x05\x0E\b\x02\u0111\u010B\x03\x02\x02\x02' +
    '\u0111\u0110\x03\x02\x02\x02\u0112\x13\x03\x02\x02\x02\u0113\u0118\x05' +
    '\x12\n\x02\u0114\u0115\t\x07\x02\x02\u0115\u0117\x05\x12\n\x02\u0116\u0114' +
    '\x03\x02\x02\x02\u0117\u011A\x03\x02\x02\x02\u0118\u0116\x03\x02\x02\x02' +
    '\u0118\u0119\x03\x02\x02\x02\u0119\x15\x03\x02\x02\x02\u011A\u0118\x03' +
    '\x02\x02\x02\u011B\u0120\x05\x14\v\x02\u011C\u011D\t\b\x02\x02\u011D\u011F' +
    '\x05\x14\v\x02\u011E\u011C\x03\x02\x02\x02\u011F\u0122\x03\x02\x02\x02' +
    '\u0120\u011E\x03\x02\x02\x02\u0120\u0121\x03\x02\x02\x02\u0121\x17\x03' +
    '\x02\x02\x02\u0122\u0120\x03\x02\x02\x02\u0123\u0128\x05\x16\f\x02\u0124' +
    '\u0125\t\t\x02\x02\u0125\u0127\x05\x16\f\x02\u0126\u0124\x03\x02\x02\x02' +
    '\u0127\u012A\x03\x02\x02\x02\u0128\u0126\x03\x02\x02\x02\u0128\u0129\x03' +
    '\x02\x02\x02\u0129\x19\x03\x02\x02\x02\u012A\u0128\x03\x02\x02\x02\u012B' +
    '\u0130\x05\x18\r\x02\u012C\u012D\t\n\x02\x02\u012D\u012F\x05\x18\r\x02' +
    '\u012E\u012C\x03\x02\x02\x02\u012F\u0132\x03\x02\x02\x02\u0130\u012E\x03' +
    '\x02\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131\x1B\x03\x02\x02\x02\u0132' +
    '\u0130\x03\x02\x02\x02\u0133\u0138\x05\x1A\x0E\x02\u0134\u0135\t\v\x02' +
    '\x02\u0135\u0137\x05\x1A\x0E\x02\u0136\u0134\x03\x02\x02\x02\u0137\u013A' +
    '\x03\x02\x02\x02\u0138\u0136\x03\x02\x02\x02\u0138\u0139\x03\x02\x02\x02' +
    '\u0139\x1D\x03\x02\x02\x02\u013A\u0138\x03\x02\x02\x02\u013B\u0140\x05' +
    '\x1C\x0F\x02\u013C\u013D\x07J\x02\x02\u013D\u013F\x05\x1C\x0F\x02\u013E' +
    '\u013C\x03\x02\x02\x02\u013F\u0142\x03\x02\x02\x02\u0140\u013E\x03\x02' +
    '\x02\x02\u0140\u0141\x03\x02\x02\x02\u0141\x1F\x03\x02\x02\x02\u0142\u0140' +
    '\x03\x02\x02\x02\u0143\u0148\x05\x1E\x10\x02\u0144\u0145\x07N\x02\x02' +
    '\u0145\u0147\x05\x1E\x10\x02\u0146\u0144\x03\x02\x02\x02\u0147\u014A\x03' +
    '\x02\x02\x02\u0148\u0146\x03\x02\x02\x02\u0148\u0149\x03\x02\x02\x02\u0149' +
    '!\x03\x02\x02\x02\u014A\u0148\x03\x02\x02\x02\u014B\u0150\x05 \x11\x02' +
    '\u014C\u014D\x07K\x02\x02\u014D\u014F\x05 \x11\x02\u014E\u014C\x03\x02' +
    '\x02\x02\u014F\u0152\x03\x02\x02\x02\u0150\u014E\x03\x02\x02\x02\u0150' +
    '\u0151\x03\x02\x02\x02\u0151#\x03\x02\x02\x02\u0152\u0150\x03\x02\x02' +
    '\x02\u0153\u0158\x05"\x12\x02\u0154\u0155\x07L\x02\x02\u0155\u0157\x05' +
    '"\x12\x02\u0156\u0154\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158' +
    '\u0156\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159%\x03\x02\x02' +
    '\x02\u015A\u0158\x03\x02\x02\x02\u015B\u0160\x05$\x13\x02\u015C\u015D' +
    '\x07M\x02\x02\u015D\u015F\x05$\x13\x02\u015E\u015C\x03\x02\x02\x02\u015F' +
    '\u0162\x03\x02\x02\x02\u0160\u015E\x03\x02\x02\x02\u0160\u0161\x03\x02' +
    "\x02\x02\u0161'\x03\x02\x02\x02\u0162\u0160\x03\x02\x02\x02\u0163\u0169" +
    '\x05&\x14\x02\u0164\u0165\x07Q\x02\x02\u0165\u0166\x05.\x18\x02\u0166' +
    '\u0167\x07R\x02\x02\u0167\u0168\x05(\x15\x02\u0168\u016A\x03\x02\x02\x02' +
    '\u0169\u0164\x03\x02\x02\x02\u0169\u016A\x03\x02\x02\x02\u016A)\x03\x02' +
    '\x02\x02\u016B\u0171\x05(\x15\x02\u016C\u016D\x05\x0E\b\x02\u016D\u016E' +
    '\x05,\x17\x02\u016E\u016F\x05*\x16\x02\u016F\u0171\x03\x02\x02\x02\u0170' +
    '\u016B\x03\x02\x02\x02\u0170\u016C\x03\x02\x02\x02\u0171+\x03\x02\x02' +
    '\x02\u0172\u0173\t\f\x02\x02\u0173-\x03\x02\x02\x02\u0174\u0179\x05*\x16' +
    '\x02\u0175\u0176\x07T\x02\x02\u0176\u0178\x05*\x16\x02\u0177\u0175\x03' +
    '\x02\x02\x02\u0178\u017B\x03\x02\x02\x02\u0179\u0177\x03\x02\x02\x02\u0179' +
    '\u017A\x03\x02\x02\x02\u017A/\x03\x02\x02\x02\u017B\u0179\x03\x02\x02' +
    '\x02\u017C\u017D\x05(\x15\x02\u017D1\x03\x02\x02\x02\u017E\u0180\x054' +
    '\x1B\x02\u017F\u0181\x05:\x1E\x02\u0180\u017F\x03\x02\x02\x02\u0180\u0181' +
    '\x03\x02\x02\x02\u0181\u0182\x03\x02\x02\x02\u0182\u0183\x07S\x02\x02' +
    '\u0183\u0186\x03\x02\x02\x02\u0184\u0186\x05\x88E\x02\u0185\u017E\x03' +
    '\x02\x02\x02\u0185\u0184\x03\x02\x02\x02\u01863\x03\x02\x02\x02\u0187' +
    '\u0189\x058\x1D\x02\u0188\u0187\x03\x02\x02\x02\u0189\u018A\x03\x02\x02' +
    '\x02\u018A\u0188\x03\x02\x02\x02\u018A\u018B\x03\x02\x02\x02\u018B5\x03' +
    '\x02\x02\x02\u018C\u018E\x058\x1D\x02\u018D\u018C\x03\x02\x02\x02\u018E' +
    '\u018F\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02\u018F\u0190\x03\x02' +
    '\x02\x02\u01907\x03\x02\x02\x02\u0191\u0197\x05> \x02\u0192\u0197\x05' +
    '@!\x02\u0193\u0197\x05Z.\x02\u0194\u0197\x05\\/\x02\u0195\u0197\x05^0' +
    '\x02\u0196\u0191\x03\x02\x02\x02\u0196\u0192\x03\x02\x02\x02\u0196\u0193' +
    '\x03\x02\x02\x02\u0196\u0194\x03\x02\x02\x02\u0196\u0195\x03\x02\x02\x02' +
    '\u01979\x03\x02\x02\x02\u0198\u019D\x05<\x1F\x02\u0199\u019A\x07T\x02' +
    '\x02\u019A\u019C\x05<\x1F\x02\u019B\u0199\x03\x02\x02\x02\u019C\u019F' +
    '\x03\x02\x02\x02\u019D\u019B\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02' +
    '\u019E;\x03\x02\x02\x02\u019F\u019D\x03\x02\x02\x02\u01A0\u01A3\x05`1' +
    '\x02\u01A1\u01A2\x07U\x02\x02\u01A2\u01A4\x05~@\x02\u01A3\u01A1\x03\x02' +
    '\x02\x02\u01A3\u01A4\x03\x02\x02\x02\u01A4=\x03\x02\x02\x02\u01A5\u01A6' +
    '\t\r\x02\x02\u01A6?\x03\x02\x02\x02\u01A7\u01AD\t\x0E\x02\x02\u01A8\u01AD' +
    '\x05X-\x02\u01A9\u01AD\x05B"\x02\u01AA\u01AD\x05P)\x02\u01AB\u01AD\x05' +
    '|?\x02\u01AC\u01A7\x03\x02\x02\x02\u01AC\u01A8\x03\x02\x02\x02\u01AC\u01A9' +
    '\x03\x02\x02\x02\u01AC\u01AA\x03\x02\x02\x02\u01AC\u01AB\x03\x02\x02\x02' +
    '\u01ADA\x03\x02\x02\x02\u01AE\u01B0\x05D#\x02\u01AF\u01B1\x07e\x02\x02' +
    '\u01B0\u01AF\x03\x02\x02\x02\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B2\x03' +
    '\x02\x02\x02\u01B2\u01B3\x07;\x02\x02\u01B3\u01B4\x05F$\x02\u01B4\u01B5' +
    '\x07<\x02\x02\u01B5\u01BA\x03\x02\x02\x02\u01B6\u01B7\x05D#\x02\u01B7' +
    '\u01B8\x07e\x02\x02\u01B8\u01BA\x03\x02\x02\x02\u01B9\u01AE\x03\x02\x02' +
    '\x02\u01B9\u01B6\x03\x02\x02\x02\u01BAC\x03\x02\x02\x02\u01BB\u01BC\t' +
    '\x0F\x02\x02\u01BCE\x03\x02\x02\x02\u01BD\u01BF\x05H%\x02\u01BE\u01BD' +
    '\x03\x02\x02\x02\u01BF\u01C0\x03\x02\x02\x02\u01C0\u01BE\x03\x02\x02\x02' +
    '\u01C0\u01C1\x03\x02\x02\x02\u01C1G\x03\x02\x02\x02\u01C2\u01C3\x05J&' +
    "\x02\u01C3\u01C4\x05L'\x02\u01C4\u01C5\x07S\x02\x02\u01C5\u01CB\x03\x02" +
    '\x02\x02\u01C6\u01C7\x05J&\x02\u01C7\u01C8\x07S\x02\x02\u01C8\u01CB\x03' +
    '\x02\x02\x02\u01C9\u01CB\x05\x88E\x02\u01CA\u01C2\x03\x02\x02\x02\u01CA' +
    '\u01C6\x03\x02\x02\x02\u01CA\u01C9\x03\x02\x02\x02\u01CBI\x03\x02\x02' +
    '\x02';
  private static readonly _serializedATNSegment1: string =
    '\u01CC\u01CF\x05@!\x02\u01CD\u01CF\x05Z.\x02\u01CE\u01CC\x03\x02\x02\x02' +
    '\u01CE\u01CD\x03\x02\x02\x02\u01CF\u01D1\x03\x02\x02\x02\u01D0\u01D2\x05' +
    'J&\x02\u01D1\u01D0\x03\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2K' +
    '\x03\x02\x02\x02\u01D3\u01D8\x05N(\x02\u01D4\u01D5\x07T\x02\x02\u01D5' +
    '\u01D7\x05N(\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7\u01DA\x03\x02\x02\x02' +
    '\u01D8\u01D6\x03\x02\x02\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9M\x03\x02' +
    '\x02\x02\u01DA\u01D8\x03\x02\x02\x02\u01DB\u01E2\x05`1\x02\u01DC\u01DE' +
    '\x05`1\x02\u01DD\u01DC\x03\x02\x02\x02\u01DD\u01DE\x03\x02\x02\x02\u01DE' +
    '\u01DF\x03\x02\x02\x02\u01DF\u01E0\x07R\x02\x02\u01E0\u01E2\x050\x19\x02' +
    '\u01E1\u01DB\x03\x02\x02\x02\u01E1\u01DD\x03\x02\x02\x02\u01E2O\x03\x02' +
    '\x02\x02\u01E3\u01E5\x07\x15\x02\x02\u01E4\u01E6\x07e\x02\x02\u01E5\u01E4' +
    '\x03\x02\x02\x02\u01E5\u01E6\x03\x02\x02\x02\u01E6\u01E7\x03\x02\x02\x02' +
    '\u01E7\u01E8\x07;\x02\x02\u01E8\u01EA\x05R*\x02\u01E9\u01EB\x07T\x02\x02' +
    '\u01EA\u01E9\x03\x02\x02\x02\u01EA\u01EB\x03\x02\x02\x02\u01EB\u01EC\x03' +
    '\x02\x02\x02\u01EC\u01ED\x07<\x02\x02\u01ED\u01F1\x03\x02\x02\x02\u01EE' +
    '\u01EF\x07\x15\x02\x02\u01EF\u01F1\x07e\x02\x02\u01F0\u01E3\x03\x02\x02' +
    '\x02\u01F0\u01EE\x03\x02\x02\x02\u01F1Q\x03\x02\x02\x02\u01F2\u01F7\x05' +
    'T+\x02\u01F3\u01F4\x07T\x02\x02\u01F4\u01F6\x05T+\x02\u01F5\u01F3\x03' +
    '\x02\x02\x02\u01F6\u01F9\x03\x02\x02\x02\u01F7\u01F5\x03\x02\x02\x02\u01F7' +
    '\u01F8\x03\x02\x02\x02\u01F8S\x03\x02\x02\x02\u01F9\u01F7\x03\x02\x02' +
    '\x02\u01FA\u01FD\x05V,\x02\u01FB\u01FC\x07U\x02\x02\u01FC\u01FE\x050\x19' +
    '\x02\u01FD\u01FB\x03\x02\x02\x02\u01FD\u01FE\x03\x02\x02\x02\u01FEU\x03' +
    '\x02\x02\x02\u01FF\u0200\x07e\x02\x02\u0200W\x03\x02\x02\x02\u0201\u0202' +
    '\x07/\x02\x02\u0202\u0203\x077\x02\x02\u0203\u0204\x05v<\x02\u0204\u0205' +
    '\x078\x02\x02\u0205Y\x03\x02\x02\x02\u0206\u0207\t\x10\x02\x02\u0207[' +
    '\x03\x02\x02\x02\u0208\u0209\t\x11\x02\x02\u0209]\x03\x02\x02\x02\u020A' +
    '\u020B\x07-\x02\x02\u020B\u020E\x077\x02\x02\u020C\u020F\x05v<\x02\u020D' +
    '\u020F\x050\x19\x02\u020E\u020C\x03\x02\x02\x02\u020E\u020D\x03\x02\x02' +
    '\x02\u020F\u0210\x03\x02\x02\x02\u0210\u0211\x078\x02\x02\u0211_\x03\x02' +
    '\x02\x02\u0212\u0214\x05j6\x02\u0213\u0212\x03\x02\x02\x02\u0213\u0214' +
    '\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215\u0216\x05b2\x02\u0216' +
    'a\x03\x02\x02\x02\u0217\u0218\b2\x01\x02\u0218\u0221\x07e\x02\x02\u0219' +
    '\u021A\x077\x02\x02\u021A\u021B\x05`1\x02\u021B\u021C\x078\x02\x02\u021C' +
    '\u0221\x03\x02\x02\x02\u021D\u021E\x07e\x02\x02\u021E\u021F\x07R\x02\x02' +
    '\u021F\u0221\x07g\x02\x02\u0220\u0217\x03\x02\x02\x02\u0220\u0219\x03' +
    '\x02\x02\x02\u0220\u021D\x03\x02\x02\x02\u0221\u024F\x03\x02\x02\x02\u0222' +
    '\u0223\f\t\x02\x02\u0223\u0225\x079\x02\x02\u0224\u0226\x05l7\x02\u0225' +
    '\u0224\x03\x02\x02\x02\u0225\u0226\x03\x02\x02\x02\u0226\u0228\x03\x02' +
    '\x02\x02\u0227\u0229\x05*\x16\x02\u0228\u0227\x03\x02\x02\x02\u0228\u0229' +
    '\x03\x02\x02\x02\u0229\u022A\x03\x02\x02\x02\u022A\u024E\x07:\x02\x02' +
    '\u022B\u022C\f\b\x02\x02\u022C\u022D\x079\x02\x02\u022D\u022F\x07$\x02' +
    '\x02\u022E\u0230\x05l7\x02\u022F\u022E\x03\x02\x02\x02\u022F\u0230\x03' +
    '\x02\x02\x02\u0230\u0231\x03\x02\x02\x02\u0231\u0232\x05*\x16\x02\u0232' +
    '\u0233\x07:\x02\x02\u0233\u024E\x03\x02\x02\x02\u0234\u0235\f\x07\x02' +
    '\x02\u0235\u0236\x079\x02\x02\u0236\u0237\x05l7\x02\u0237\u0238\x07$\x02' +
    '\x02\u0238\u0239\x05*\x16\x02\u0239\u023A\x07:\x02\x02\u023A\u024E\x03' +
    '\x02\x02\x02\u023B\u023C\f\x06\x02\x02\u023C\u023E\x079\x02\x02\u023D' +
    '\u023F\x05l7\x02\u023E\u023D\x03\x02\x02\x02\u023E\u023F\x03\x02\x02\x02' +
    '\u023F\u0240\x03\x02\x02\x02\u0240\u0241\x07G\x02\x02\u0241\u024E\x07' +
    ':\x02\x02\u0242\u0243\f\x05\x02\x02\u0243\u0244\x077\x02\x02\u0244\u0245' +
    '\x05n8\x02\u0245\u0246\x078\x02\x02\u0246\u024E\x03\x02\x02\x02\u0247' +
    '\u0248\f\x04\x02\x02\u0248\u024A\x077\x02\x02\u0249\u024B\x05t;\x02\u024A' +
    '\u0249\x03\x02\x02\x02\u024A\u024B\x03\x02\x02\x02\u024B\u024C\x03\x02' +
    '\x02\x02\u024C\u024E\x078\x02\x02\u024D\u0222\x03\x02\x02\x02\u024D\u022B' +
    '\x03\x02\x02\x02\u024D\u0234\x03\x02\x02\x02\u024D\u023B\x03\x02\x02\x02' +
    '\u024D\u0242\x03\x02\x02\x02\u024D\u0247\x03\x02\x02\x02\u024E\u0251\x03' +
    '\x02\x02\x02\u024F\u024D\x03\x02\x02\x02\u024F\u0250\x03\x02\x02\x02\u0250' +
    'c\x03\x02\x02\x02\u0251\u024F\x03\x02\x02\x02\u0252\u0254\x05j6\x02\u0253' +
    '\u0252\x03\x02\x02\x02\u0253\u0254\x03\x02\x02\x02\u0254\u0255\x03\x02' +
    '\x02\x02\u0255\u0256\x05f4\x02\u0256e\x03\x02\x02\x02\u0257\u025D\x07' +
    'e\x02\x02\u0258\u0259\x077\x02\x02\u0259\u025A\x05d3\x02\u025A\u025B\x07' +
    '8\x02\x02\u025B\u025D\x03\x02\x02\x02\u025C\u0257\x03\x02\x02\x02\u025C' +
    '\u0258\x03\x02\x02\x02\u025D\u025E\x03\x02\x02\x02\u025E\u0261\x077\x02' +
    '\x02\u025F\u0262\x05n8\x02\u0260\u0262\x05t;\x02\u0261\u025F\x03\x02\x02' +
    '\x02\u0261\u0260\x03\x02\x02\x02\u0261\u0262\x03\x02\x02\x02\u0262\u0263' +
    '\x03\x02\x02\x02\u0263\u0264\x078\x02\x02\u0264g\x03\x02\x02\x02\u0265' +
    '\u026B\n\x12\x02\x02\u0266\u0267\x077\x02\x02\u0267\u0268\x05h5\x02\u0268' +
    '\u0269\x078\x02\x02\u0269\u026B\x03\x02\x02\x02\u026A\u0265\x03\x02\x02' +
    '\x02\u026A\u0266\x03\x02\x02\x02\u026B\u026E\x03\x02\x02\x02\u026C\u026A' +
    '\x03\x02\x02\x02\u026C\u026D\x03\x02\x02\x02\u026Di\x03\x02\x02\x02\u026E' +
    '\u026C\x03\x02\x02\x02\u026F\u0271\t\x13\x02\x02\u0270\u0272\x05l7\x02' +
    '\u0271\u0270\x03\x02\x02\x02\u0271\u0272\x03\x02\x02\x02\u0272\u0274\x03' +
    '\x02\x02\x02\u0273\u026F\x03\x02\x02\x02\u0274\u0275\x03\x02\x02\x02\u0275' +
    '\u0273\x03\x02\x02\x02\u0275\u0276\x03\x02\x02\x02\u0276k\x03\x02\x02' +
    '\x02\u0277\u0279\x05Z.\x02\u0278\u0277\x03\x02\x02\x02\u0279\u027A\x03' +
    '\x02\x02\x02\u027A\u0278\x03\x02\x02\x02\u027A\u027B\x03\x02\x02\x02\u027B' +
    'm\x03\x02\x02\x02\u027C\u027F\x05p9\x02\u027D\u027E\x07T\x02\x02\u027E' +
    '\u0280\x07d\x02\x02\u027F\u027D\x03\x02\x02\x02\u027F\u0280\x03\x02\x02' +
    '\x02\u0280o\x03\x02\x02\x02\u0281\u0286\x05r:\x02\u0282\u0283\x07T\x02' +
    '\x02\u0283\u0285\x05r:\x02\u0284\u0282\x03\x02\x02\x02\u0285\u0288\x03' +
    '\x02\x02\x02\u0286\u0284\x03\x02\x02\x02\u0286\u0287\x03\x02\x02\x02\u0287' +
    'q\x03\x02\x02\x02\u0288\u0286\x03\x02\x02\x02\u0289\u028A\x054\x1B\x02' +
    '\u028A\u028B\x05`1\x02\u028B\u0291\x03\x02\x02\x02\u028C\u028E\x056\x1C' +
    '\x02\u028D\u028F\x05x=\x02\u028E\u028D\x03\x02\x02\x02\u028E\u028F\x03' +
    '\x02\x02\x02\u028F\u0291\x03\x02\x02\x02\u0290\u0289\x03\x02\x02\x02\u0290' +
    '\u028C\x03\x02\x02\x02\u0291s\x03\x02\x02\x02\u0292\u0297\x07e\x02\x02' +
    '\u0293\u0294\x07T\x02\x02\u0294\u0296\x07e\x02\x02\u0295\u0293\x03\x02' +
    '\x02\x02\u0296\u0299\x03\x02\x02\x02\u0297\u0295\x03\x02\x02\x02\u0297' +
    '\u0298\x03\x02\x02\x02\u0298u\x03\x02\x02\x02\u0299\u0297\x03\x02\x02' +
    '\x02\u029A\u029C\x05J&\x02\u029B\u029D\x05x=\x02\u029C\u029B\x03\x02\x02' +
    '\x02\u029C\u029D\x03\x02\x02\x02\u029Dw\x03\x02\x02\x02\u029E\u02A4\x05' +
    'j6\x02\u029F\u02A1\x05j6\x02\u02A0\u029F\x03\x02\x02\x02\u02A0\u02A1\x03' +
    '\x02\x02\x02\u02A1\u02A2\x03\x02\x02\x02\u02A2\u02A4\x05z>\x02\u02A3\u029E' +
    '\x03\x02\x02\x02\u02A3\u02A0\x03\x02\x02\x02\u02A4y\x03\x02\x02\x02\u02A5' +
    '\u02A6\b>\x01\x02\u02A6\u02A7\x077\x02\x02\u02A7\u02A8\x05x=\x02\u02A8' +
    '\u02A9\x078\x02\x02\u02A9\u02C9\x03\x02\x02\x02\u02AA\u02AC\x079\x02\x02' +
    '\u02AB\u02AD\x05l7\x02\u02AC\u02AB\x03\x02\x02\x02\u02AC\u02AD\x03\x02' +
    '\x02\x02\u02AD\u02AF\x03\x02\x02\x02\u02AE\u02B0\x05*\x16\x02\u02AF\u02AE' +
    '\x03\x02\x02\x02\u02AF\u02B0\x03\x02\x02\x02\u02B0\u02B1\x03\x02\x02\x02' +
    '\u02B1\u02C9\x07:\x02\x02\u02B2\u02B3\x079\x02\x02\u02B3\u02B5\x07$\x02' +
    '\x02\u02B4\u02B6\x05l7\x02\u02B5\u02B4\x03\x02\x02\x02\u02B5\u02B6\x03' +
    '\x02\x02\x02\u02B6\u02B7\x03\x02\x02\x02\u02B7\u02B8\x05*\x16\x02\u02B8' +
    '\u02B9\x07:\x02\x02\u02B9\u02C9\x03\x02\x02\x02\u02BA\u02BB\x079\x02\x02' +
    '\u02BB\u02BC\x05l7\x02\u02BC\u02BD\x07$\x02\x02\u02BD\u02BE\x05*\x16\x02' +
    '\u02BE\u02BF\x07:\x02\x02\u02BF\u02C9\x03\x02\x02\x02\u02C0\u02C1\x07' +
    '9\x02\x02\u02C1\u02C2\x07G\x02\x02\u02C2\u02C9\x07:\x02\x02\u02C3\u02C5' +
    '\x077\x02\x02\u02C4\u02C6\x05n8\x02\u02C5\u02C4\x03\x02\x02\x02\u02C5' +
    '\u02C6\x03\x02\x02\x02\u02C6\u02C7\x03\x02\x02\x02\u02C7\u02C9\x078\x02' +
    '\x02\u02C8\u02A5\x03\x02\x02\x02\u02C8\u02AA\x03\x02\x02\x02\u02C8\u02B2' +
    '\x03\x02\x02\x02\u02C8\u02BA\x03\x02\x02\x02\u02C8\u02C0\x03\x02\x02\x02' +
    '\u02C8\u02C3\x03\x02\x02\x02\u02C9\u02EF\x03\x02\x02\x02\u02CA\u02CB\f' +
    '\x07\x02\x02\u02CB\u02CD\x079\x02\x02\u02CC\u02CE\x05l7\x02\u02CD\u02CC' +
    '\x03\x02\x02\x02\u02CD\u02CE\x03\x02\x02\x02\u02CE\u02D0\x03\x02\x02\x02' +
    '\u02CF\u02D1\x05*\x16\x02\u02D0\u02CF\x03\x02\x02\x02\u02D0\u02D1\x03' +
    '\x02\x02\x02\u02D1\u02D2\x03\x02\x02\x02\u02D2\u02EE\x07:\x02\x02\u02D3' +
    '\u02D4\f\x06\x02\x02\u02D4\u02D5\x079\x02\x02\u02D5\u02D7\x07$\x02\x02' +
    '\u02D6\u02D8\x05l7\x02\u02D7\u02D6\x03\x02\x02\x02\u02D7\u02D8\x03\x02' +
    '\x02\x02\u02D8\u02D9\x03\x02\x02\x02\u02D9\u02DA\x05*\x16\x02\u02DA\u02DB' +
    '\x07:\x02\x02\u02DB\u02EE\x03\x02\x02\x02\u02DC\u02DD\f\x05\x02\x02\u02DD' +
    '\u02DE\x079\x02\x02\u02DE\u02DF\x05l7\x02\u02DF\u02E0\x07$\x02\x02\u02E0' +
    '\u02E1\x05*\x16\x02\u02E1\u02E2\x07:\x02\x02\u02E2\u02EE\x03\x02\x02\x02' +
    '\u02E3\u02E4\f\x04\x02\x02\u02E4\u02E5\x079\x02\x02\u02E5\u02E6\x07G\x02' +
    '\x02\u02E6\u02EE\x07:\x02\x02\u02E7\u02E8\f\x03\x02\x02\u02E8\u02EA\x07' +
    '7\x02\x02\u02E9\u02EB\x05n8\x02\u02EA\u02E9\x03\x02\x02\x02\u02EA\u02EB' +
    '\x03\x02\x02\x02\u02EB\u02EC\x03\x02\x02\x02\u02EC\u02EE\x078\x02\x02' +
    '\u02ED\u02CA\x03\x02\x02\x02\u02ED\u02D3\x03\x02\x02\x02\u02ED\u02DC\x03' +
    '\x02\x02\x02\u02ED\u02E3\x03\x02\x02\x02\u02ED\u02E7\x03\x02\x02\x02\u02EE' +
    '\u02F1\x03\x02\x02\x02\u02EF\u02ED\x03\x02\x02\x02\u02EF\u02F0\x03\x02' +
    '\x02\x02\u02F0{\x03\x02\x02\x02\u02F1\u02EF\x03\x02\x02\x02\u02F2\u02F3' +
    '\x07e\x02\x02\u02F3}\x03\x02\x02\x02\u02F4\u02FD\x05*\x16\x02\u02F5\u02F6' +
    '\x07;\x02\x02\u02F6\u02F8\x05\x80A\x02\u02F7\u02F9\x07T\x02\x02\u02F8' +
    '\u02F7\x03\x02\x02\x02\u02F8\u02F9\x03\x02\x02\x02\u02F9\u02FA\x03\x02' +
    '\x02\x02\u02FA\u02FB\x07<\x02\x02\u02FB\u02FD\x03\x02\x02\x02\u02FC\u02F4' +
    '\x03\x02\x02\x02\u02FC\u02F5\x03\x02\x02\x02\u02FD\x7F\x03\x02\x02\x02' +
    '\u02FE\u0300\x05\x82B\x02\u02FF\u02FE\x03\x02\x02\x02\u02FF\u0300\x03' +
    '\x02\x02\x02\u0300\u0301\x03\x02\x02\x02\u0301\u0309\x05~@\x02\u0302\u0304' +
    '\x07T\x02\x02\u0303\u0305\x05\x82B\x02\u0304\u0303\x03\x02\x02\x02\u0304' +
    '\u0305\x03\x02\x02\x02\u0305\u0306\x03\x02\x02\x02\u0306\u0308\x05~@\x02' +
    '\u0307\u0302\x03\x02\x02\x02\u0308\u030B\x03\x02\x02\x02\u0309\u0307\x03' +
    '\x02\x02\x02\u0309\u030A\x03\x02\x02\x02\u030A\x81\x03\x02\x02\x02\u030B' +
    '\u0309\x03\x02\x02\x02\u030C\u030D\x05\x84C\x02\u030D\u030E\x07U\x02\x02' +
    '\u030E\x83\x03\x02\x02\x02\u030F\u0311\x05\x86D\x02\u0310\u030F\x03\x02' +
    '\x02\x02\u0311\u0312\x03\x02\x02\x02\u0312\u0310\x03\x02\x02\x02\u0312' +
    '\u0313\x03\x02\x02\x02\u0313\x85\x03\x02\x02\x02\u0314\u0315\x079\x02' +
    '\x02\u0315\u0316\x050\x19\x02\u0316\u0317\x07:\x02\x02\u0317\u031B\x03' +
    '\x02\x02\x02\u0318\u0319\x07c\x02\x02\u0319\u031B\x07e\x02\x02\u031A\u0314' +
    '\x03\x02\x02\x02\u031A\u0318\x03\x02\x02\x02\u031B\x87\x03\x02\x02\x02' +
    '\u031C\u031D\x075\x02\x02\u031D\u031E\x077\x02\x02\u031E\u031F\x050\x19' +
    '\x02\u031F\u0321\x07T\x02\x02\u0320\u0322\x07h\x02\x02\u0321\u0320\x03' +
    '\x02\x02\x02\u0322\u0323\x03\x02\x02\x02\u0323\u0321\x03\x02\x02\x02\u0323' +
    '\u0324\x03\x02\x02\x02\u0324\u0325\x03\x02\x02\x02\u0325\u0326\x078\x02' +
    '\x02\u0326\u0327\x07S\x02\x02\u0327\x89\x03\x02\x02\x02\u0328\u034E\x05' +
    '\x8CG\x02\u0329\u034E\x05\x8EH\x02\u032A\u034E\x05\x94K\x02\u032B\u034E' +
    '\x05\x96L\x02\u032C\u034E\x05\x98M\x02\u032D\u034E\x05\xA0Q\x02\u032E' +
    '\u032F\t\x14\x02\x02\u032F\u0330\t\x15\x02\x02\u0330\u0339\x077\x02\x02' +
    '\u0331\u0336\x05&\x14\x02\u0332\u0333\x07T\x02\x02\u0333\u0335\x05&\x14' +
    '\x02\u0334\u0332\x03\x02\x02\x02\u0335\u0338\x03\x02\x02\x02\u0336\u0334' +
    '\x03\x02\x02\x02\u0336\u0337\x03\x02\x02\x02\u0337\u033A\x03\x02\x02\x02' +
    '\u0338\u0336\x03\x02\x02\x02\u0339\u0331\x03\x02\x02\x02\u0339\u033A\x03' +
    '\x02\x02\x02\u033A\u0348\x03\x02\x02\x02\u033B\u0344\x07R\x02\x02\u033C' +
    '\u0341\x05&\x14\x02\u033D\u033E\x07T\x02\x02\u033E\u0340\x05&\x14\x02' +
    '\u033F\u033D\x03\x02\x02\x02\u0340\u0343\x03\x02\x02\x02\u0341\u033F\x03' +
    '\x02\x02\x02\u0341\u0342\x03\x02\x02\x02\u0342\u0345\x03\x02\x02\x02\u0343' +
    '\u0341\x03\x02\x02\x02\u0344\u033C\x03\x02\x02\x02\u0344\u0345\x03\x02' +
    '\x02\x02\u0345\u0347\x03\x02\x02\x02\u0346\u033B\x03\x02\x02\x02\u0347' +
    '\u034A\x03\x02\x02\x02\u0348\u0346\x03\x02\x02\x02\u0348\u0349\x03\x02' +
    '\x02\x02\u0349\u034B\x03\x02\x02\x02\u034A\u0348\x03\x02\x02\x02\u034B' +
    '\u034C\x078\x02\x02\u034C\u034E\x07S\x02\x02\u034D\u0328\x03\x02\x02\x02' +
    '\u034D\u0329\x03\x02\x02\x02\u034D\u032A\x03\x02\x02\x02\u034D\u032B\x03' +
    '\x02\x02\x02\u034D\u032C\x03\x02\x02\x02\u034D\u032D\x03\x02\x02\x02\u034D' +
    '\u032E\x03\x02\x02\x02\u034E\x8B\x03\x02\x02\x02\u034F\u0350\x07e\x02' +
    '\x02\u0350\u0351\x07R\x02\x02\u0351\u035B\x05\x8AF\x02\u0352\u0353\x07' +
    '\r\x02\x02\u0353\u0354\x050\x19\x02\u0354\u0355\x07R\x02\x02\u0355\u0356' +
    '\x05\x8AF\x02\u0356\u035B\x03\x02\x02\x02\u0357\u0358\x07\x11\x02\x02' +
    '\u0358\u0359\x07R\x02\x02\u0359\u035B\x05\x8AF\x02\u035A\u034F\x03\x02' +
    '\x02\x02\u035A\u0352\x03\x02\x02\x02\u035A\u0357\x03\x02\x02\x02\u035B' +
    '\x8D\x03\x02\x02\x02\u035C\u035E\x07;\x02\x02\u035D\u035F\x05\x90I\x02' +
    '\u035E\u035D\x03\x02\x02\x02\u035E\u035F\x03\x02\x02\x02\u035F\u0360\x03' +
    '\x02\x02\x02\u0360\u0361\x07<\x02\x02\u0361\x8F\x03\x02\x02\x02\u0362' +
    '\u0364\x05\x92J\x02\u0363\u0362\x03\x02\x02\x02\u0364\u0365\x03\x02\x02' +
    '\x02\u0365\u0363\x03\x02\x02\x02\u0365\u0366\x03\x02\x02\x02\u0366\x91' +
    '\x03\x02\x02\x02\u0367\u036A\x05\x8AF\x02\u0368\u036A\x052\x1A\x02\u0369' +
    '\u0367\x03\x02\x02\x02\u0369\u0368\x03\x02\x02\x02\u036A\x93\x03\x02\x02' +
    '\x02\u036B\u036D\x05.\x18\x02\u036C\u036B\x03\x02\x02\x02\u036C\u036D' +
    '\x03\x02\x02\x02\u036D\u036E\x03\x02\x02\x02\u036E\u036F\x07S\x02\x02' +
    '\u036F\x95\x03\x02\x02\x02\u0370\u0371\x07\x1A\x02\x02\u0371\u0372\x07' +
    '7\x02\x02\u0372\u0373\x05.\x18\x02\u0373\u0374\x078\x02\x02\u0374\u0377' +
    '\x05\x8AF\x02\u0375\u0376\x07\x14\x02\x02\u0376\u0378\x05\x8AF\x02\u0377' +
    '\u0375\x03\x02\x02\x02\u0377\u0378\x03\x02\x02\x02\u0378\u0380\x03\x02' +
    '\x02\x02\u0379\u037A\x07&\x02\x02\u037A\u037B\x077\x02\x02\u037B\u037C' +
    '\x05.\x18\x02\u037C\u037D\x078\x02\x02\u037D\u037E\x05\x8AF\x02\u037E' +
    '\u0380\x03\x02\x02\x02\u037F\u0370\x03\x02\x02\x02\u037F\u0379\x03\x02' +
    '\x02\x02\u0380\x97\x03\x02\x02\x02\u0381\u0382\x07,\x02\x02\u0382\u0383' +
    '\x077\x02\x02\u0383\u0384\x05.\x18\x02\u0384\u0385\x078\x02\x02\u0385' +
    '\u0386\x05\x8AF\x02\u0386\u0396\x03\x02\x02\x02\u0387\u0388\x07\x12\x02' +
    '\x02\u0388\u0389\x05\x8AF\x02\u0389\u038A\x07,\x02\x02\u038A\u038B\x07' +
    '7\x02\x02\u038B\u038C\x05.\x18\x02\u038C\u038D\x078\x02\x02\u038D\u038E' +
    '\x07S\x02\x02\u038E\u0396\x03\x02\x02\x02\u038F\u0390\x07\x18\x02\x02' +
    '\u0390\u0391\x077\x02\x02\u0391\u0392\x05\x9AN\x02\u0392\u0393\x078\x02' +
    '\x02\u0393\u0394\x05\x8AF\x02\u0394\u0396\x03\x02\x02\x02\u0395\u0381' +
    '\x03\x02\x02\x02\u0395\u0387\x03\x02\x02\x02\u0395\u038F\x03\x02\x02\x02' +
    '\u0396\x99\x03\x02\x02\x02\u0397\u039C\x05\x9CO\x02\u0398\u039A\x05.\x18' +
    '\x02\u0399\u0398\x03\x02\x02\x02\u0399\u039A\x03\x02\x02\x02\u039A\u039C' +
    '\x03\x02\x02\x02\u039B\u0397\x03\x02\x02\x02\u039B\u0399\x03\x02\x02\x02' +
    '\u039C\u039D\x03\x02\x02\x02\u039D\u039F\x07S\x02\x02\u039E\u03A0\x05' +
    '\x9EP\x02\u039F\u039E\x03\x02\x02\x02\u039F\u03A0\x03\x02\x02\x02\u03A0' +
    '\u03A1\x03\x02\x02\x02\u03A1\u03A3\x07S\x02\x02\u03A2\u03A4\x05\x9EP\x02' +
    '\u03A3\u03A2\x03\x02\x02\x02\u03A3\u03A4\x03\x02\x02\x02\u03A4\x9B\x03' +
    '\x02\x02\x02\u03A5\u03A7\x054\x1B\x02\u03A6\u03A8\x05:\x1E\x02\u03A7\u03A6' +
    '\x03\x02\x02\x02\u03A7\u03A8\x03\x02\x02\x02\u03A8\x9D\x03\x02\x02\x02' +
    '\u03A9\u03AE\x05*\x16\x02\u03AA\u03AB\x07T\x02\x02\u03AB\u03AD\x05*\x16' +
    '\x02\u03AC\u03AA\x03\x02\x02\x02\u03AD\u03B0\x03\x02\x02\x02\u03AE\u03AC' +
    '\x03\x02\x02\x02\u03AE\u03AF\x03\x02\x02\x02\u03AF\x9F\x03\x02\x02\x02' +
    '\u03B0\u03AE\x03\x02\x02\x02\u03B1\u03B2\x07\x19\x02\x02\u03B2\u03B9\x07' +
    'e\x02\x02\u03B3\u03B9\t\x16\x02\x02\u03B4\u03B6\x07 \x02\x02\u03B5\u03B7' +
    '\x05.\x18\x02\u03B6\u03B5\x03\x02\x02\x02\u03B6\u03B7\x03\x02\x02\x02' +
    '\u03B7\u03B9\x03\x02\x02\x02\u03B8\u03B1\x03\x02\x02\x02\u03B8\u03B3\x03' +
    '\x02\x02\x02\u03B8\u03B4\x03\x02\x02\x02\u03B9\u03BA\x03\x02\x02\x02\u03BA' +
    '\u03BB\x07S\x02\x02\u03BB\xA1\x03\x02\x02\x02\u03BC\u03BE\x05\xA4S\x02' +
    '\u03BD\u03BC\x03\x02\x02\x02\u03BD\u03BE\x03\x02\x02\x02\u03BE\u03BF\x03' +
    '\x02\x02\x02\u03BF\u03C0\x07\x02\x02\x03\u03C0\xA3\x03\x02\x02\x02\u03C1' +
    '\u03C3\x05\xA6T\x02\u03C2\u03C1\x03\x02\x02\x02\u03C3\u03C4\x03\x02\x02' +
    '\x02\u03C4\u03C2\x03\x02\x02\x02\u03C4\u03C5\x03\x02\x02\x02\u03C5\xA5' +
    '\x03\x02\x02\x02\u03C6\u03CA\x05\xA8U\x02\u03C7\u03CA\x052\x1A\x02\u03C8' +
    '\u03CA\x07S\x02\x02\u03C9\u03C6\x03\x02\x02\x02\u03C9\u03C7\x03\x02\x02' +
    '\x02\u03C9\u03C8\x03\x02\x02\x02\u03CA\xA7\x03\x02\x02\x02\u03CB\u03CD' +
    '\x054\x1B\x02\u03CC\u03CB\x03\x02\x02\x02\u03CC\u03CD\x03\x02\x02\x02' +
    '\u03CD\u03CE\x03\x02\x02\x02\u03CE\u03D0\x05d3\x02\u03CF\u03D1\x05\xAA' +
    'V\x02\u03D0\u03CF\x03\x02\x02\x02\u03D0\u03D1\x03\x02\x02\x02\u03D1\u03D2' +
    '\x03\x02\x02\x02\u03D2\u03D3\x05\x8EH\x02\u03D3\xA9\x03\x02\x02\x02\u03D4' +
    '\u03D6\x052\x1A\x02\u03D5\u03D4\x03\x02\x02\x02\u03D6\u03D7\x03\x02\x02' +
    '\x02\u03D7\u03D5\x03\x02\x02\x02\u03D7\u03D8\x03\x02\x02\x02\u03D8\xAB' +
    '\x03\x02\x02\x02y\xB1\xC6\xD4\xD9\xE5\xEB\xED\xF5\xFB\u0107\u0111\u0118' +
    '\u0120\u0128\u0130\u0138\u0140\u0148\u0150\u0158\u0160\u0169\u0170\u0179' +
    '\u0180\u0185\u018A\u018F\u0196\u019D\u01A3\u01AC\u01B0\u01B9\u01C0\u01CA' +
    '\u01CE\u01D1\u01D8\u01DD\u01E1\u01E5\u01EA\u01F0\u01F7\u01FD\u020E\u0213' +
    '\u0220\u0225\u0228\u022F\u023E\u024A\u024D\u024F\u0253\u025C\u0261\u026A' +
    '\u026C\u0271\u0275\u027A\u027F\u0286\u028E\u0290\u0297\u029C\u02A0\u02A3' +
    '\u02AC\u02AF\u02B5\u02C5\u02C8\u02CD\u02D0\u02D7\u02EA\u02ED\u02EF\u02F8' +
    '\u02FC\u02FF\u0304\u0309\u0312\u031A\u0323\u0336\u0339\u0341\u0344\u0348' +
    '\u034D\u035A\u035E\u0365\u0369\u036C\u0377\u037F\u0395\u0399\u039B\u039F' +
    '\u03A3\u03A7\u03AE\u03B6\u03B8\u03BD\u03C4\u03C9\u03CC\u03D0\u03D7';
  public static readonly _serializedATN: string = Utils.join(
    [CParser._serializedATNSegment0, CParser._serializedATNSegment1],
    ''
  );
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!CParser.__ATN) {
      CParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(CParser._serializedATN)
      );
    }

    return CParser.__ATN;
  }
}

export class PrimaryExpressionContext extends ParserRuleContext {
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public Constant(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Constant, 0);
  }
  public StringLiteral(): TerminalNode[];
  public StringLiteral(i: number): TerminalNode;
  public StringLiteral(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.StringLiteral);
    } else {
      return this.getToken(CParser.StringLiteral, i);
    }
  }
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public genericSelection(): GenericSelectionContext | undefined {
    return this.tryGetRuleContext(0, GenericSelectionContext);
  }
  public unaryExpression(): UnaryExpressionContext | undefined {
    return this.tryGetRuleContext(0, UnaryExpressionContext);
  }
  public Comma(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Comma, 0);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_primaryExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterPrimaryExpression) {
      listener.enterPrimaryExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitPrimaryExpression) {
      listener.exitPrimaryExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitPrimaryExpression) {
      return visitor.visitPrimaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GenericSelectionContext extends ParserRuleContext {
  public Generic(): TerminalNode {
    return this.getToken(CParser.Generic, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public assignmentExpression(): AssignmentExpressionContext {
    return this.getRuleContext(0, AssignmentExpressionContext);
  }
  public Comma(): TerminalNode {
    return this.getToken(CParser.Comma, 0);
  }
  public genericAssocList(): GenericAssocListContext {
    return this.getRuleContext(0, GenericAssocListContext);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_genericSelection;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterGenericSelection) {
      listener.enterGenericSelection(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitGenericSelection) {
      listener.exitGenericSelection(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitGenericSelection) {
      return visitor.visitGenericSelection(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GenericAssocListContext extends ParserRuleContext {
  public genericAssociation(): GenericAssociationContext[];
  public genericAssociation(i: number): GenericAssociationContext;
  public genericAssociation(
    i?: number
  ): GenericAssociationContext | GenericAssociationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(GenericAssociationContext);
    } else {
      return this.getRuleContext(i, GenericAssociationContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_genericAssocList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterGenericAssocList) {
      listener.enterGenericAssocList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitGenericAssocList) {
      listener.exitGenericAssocList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitGenericAssocList) {
      return visitor.visitGenericAssocList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GenericAssociationContext extends ParserRuleContext {
  public Colon(): TerminalNode {
    return this.getToken(CParser.Colon, 0);
  }
  public assignmentExpression(): AssignmentExpressionContext {
    return this.getRuleContext(0, AssignmentExpressionContext);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  public Default(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Default, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_genericAssociation;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterGenericAssociation) {
      listener.enterGenericAssociation(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitGenericAssociation) {
      listener.exitGenericAssociation(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitGenericAssociation) {
      return visitor.visitGenericAssociation(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PostfixExpressionContext extends ParserRuleContext {
  public primaryExpression(): PrimaryExpressionContext {
    return this.getRuleContext(0, PrimaryExpressionContext);
  }
  public LeftBracket(): TerminalNode[];
  public LeftBracket(i: number): TerminalNode;
  public LeftBracket(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LeftBracket);
    } else {
      return this.getToken(CParser.LeftBracket, i);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public RightBracket(): TerminalNode[];
  public RightBracket(i: number): TerminalNode;
  public RightBracket(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.RightBracket);
    } else {
      return this.getToken(CParser.RightBracket, i);
    }
  }
  public LeftParen(): TerminalNode[];
  public LeftParen(i: number): TerminalNode;
  public LeftParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LeftParen);
    } else {
      return this.getToken(CParser.LeftParen, i);
    }
  }
  public RightParen(): TerminalNode[];
  public RightParen(i: number): TerminalNode;
  public RightParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.RightParen);
    } else {
      return this.getToken(CParser.RightParen, i);
    }
  }
  public Identifier(): TerminalNode[];
  public Identifier(i: number): TerminalNode;
  public Identifier(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Identifier);
    } else {
      return this.getToken(CParser.Identifier, i);
    }
  }
  public Dot(): TerminalNode[];
  public Dot(i: number): TerminalNode;
  public Dot(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Dot);
    } else {
      return this.getToken(CParser.Dot, i);
    }
  }
  public Arrow(): TerminalNode[];
  public Arrow(i: number): TerminalNode;
  public Arrow(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Arrow);
    } else {
      return this.getToken(CParser.Arrow, i);
    }
  }
  public PlusPlus(): TerminalNode[];
  public PlusPlus(i: number): TerminalNode;
  public PlusPlus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.PlusPlus);
    } else {
      return this.getToken(CParser.PlusPlus, i);
    }
  }
  public MinusMinus(): TerminalNode[];
  public MinusMinus(i: number): TerminalNode;
  public MinusMinus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.MinusMinus);
    } else {
      return this.getToken(CParser.MinusMinus, i);
    }
  }
  public argumentExpressionList(): ArgumentExpressionListContext[];
  public argumentExpressionList(i: number): ArgumentExpressionListContext;
  public argumentExpressionList(
    i?: number
  ): ArgumentExpressionListContext | ArgumentExpressionListContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ArgumentExpressionListContext);
    } else {
      return this.getRuleContext(i, ArgumentExpressionListContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_postfixExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterPostfixExpression) {
      listener.enterPostfixExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitPostfixExpression) {
      listener.exitPostfixExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitPostfixExpression) {
      return visitor.visitPostfixExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArgumentExpressionListContext extends ParserRuleContext {
  public assignmentExpression(): AssignmentExpressionContext[];
  public assignmentExpression(i: number): AssignmentExpressionContext;
  public assignmentExpression(
    i?: number
  ): AssignmentExpressionContext | AssignmentExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AssignmentExpressionContext);
    } else {
      return this.getRuleContext(i, AssignmentExpressionContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_argumentExpressionList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterArgumentExpressionList) {
      listener.enterArgumentExpressionList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitArgumentExpressionList) {
      listener.exitArgumentExpressionList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitArgumentExpressionList) {
      return visitor.visitArgumentExpressionList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class UnaryExpressionContext extends ParserRuleContext {
  public postfixExpression(): PostfixExpressionContext | undefined {
    return this.tryGetRuleContext(0, PostfixExpressionContext);
  }
  public unaryOperator(): UnaryOperatorContext | undefined {
    return this.tryGetRuleContext(0, UnaryOperatorContext);
  }
  public castExpression(): CastExpressionContext | undefined {
    return this.tryGetRuleContext(0, CastExpressionContext);
  }
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public Sizeof(): TerminalNode[];
  public Sizeof(i: number): TerminalNode;
  public Sizeof(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Sizeof);
    } else {
      return this.getToken(CParser.Sizeof, i);
    }
  }
  public Alignof(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Alignof, 0);
  }
  public PlusPlus(): TerminalNode[];
  public PlusPlus(i: number): TerminalNode;
  public PlusPlus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.PlusPlus);
    } else {
      return this.getToken(CParser.PlusPlus, i);
    }
  }
  public MinusMinus(): TerminalNode[];
  public MinusMinus(i: number): TerminalNode;
  public MinusMinus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.MinusMinus);
    } else {
      return this.getToken(CParser.MinusMinus, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_unaryExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterUnaryExpression) {
      listener.enterUnaryExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitUnaryExpression) {
      listener.exitUnaryExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitUnaryExpression) {
      return visitor.visitUnaryExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class UnaryOperatorContext extends ParserRuleContext {
  public And(): TerminalNode | undefined {
    return this.tryGetToken(CParser.And, 0);
  }
  public Star(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Star, 0);
  }
  public Plus(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Plus, 0);
  }
  public Minus(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Minus, 0);
  }
  public Tilde(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Tilde, 0);
  }
  public Not(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Not, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_unaryOperator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterUnaryOperator) {
      listener.enterUnaryOperator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitUnaryOperator) {
      listener.exitUnaryOperator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitUnaryOperator) {
      return visitor.visitUnaryOperator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CastExpressionContext extends ParserRuleContext {
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public castExpression(): CastExpressionContext | undefined {
    return this.tryGetRuleContext(0, CastExpressionContext);
  }
  public unaryExpression(): UnaryExpressionContext | undefined {
    return this.tryGetRuleContext(0, UnaryExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_castExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterCastExpression) {
      listener.enterCastExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitCastExpression) {
      listener.exitCastExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitCastExpression) {
      return visitor.visitCastExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MultiplicativeExpressionContext extends ParserRuleContext {
  public castExpression(): CastExpressionContext[];
  public castExpression(i: number): CastExpressionContext;
  public castExpression(
    i?: number
  ): CastExpressionContext | CastExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(CastExpressionContext);
    } else {
      return this.getRuleContext(i, CastExpressionContext);
    }
  }
  public Star(): TerminalNode[];
  public Star(i: number): TerminalNode;
  public Star(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Star);
    } else {
      return this.getToken(CParser.Star, i);
    }
  }
  public Div(): TerminalNode[];
  public Div(i: number): TerminalNode;
  public Div(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Div);
    } else {
      return this.getToken(CParser.Div, i);
    }
  }
  public Mod(): TerminalNode[];
  public Mod(i: number): TerminalNode;
  public Mod(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Mod);
    } else {
      return this.getToken(CParser.Mod, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_multiplicativeExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterMultiplicativeExpression) {
      listener.enterMultiplicativeExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitMultiplicativeExpression) {
      listener.exitMultiplicativeExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitMultiplicativeExpression) {
      return visitor.visitMultiplicativeExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AdditiveExpressionContext extends ParserRuleContext {
  public multiplicativeExpression(): MultiplicativeExpressionContext[];
  public multiplicativeExpression(i: number): MultiplicativeExpressionContext;
  public multiplicativeExpression(
    i?: number
  ): MultiplicativeExpressionContext | MultiplicativeExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(MultiplicativeExpressionContext);
    } else {
      return this.getRuleContext(i, MultiplicativeExpressionContext);
    }
  }
  public Plus(): TerminalNode[];
  public Plus(i: number): TerminalNode;
  public Plus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Plus);
    } else {
      return this.getToken(CParser.Plus, i);
    }
  }
  public Minus(): TerminalNode[];
  public Minus(i: number): TerminalNode;
  public Minus(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Minus);
    } else {
      return this.getToken(CParser.Minus, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_additiveExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAdditiveExpression) {
      listener.enterAdditiveExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAdditiveExpression) {
      listener.exitAdditiveExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAdditiveExpression) {
      return visitor.visitAdditiveExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ShiftExpressionContext extends ParserRuleContext {
  public additiveExpression(): AdditiveExpressionContext[];
  public additiveExpression(i: number): AdditiveExpressionContext;
  public additiveExpression(
    i?: number
  ): AdditiveExpressionContext | AdditiveExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AdditiveExpressionContext);
    } else {
      return this.getRuleContext(i, AdditiveExpressionContext);
    }
  }
  public LeftShift(): TerminalNode[];
  public LeftShift(i: number): TerminalNode;
  public LeftShift(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LeftShift);
    } else {
      return this.getToken(CParser.LeftShift, i);
    }
  }
  public RightShift(): TerminalNode[];
  public RightShift(i: number): TerminalNode;
  public RightShift(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.RightShift);
    } else {
      return this.getToken(CParser.RightShift, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_shiftExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterShiftExpression) {
      listener.enterShiftExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitShiftExpression) {
      listener.exitShiftExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitShiftExpression) {
      return visitor.visitShiftExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class RelationalExpressionContext extends ParserRuleContext {
  public shiftExpression(): ShiftExpressionContext[];
  public shiftExpression(i: number): ShiftExpressionContext;
  public shiftExpression(
    i?: number
  ): ShiftExpressionContext | ShiftExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ShiftExpressionContext);
    } else {
      return this.getRuleContext(i, ShiftExpressionContext);
    }
  }
  public Less(): TerminalNode[];
  public Less(i: number): TerminalNode;
  public Less(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Less);
    } else {
      return this.getToken(CParser.Less, i);
    }
  }
  public Greater(): TerminalNode[];
  public Greater(i: number): TerminalNode;
  public Greater(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Greater);
    } else {
      return this.getToken(CParser.Greater, i);
    }
  }
  public LessEqual(): TerminalNode[];
  public LessEqual(i: number): TerminalNode;
  public LessEqual(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LessEqual);
    } else {
      return this.getToken(CParser.LessEqual, i);
    }
  }
  public GreaterEqual(): TerminalNode[];
  public GreaterEqual(i: number): TerminalNode;
  public GreaterEqual(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.GreaterEqual);
    } else {
      return this.getToken(CParser.GreaterEqual, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_relationalExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterRelationalExpression) {
      listener.enterRelationalExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitRelationalExpression) {
      listener.exitRelationalExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitRelationalExpression) {
      return visitor.visitRelationalExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EqualityExpressionContext extends ParserRuleContext {
  public relationalExpression(): RelationalExpressionContext[];
  public relationalExpression(i: number): RelationalExpressionContext;
  public relationalExpression(
    i?: number
  ): RelationalExpressionContext | RelationalExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(RelationalExpressionContext);
    } else {
      return this.getRuleContext(i, RelationalExpressionContext);
    }
  }
  public Equal(): TerminalNode[];
  public Equal(i: number): TerminalNode;
  public Equal(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Equal);
    } else {
      return this.getToken(CParser.Equal, i);
    }
  }
  public NotEqual(): TerminalNode[];
  public NotEqual(i: number): TerminalNode;
  public NotEqual(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.NotEqual);
    } else {
      return this.getToken(CParser.NotEqual, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_equalityExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterEqualityExpression) {
      listener.enterEqualityExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitEqualityExpression) {
      listener.exitEqualityExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitEqualityExpression) {
      return visitor.visitEqualityExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AndExpressionContext extends ParserRuleContext {
  public equalityExpression(): EqualityExpressionContext[];
  public equalityExpression(i: number): EqualityExpressionContext;
  public equalityExpression(
    i?: number
  ): EqualityExpressionContext | EqualityExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EqualityExpressionContext);
    } else {
      return this.getRuleContext(i, EqualityExpressionContext);
    }
  }
  public And(): TerminalNode[];
  public And(i: number): TerminalNode;
  public And(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.And);
    } else {
      return this.getToken(CParser.And, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_andExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAndExpression) {
      listener.enterAndExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAndExpression) {
      listener.exitAndExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAndExpression) {
      return visitor.visitAndExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExclusiveOrExpressionContext extends ParserRuleContext {
  public andExpression(): AndExpressionContext[];
  public andExpression(i: number): AndExpressionContext;
  public andExpression(
    i?: number
  ): AndExpressionContext | AndExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AndExpressionContext);
    } else {
      return this.getRuleContext(i, AndExpressionContext);
    }
  }
  public Caret(): TerminalNode[];
  public Caret(i: number): TerminalNode;
  public Caret(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Caret);
    } else {
      return this.getToken(CParser.Caret, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_exclusiveOrExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterExclusiveOrExpression) {
      listener.enterExclusiveOrExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitExclusiveOrExpression) {
      listener.exitExclusiveOrExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitExclusiveOrExpression) {
      return visitor.visitExclusiveOrExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InclusiveOrExpressionContext extends ParserRuleContext {
  public exclusiveOrExpression(): ExclusiveOrExpressionContext[];
  public exclusiveOrExpression(i: number): ExclusiveOrExpressionContext;
  public exclusiveOrExpression(
    i?: number
  ): ExclusiveOrExpressionContext | ExclusiveOrExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExclusiveOrExpressionContext);
    } else {
      return this.getRuleContext(i, ExclusiveOrExpressionContext);
    }
  }
  public Or(): TerminalNode[];
  public Or(i: number): TerminalNode;
  public Or(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Or);
    } else {
      return this.getToken(CParser.Or, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_inclusiveOrExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterInclusiveOrExpression) {
      listener.enterInclusiveOrExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitInclusiveOrExpression) {
      listener.exitInclusiveOrExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitInclusiveOrExpression) {
      return visitor.visitInclusiveOrExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LogicalAndExpressionContext extends ParserRuleContext {
  public inclusiveOrExpression(): InclusiveOrExpressionContext[];
  public inclusiveOrExpression(i: number): InclusiveOrExpressionContext;
  public inclusiveOrExpression(
    i?: number
  ): InclusiveOrExpressionContext | InclusiveOrExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(InclusiveOrExpressionContext);
    } else {
      return this.getRuleContext(i, InclusiveOrExpressionContext);
    }
  }
  public AndAnd(): TerminalNode[];
  public AndAnd(i: number): TerminalNode;
  public AndAnd(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.AndAnd);
    } else {
      return this.getToken(CParser.AndAnd, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_logicalAndExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterLogicalAndExpression) {
      listener.enterLogicalAndExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitLogicalAndExpression) {
      listener.exitLogicalAndExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitLogicalAndExpression) {
      return visitor.visitLogicalAndExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LogicalOrExpressionContext extends ParserRuleContext {
  public logicalAndExpression(): LogicalAndExpressionContext[];
  public logicalAndExpression(i: number): LogicalAndExpressionContext;
  public logicalAndExpression(
    i?: number
  ): LogicalAndExpressionContext | LogicalAndExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(LogicalAndExpressionContext);
    } else {
      return this.getRuleContext(i, LogicalAndExpressionContext);
    }
  }
  public OrOr(): TerminalNode[];
  public OrOr(i: number): TerminalNode;
  public OrOr(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.OrOr);
    } else {
      return this.getToken(CParser.OrOr, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_logicalOrExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterLogicalOrExpression) {
      listener.enterLogicalOrExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitLogicalOrExpression) {
      listener.exitLogicalOrExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitLogicalOrExpression) {
      return visitor.visitLogicalOrExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConditionalExpressionContext extends ParserRuleContext {
  public logicalOrExpression(): LogicalOrExpressionContext {
    return this.getRuleContext(0, LogicalOrExpressionContext);
  }
  public Question(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Question, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public Colon(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Colon, 0);
  }
  public conditionalExpression(): ConditionalExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConditionalExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_conditionalExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterConditionalExpression) {
      listener.enterConditionalExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitConditionalExpression) {
      listener.exitConditionalExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitConditionalExpression) {
      return visitor.visitConditionalExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignmentExpressionContext extends ParserRuleContext {
  public conditionalExpression(): ConditionalExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConditionalExpressionContext);
  }
  public unaryExpression(): UnaryExpressionContext | undefined {
    return this.tryGetRuleContext(0, UnaryExpressionContext);
  }
  public assignmentOperator(): AssignmentOperatorContext | undefined {
    return this.tryGetRuleContext(0, AssignmentOperatorContext);
  }
  public assignmentExpression(): AssignmentExpressionContext | undefined {
    return this.tryGetRuleContext(0, AssignmentExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_assignmentExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAssignmentExpression) {
      listener.enterAssignmentExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAssignmentExpression) {
      listener.exitAssignmentExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAssignmentExpression) {
      return visitor.visitAssignmentExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignmentOperatorContext extends ParserRuleContext {
  public Assign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Assign, 0);
  }
  public StarAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.StarAssign, 0);
  }
  public DivAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.DivAssign, 0);
  }
  public ModAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.ModAssign, 0);
  }
  public PlusAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.PlusAssign, 0);
  }
  public MinusAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.MinusAssign, 0);
  }
  public LeftShiftAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftShiftAssign, 0);
  }
  public RightShiftAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightShiftAssign, 0);
  }
  public AndAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.AndAssign, 0);
  }
  public XorAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.XorAssign, 0);
  }
  public OrAssign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.OrAssign, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_assignmentOperator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAssignmentOperator) {
      listener.enterAssignmentOperator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAssignmentOperator) {
      listener.exitAssignmentOperator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAssignmentOperator) {
      return visitor.visitAssignmentOperator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public assignmentExpression(): AssignmentExpressionContext[];
  public assignmentExpression(i: number): AssignmentExpressionContext;
  public assignmentExpression(
    i?: number
  ): AssignmentExpressionContext | AssignmentExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AssignmentExpressionContext);
    } else {
      return this.getRuleContext(i, AssignmentExpressionContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_expression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterExpression) {
      listener.enterExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitExpression) {
      listener.exitExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstantExpressionContext extends ParserRuleContext {
  public conditionalExpression(): ConditionalExpressionContext {
    return this.getRuleContext(0, ConditionalExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_constantExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterConstantExpression) {
      listener.enterConstantExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitConstantExpression) {
      listener.exitConstantExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitConstantExpression) {
      return visitor.visitConstantExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationContext extends ParserRuleContext {
  public declarationSpecifiers(): DeclarationSpecifiersContext | undefined {
    return this.tryGetRuleContext(0, DeclarationSpecifiersContext);
  }
  public Semi(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Semi, 0);
  }
  public initDeclaratorList(): InitDeclaratorListContext | undefined {
    return this.tryGetRuleContext(0, InitDeclaratorListContext);
  }
  public staticAssertDeclaration(): StaticAssertDeclarationContext | undefined {
    return this.tryGetRuleContext(0, StaticAssertDeclarationContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclaration) {
      listener.enterDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclaration) {
      listener.exitDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclaration) {
      return visitor.visitDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationSpecifiersContext extends ParserRuleContext {
  public declarationSpecifier(): DeclarationSpecifierContext[];
  public declarationSpecifier(i: number): DeclarationSpecifierContext;
  public declarationSpecifier(
    i?: number
  ): DeclarationSpecifierContext | DeclarationSpecifierContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DeclarationSpecifierContext);
    } else {
      return this.getRuleContext(i, DeclarationSpecifierContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declarationSpecifiers;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclarationSpecifiers) {
      listener.enterDeclarationSpecifiers(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclarationSpecifiers) {
      listener.exitDeclarationSpecifiers(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclarationSpecifiers) {
      return visitor.visitDeclarationSpecifiers(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationSpecifiers2Context extends ParserRuleContext {
  public declarationSpecifier(): DeclarationSpecifierContext[];
  public declarationSpecifier(i: number): DeclarationSpecifierContext;
  public declarationSpecifier(
    i?: number
  ): DeclarationSpecifierContext | DeclarationSpecifierContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DeclarationSpecifierContext);
    } else {
      return this.getRuleContext(i, DeclarationSpecifierContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declarationSpecifiers2;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclarationSpecifiers2) {
      listener.enterDeclarationSpecifiers2(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclarationSpecifiers2) {
      listener.exitDeclarationSpecifiers2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclarationSpecifiers2) {
      return visitor.visitDeclarationSpecifiers2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationSpecifierContext extends ParserRuleContext {
  public storageClassSpecifier(): StorageClassSpecifierContext | undefined {
    return this.tryGetRuleContext(0, StorageClassSpecifierContext);
  }
  public typeSpecifier(): TypeSpecifierContext | undefined {
    return this.tryGetRuleContext(0, TypeSpecifierContext);
  }
  public typeQualifier(): TypeQualifierContext | undefined {
    return this.tryGetRuleContext(0, TypeQualifierContext);
  }
  public functionSpecifier(): FunctionSpecifierContext | undefined {
    return this.tryGetRuleContext(0, FunctionSpecifierContext);
  }
  public alignmentSpecifier(): AlignmentSpecifierContext | undefined {
    return this.tryGetRuleContext(0, AlignmentSpecifierContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declarationSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclarationSpecifier) {
      listener.enterDeclarationSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclarationSpecifier) {
      listener.exitDeclarationSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclarationSpecifier) {
      return visitor.visitDeclarationSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InitDeclaratorListContext extends ParserRuleContext {
  public initDeclarator(): InitDeclaratorContext[];
  public initDeclarator(i: number): InitDeclaratorContext;
  public initDeclarator(
    i?: number
  ): InitDeclaratorContext | InitDeclaratorContext[] {
    if (i === undefined) {
      return this.getRuleContexts(InitDeclaratorContext);
    } else {
      return this.getRuleContext(i, InitDeclaratorContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_initDeclaratorList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterInitDeclaratorList) {
      listener.enterInitDeclaratorList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitInitDeclaratorList) {
      listener.exitInitDeclaratorList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitInitDeclaratorList) {
      return visitor.visitInitDeclaratorList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InitDeclaratorContext extends ParserRuleContext {
  public declarator(): DeclaratorContext {
    return this.getRuleContext(0, DeclaratorContext);
  }
  public Assign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Assign, 0);
  }
  public initializer(): InitializerContext | undefined {
    return this.tryGetRuleContext(0, InitializerContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_initDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterInitDeclarator) {
      listener.enterInitDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitInitDeclarator) {
      listener.exitInitDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitInitDeclarator) {
      return visitor.visitInitDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StorageClassSpecifierContext extends ParserRuleContext {
  public Typedef(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Typedef, 0);
  }
  public Extern(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Extern, 0);
  }
  public Static(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Static, 0);
  }
  public ThreadLocal(): TerminalNode | undefined {
    return this.tryGetToken(CParser.ThreadLocal, 0);
  }
  public Auto(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Auto, 0);
  }
  public Register(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Register, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_storageClassSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStorageClassSpecifier) {
      listener.enterStorageClassSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStorageClassSpecifier) {
      listener.exitStorageClassSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStorageClassSpecifier) {
      return visitor.visitStorageClassSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeSpecifierContext extends ParserRuleContext {
  public Void(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Void, 0);
  }
  public Char(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Char, 0);
  }
  public Short(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Short, 0);
  }
  public Int(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Int, 0);
  }
  public Long(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Long, 0);
  }
  public Float(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Float, 0);
  }
  public Double(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Double, 0);
  }
  public Signed(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Signed, 0);
  }
  public Unsigned(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Unsigned, 0);
  }
  public Bool(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Bool, 0);
  }
  public Complex(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Complex, 0);
  }
  public atomicTypeSpecifier(): AtomicTypeSpecifierContext | undefined {
    return this.tryGetRuleContext(0, AtomicTypeSpecifierContext);
  }
  public structOrUnionSpecifier(): StructOrUnionSpecifierContext | undefined {
    return this.tryGetRuleContext(0, StructOrUnionSpecifierContext);
  }
  public enumSpecifier(): EnumSpecifierContext | undefined {
    return this.tryGetRuleContext(0, EnumSpecifierContext);
  }
  public typedefName(): TypedefNameContext | undefined {
    return this.tryGetRuleContext(0, TypedefNameContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_typeSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTypeSpecifier) {
      listener.enterTypeSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTypeSpecifier) {
      listener.exitTypeSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTypeSpecifier) {
      return visitor.visitTypeSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructOrUnionSpecifierContext extends ParserRuleContext {
  public structOrUnion(): StructOrUnionContext {
    return this.getRuleContext(0, StructOrUnionContext);
  }
  public LeftBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBrace, 0);
  }
  public structDeclarationList(): StructDeclarationListContext | undefined {
    return this.tryGetRuleContext(0, StructDeclarationListContext);
  }
  public RightBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBrace, 0);
  }
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structOrUnionSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructOrUnionSpecifier) {
      listener.enterStructOrUnionSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructOrUnionSpecifier) {
      listener.exitStructOrUnionSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructOrUnionSpecifier) {
      return visitor.visitStructOrUnionSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructOrUnionContext extends ParserRuleContext {
  public Struct(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Struct, 0);
  }
  public Union(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Union, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structOrUnion;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructOrUnion) {
      listener.enterStructOrUnion(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructOrUnion) {
      listener.exitStructOrUnion(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructOrUnion) {
      return visitor.visitStructOrUnion(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructDeclarationListContext extends ParserRuleContext {
  public structDeclaration(): StructDeclarationContext[];
  public structDeclaration(i: number): StructDeclarationContext;
  public structDeclaration(
    i?: number
  ): StructDeclarationContext | StructDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StructDeclarationContext);
    } else {
      return this.getRuleContext(i, StructDeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structDeclarationList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructDeclarationList) {
      listener.enterStructDeclarationList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructDeclarationList) {
      listener.exitStructDeclarationList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructDeclarationList) {
      return visitor.visitStructDeclarationList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructDeclarationContext extends ParserRuleContext {
  public specifierQualifierList(): SpecifierQualifierListContext | undefined {
    return this.tryGetRuleContext(0, SpecifierQualifierListContext);
  }
  public structDeclaratorList(): StructDeclaratorListContext | undefined {
    return this.tryGetRuleContext(0, StructDeclaratorListContext);
  }
  public Semi(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Semi, 0);
  }
  public staticAssertDeclaration(): StaticAssertDeclarationContext | undefined {
    return this.tryGetRuleContext(0, StaticAssertDeclarationContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structDeclaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructDeclaration) {
      listener.enterStructDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructDeclaration) {
      listener.exitStructDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructDeclaration) {
      return visitor.visitStructDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SpecifierQualifierListContext extends ParserRuleContext {
  public typeSpecifier(): TypeSpecifierContext | undefined {
    return this.tryGetRuleContext(0, TypeSpecifierContext);
  }
  public typeQualifier(): TypeQualifierContext | undefined {
    return this.tryGetRuleContext(0, TypeQualifierContext);
  }
  public specifierQualifierList(): SpecifierQualifierListContext | undefined {
    return this.tryGetRuleContext(0, SpecifierQualifierListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_specifierQualifierList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterSpecifierQualifierList) {
      listener.enterSpecifierQualifierList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitSpecifierQualifierList) {
      listener.exitSpecifierQualifierList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitSpecifierQualifierList) {
      return visitor.visitSpecifierQualifierList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructDeclaratorListContext extends ParserRuleContext {
  public structDeclarator(): StructDeclaratorContext[];
  public structDeclarator(i: number): StructDeclaratorContext;
  public structDeclarator(
    i?: number
  ): StructDeclaratorContext | StructDeclaratorContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StructDeclaratorContext);
    } else {
      return this.getRuleContext(i, StructDeclaratorContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structDeclaratorList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructDeclaratorList) {
      listener.enterStructDeclaratorList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructDeclaratorList) {
      listener.exitStructDeclaratorList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructDeclaratorList) {
      return visitor.visitStructDeclaratorList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructDeclaratorContext extends ParserRuleContext {
  public declarator(): DeclaratorContext | undefined {
    return this.tryGetRuleContext(0, DeclaratorContext);
  }
  public Colon(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Colon, 0);
  }
  public constantExpression(): ConstantExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConstantExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_structDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStructDeclarator) {
      listener.enterStructDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStructDeclarator) {
      listener.exitStructDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStructDeclarator) {
      return visitor.visitStructDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumSpecifierContext extends ParserRuleContext {
  public Enum(): TerminalNode {
    return this.getToken(CParser.Enum, 0);
  }
  public LeftBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBrace, 0);
  }
  public enumeratorList(): EnumeratorListContext | undefined {
    return this.tryGetRuleContext(0, EnumeratorListContext);
  }
  public RightBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBrace, 0);
  }
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public Comma(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Comma, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_enumSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterEnumSpecifier) {
      listener.enterEnumSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitEnumSpecifier) {
      listener.exitEnumSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitEnumSpecifier) {
      return visitor.visitEnumSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumeratorListContext extends ParserRuleContext {
  public enumerator(): EnumeratorContext[];
  public enumerator(i: number): EnumeratorContext;
  public enumerator(i?: number): EnumeratorContext | EnumeratorContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EnumeratorContext);
    } else {
      return this.getRuleContext(i, EnumeratorContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_enumeratorList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterEnumeratorList) {
      listener.enterEnumeratorList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitEnumeratorList) {
      listener.exitEnumeratorList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitEnumeratorList) {
      return visitor.visitEnumeratorList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumeratorContext extends ParserRuleContext {
  public enumerationConstant(): EnumerationConstantContext {
    return this.getRuleContext(0, EnumerationConstantContext);
  }
  public Assign(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Assign, 0);
  }
  public constantExpression(): ConstantExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConstantExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_enumerator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterEnumerator) {
      listener.enterEnumerator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitEnumerator) {
      listener.exitEnumerator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitEnumerator) {
      return visitor.visitEnumerator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EnumerationConstantContext extends ParserRuleContext {
  public Identifier(): TerminalNode {
    return this.getToken(CParser.Identifier, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_enumerationConstant;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterEnumerationConstant) {
      listener.enterEnumerationConstant(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitEnumerationConstant) {
      listener.exitEnumerationConstant(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitEnumerationConstant) {
      return visitor.visitEnumerationConstant(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AtomicTypeSpecifierContext extends ParserRuleContext {
  public Atomic(): TerminalNode {
    return this.getToken(CParser.Atomic, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_atomicTypeSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAtomicTypeSpecifier) {
      listener.enterAtomicTypeSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAtomicTypeSpecifier) {
      listener.exitAtomicTypeSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAtomicTypeSpecifier) {
      return visitor.visitAtomicTypeSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeQualifierContext extends ParserRuleContext {
  public Const(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Const, 0);
  }
  public Restrict(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Restrict, 0);
  }
  public Volatile(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Volatile, 0);
  }
  public Atomic(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Atomic, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_typeQualifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTypeQualifier) {
      listener.enterTypeQualifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTypeQualifier) {
      listener.exitTypeQualifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTypeQualifier) {
      return visitor.visitTypeQualifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionSpecifierContext extends ParserRuleContext {
  public Inline(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Inline, 0);
  }
  public Noreturn(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Noreturn, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_functionSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterFunctionSpecifier) {
      listener.enterFunctionSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitFunctionSpecifier) {
      listener.exitFunctionSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitFunctionSpecifier) {
      return visitor.visitFunctionSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AlignmentSpecifierContext extends ParserRuleContext {
  public Alignas(): TerminalNode {
    return this.getToken(CParser.Alignas, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  public constantExpression(): ConstantExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConstantExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_alignmentSpecifier;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAlignmentSpecifier) {
      listener.enterAlignmentSpecifier(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAlignmentSpecifier) {
      listener.exitAlignmentSpecifier(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAlignmentSpecifier) {
      return visitor.visitAlignmentSpecifier(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclaratorContext extends ParserRuleContext {
  public directDeclarator(): DirectDeclaratorContext {
    return this.getRuleContext(0, DirectDeclaratorContext);
  }
  public pointer(): PointerContext | undefined {
    return this.tryGetRuleContext(0, PointerContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclarator) {
      listener.enterDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclarator) {
      listener.exitDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclarator) {
      return visitor.visitDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DirectDeclaratorContext extends ParserRuleContext {
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public declarator(): DeclaratorContext | undefined {
    return this.tryGetRuleContext(0, DeclaratorContext);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public directDeclarator(): DirectDeclaratorContext | undefined {
    return this.tryGetRuleContext(0, DirectDeclaratorContext);
  }
  public LeftBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBracket, 0);
  }
  public RightBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBracket, 0);
  }
  public typeQualifierList(): TypeQualifierListContext | undefined {
    return this.tryGetRuleContext(0, TypeQualifierListContext);
  }
  public assignmentExpression(): AssignmentExpressionContext | undefined {
    return this.tryGetRuleContext(0, AssignmentExpressionContext);
  }
  public Static(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Static, 0);
  }
  public Star(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Star, 0);
  }
  public parameterTypeList(): ParameterTypeListContext | undefined {
    return this.tryGetRuleContext(0, ParameterTypeListContext);
  }
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  public Colon(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Colon, 0);
  }
  public DigitSequence(): TerminalNode | undefined {
    return this.tryGetToken(CParser.DigitSequence, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_directDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDirectDeclarator) {
      listener.enterDirectDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDirectDeclarator) {
      listener.exitDirectDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDirectDeclarator) {
      return visitor.visitDirectDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionDeclaratorContext extends ParserRuleContext {
  public functionDirectDeclarator(): FunctionDirectDeclaratorContext {
    return this.getRuleContext(0, FunctionDirectDeclaratorContext);
  }
  public pointer(): PointerContext | undefined {
    return this.tryGetRuleContext(0, PointerContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_functionDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterFunctionDeclarator) {
      listener.enterFunctionDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitFunctionDeclarator) {
      listener.exitFunctionDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitFunctionDeclarator) {
      return visitor.visitFunctionDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionDirectDeclaratorContext extends ParserRuleContext {
  public LeftParen(): TerminalNode[];
  public LeftParen(i: number): TerminalNode;
  public LeftParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LeftParen);
    } else {
      return this.getToken(CParser.LeftParen, i);
    }
  }
  public RightParen(): TerminalNode[];
  public RightParen(i: number): TerminalNode;
  public RightParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.RightParen);
    } else {
      return this.getToken(CParser.RightParen, i);
    }
  }
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public functionDeclarator(): FunctionDeclaratorContext | undefined {
    return this.tryGetRuleContext(0, FunctionDeclaratorContext);
  }
  public parameterTypeList(): ParameterTypeListContext | undefined {
    return this.tryGetRuleContext(0, ParameterTypeListContext);
  }
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_functionDirectDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterFunctionDirectDeclarator) {
      listener.enterFunctionDirectDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitFunctionDirectDeclarator) {
      listener.exitFunctionDirectDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitFunctionDirectDeclarator) {
      return visitor.visitFunctionDirectDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class NestedParenthesesBlockContext extends ParserRuleContext {
  public LeftParen(): TerminalNode[];
  public LeftParen(i: number): TerminalNode;
  public LeftParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.LeftParen);
    } else {
      return this.getToken(CParser.LeftParen, i);
    }
  }
  public nestedParenthesesBlock(): NestedParenthesesBlockContext[];
  public nestedParenthesesBlock(i: number): NestedParenthesesBlockContext;
  public nestedParenthesesBlock(
    i?: number
  ): NestedParenthesesBlockContext | NestedParenthesesBlockContext[] {
    if (i === undefined) {
      return this.getRuleContexts(NestedParenthesesBlockContext);
    } else {
      return this.getRuleContext(i, NestedParenthesesBlockContext);
    }
  }
  public RightParen(): TerminalNode[];
  public RightParen(i: number): TerminalNode;
  public RightParen(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.RightParen);
    } else {
      return this.getToken(CParser.RightParen, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_nestedParenthesesBlock;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterNestedParenthesesBlock) {
      listener.enterNestedParenthesesBlock(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitNestedParenthesesBlock) {
      listener.exitNestedParenthesesBlock(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitNestedParenthesesBlock) {
      return visitor.visitNestedParenthesesBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PointerContext extends ParserRuleContext {
  public Star(): TerminalNode[];
  public Star(i: number): TerminalNode;
  public Star(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Star);
    } else {
      return this.getToken(CParser.Star, i);
    }
  }
  public Caret(): TerminalNode[];
  public Caret(i: number): TerminalNode;
  public Caret(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Caret);
    } else {
      return this.getToken(CParser.Caret, i);
    }
  }
  public typeQualifierList(): TypeQualifierListContext[];
  public typeQualifierList(i: number): TypeQualifierListContext;
  public typeQualifierList(
    i?: number
  ): TypeQualifierListContext | TypeQualifierListContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TypeQualifierListContext);
    } else {
      return this.getRuleContext(i, TypeQualifierListContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_pointer;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterPointer) {
      listener.enterPointer(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitPointer) {
      listener.exitPointer(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitPointer) {
      return visitor.visitPointer(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeQualifierListContext extends ParserRuleContext {
  public typeQualifier(): TypeQualifierContext[];
  public typeQualifier(i: number): TypeQualifierContext;
  public typeQualifier(
    i?: number
  ): TypeQualifierContext | TypeQualifierContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TypeQualifierContext);
    } else {
      return this.getRuleContext(i, TypeQualifierContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_typeQualifierList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTypeQualifierList) {
      listener.enterTypeQualifierList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTypeQualifierList) {
      listener.exitTypeQualifierList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTypeQualifierList) {
      return visitor.visitTypeQualifierList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterTypeListContext extends ParserRuleContext {
  public parameterList(): ParameterListContext {
    return this.getRuleContext(0, ParameterListContext);
  }
  public Comma(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Comma, 0);
  }
  public Ellipsis(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Ellipsis, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_parameterTypeList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterParameterTypeList) {
      listener.enterParameterTypeList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitParameterTypeList) {
      listener.exitParameterTypeList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitParameterTypeList) {
      return visitor.visitParameterTypeList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterListContext extends ParserRuleContext {
  public parameterDeclaration(): ParameterDeclarationContext[];
  public parameterDeclaration(i: number): ParameterDeclarationContext;
  public parameterDeclaration(
    i?: number
  ): ParameterDeclarationContext | ParameterDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ParameterDeclarationContext);
    } else {
      return this.getRuleContext(i, ParameterDeclarationContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_parameterList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterParameterList) {
      listener.enterParameterList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitParameterList) {
      listener.exitParameterList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitParameterList) {
      return visitor.visitParameterList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterDeclarationContext extends ParserRuleContext {
  public declarationSpecifiers(): DeclarationSpecifiersContext | undefined {
    return this.tryGetRuleContext(0, DeclarationSpecifiersContext);
  }
  public declarator(): DeclaratorContext | undefined {
    return this.tryGetRuleContext(0, DeclaratorContext);
  }
  public declarationSpecifiers2(): DeclarationSpecifiers2Context | undefined {
    return this.tryGetRuleContext(0, DeclarationSpecifiers2Context);
  }
  public abstractDeclarator(): AbstractDeclaratorContext | undefined {
    return this.tryGetRuleContext(0, AbstractDeclaratorContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_parameterDeclaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterParameterDeclaration) {
      listener.enterParameterDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitParameterDeclaration) {
      listener.exitParameterDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitParameterDeclaration) {
      return visitor.visitParameterDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierListContext extends ParserRuleContext {
  public Identifier(): TerminalNode[];
  public Identifier(i: number): TerminalNode;
  public Identifier(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Identifier);
    } else {
      return this.getToken(CParser.Identifier, i);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_identifierList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterIdentifierList) {
      listener.enterIdentifierList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitIdentifierList) {
      listener.exitIdentifierList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitIdentifierList) {
      return visitor.visitIdentifierList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeNameContext extends ParserRuleContext {
  public specifierQualifierList(): SpecifierQualifierListContext {
    return this.getRuleContext(0, SpecifierQualifierListContext);
  }
  public abstractDeclarator(): AbstractDeclaratorContext | undefined {
    return this.tryGetRuleContext(0, AbstractDeclaratorContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_typeName;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTypeName) {
      listener.enterTypeName(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTypeName) {
      listener.exitTypeName(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTypeName) {
      return visitor.visitTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AbstractDeclaratorContext extends ParserRuleContext {
  public pointer(): PointerContext | undefined {
    return this.tryGetRuleContext(0, PointerContext);
  }
  public directAbstractDeclarator():
    | DirectAbstractDeclaratorContext
    | undefined {
    return this.tryGetRuleContext(0, DirectAbstractDeclaratorContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_abstractDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterAbstractDeclarator) {
      listener.enterAbstractDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitAbstractDeclarator) {
      listener.exitAbstractDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitAbstractDeclarator) {
      return visitor.visitAbstractDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DirectAbstractDeclaratorContext extends ParserRuleContext {
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public abstractDeclarator(): AbstractDeclaratorContext | undefined {
    return this.tryGetRuleContext(0, AbstractDeclaratorContext);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public LeftBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBracket, 0);
  }
  public RightBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBracket, 0);
  }
  public typeQualifierList(): TypeQualifierListContext | undefined {
    return this.tryGetRuleContext(0, TypeQualifierListContext);
  }
  public assignmentExpression(): AssignmentExpressionContext | undefined {
    return this.tryGetRuleContext(0, AssignmentExpressionContext);
  }
  public Static(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Static, 0);
  }
  public Star(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Star, 0);
  }
  public parameterTypeList(): ParameterTypeListContext | undefined {
    return this.tryGetRuleContext(0, ParameterTypeListContext);
  }
  public directAbstractDeclarator():
    | DirectAbstractDeclaratorContext
    | undefined {
    return this.tryGetRuleContext(0, DirectAbstractDeclaratorContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_directAbstractDeclarator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDirectAbstractDeclarator) {
      listener.enterDirectAbstractDeclarator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDirectAbstractDeclarator) {
      listener.exitDirectAbstractDeclarator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDirectAbstractDeclarator) {
      return visitor.visitDirectAbstractDeclarator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypedefNameContext extends ParserRuleContext {
  public Identifier(): TerminalNode {
    return this.getToken(CParser.Identifier, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_typedefName;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTypedefName) {
      listener.enterTypedefName(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTypedefName) {
      listener.exitTypedefName(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTypedefName) {
      return visitor.visitTypedefName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InitializerContext extends ParserRuleContext {
  public assignmentExpression(): AssignmentExpressionContext | undefined {
    return this.tryGetRuleContext(0, AssignmentExpressionContext);
  }
  public LeftBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBrace, 0);
  }
  public initializerList(): InitializerListContext | undefined {
    return this.tryGetRuleContext(0, InitializerListContext);
  }
  public RightBrace(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBrace, 0);
  }
  public Comma(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Comma, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_initializer;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterInitializer) {
      listener.enterInitializer(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitInitializer) {
      listener.exitInitializer(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitInitializer) {
      return visitor.visitInitializer(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InitializerListContext extends ParserRuleContext {
  public initializer(): InitializerContext[];
  public initializer(i: number): InitializerContext;
  public initializer(i?: number): InitializerContext | InitializerContext[] {
    if (i === undefined) {
      return this.getRuleContexts(InitializerContext);
    } else {
      return this.getRuleContext(i, InitializerContext);
    }
  }
  public designation(): DesignationContext[];
  public designation(i: number): DesignationContext;
  public designation(i?: number): DesignationContext | DesignationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DesignationContext);
    } else {
      return this.getRuleContext(i, DesignationContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_initializerList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterInitializerList) {
      listener.enterInitializerList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitInitializerList) {
      listener.exitInitializerList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitInitializerList) {
      return visitor.visitInitializerList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DesignationContext extends ParserRuleContext {
  public designatorList(): DesignatorListContext {
    return this.getRuleContext(0, DesignatorListContext);
  }
  public Assign(): TerminalNode {
    return this.getToken(CParser.Assign, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_designation;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDesignation) {
      listener.enterDesignation(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDesignation) {
      listener.exitDesignation(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDesignation) {
      return visitor.visitDesignation(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DesignatorListContext extends ParserRuleContext {
  public designator(): DesignatorContext[];
  public designator(i: number): DesignatorContext;
  public designator(i?: number): DesignatorContext | DesignatorContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DesignatorContext);
    } else {
      return this.getRuleContext(i, DesignatorContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_designatorList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDesignatorList) {
      listener.enterDesignatorList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDesignatorList) {
      listener.exitDesignatorList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDesignatorList) {
      return visitor.visitDesignatorList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DesignatorContext extends ParserRuleContext {
  public LeftBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftBracket, 0);
  }
  public constantExpression(): ConstantExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConstantExpressionContext);
  }
  public RightBracket(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightBracket, 0);
  }
  public Dot(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Dot, 0);
  }
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_designator;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDesignator) {
      listener.enterDesignator(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDesignator) {
      listener.exitDesignator(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDesignator) {
      return visitor.visitDesignator(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StaticAssertDeclarationContext extends ParserRuleContext {
  public StaticAssert(): TerminalNode {
    return this.getToken(CParser.StaticAssert, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public constantExpression(): ConstantExpressionContext {
    return this.getRuleContext(0, ConstantExpressionContext);
  }
  public Comma(): TerminalNode {
    return this.getToken(CParser.Comma, 0);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  public Semi(): TerminalNode {
    return this.getToken(CParser.Semi, 0);
  }
  public StringLiteral(): TerminalNode[];
  public StringLiteral(i: number): TerminalNode;
  public StringLiteral(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.StringLiteral);
    } else {
      return this.getToken(CParser.StringLiteral, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_staticAssertDeclaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStaticAssertDeclaration) {
      listener.enterStaticAssertDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStaticAssertDeclaration) {
      listener.exitStaticAssertDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStaticAssertDeclaration) {
      return visitor.visitStaticAssertDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StatementContext extends ParserRuleContext {
  public labeledStatement(): LabeledStatementContext | undefined {
    return this.tryGetRuleContext(0, LabeledStatementContext);
  }
  public compoundStatement(): CompoundStatementContext | undefined {
    return this.tryGetRuleContext(0, CompoundStatementContext);
  }
  public expressionStatement(): ExpressionStatementContext | undefined {
    return this.tryGetRuleContext(0, ExpressionStatementContext);
  }
  public selectionStatement(): SelectionStatementContext | undefined {
    return this.tryGetRuleContext(0, SelectionStatementContext);
  }
  public iterationStatement(): IterationStatementContext | undefined {
    return this.tryGetRuleContext(0, IterationStatementContext);
  }
  public jumpStatement(): JumpStatementContext | undefined {
    return this.tryGetRuleContext(0, JumpStatementContext);
  }
  public LeftParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.LeftParen, 0);
  }
  public RightParen(): TerminalNode | undefined {
    return this.tryGetToken(CParser.RightParen, 0);
  }
  public Semi(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Semi, 0);
  }
  public Volatile(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Volatile, 0);
  }
  public logicalOrExpression(): LogicalOrExpressionContext[];
  public logicalOrExpression(i: number): LogicalOrExpressionContext;
  public logicalOrExpression(
    i?: number
  ): LogicalOrExpressionContext | LogicalOrExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(LogicalOrExpressionContext);
    } else {
      return this.getRuleContext(i, LogicalOrExpressionContext);
    }
  }
  public Colon(): TerminalNode[];
  public Colon(i: number): TerminalNode;
  public Colon(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Colon);
    } else {
      return this.getToken(CParser.Colon, i);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_statement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterStatement) {
      listener.enterStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitStatement) {
      listener.exitStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitStatement) {
      return visitor.visitStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LabeledStatementContext extends ParserRuleContext {
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public Colon(): TerminalNode {
    return this.getToken(CParser.Colon, 0);
  }
  public statement(): StatementContext {
    return this.getRuleContext(0, StatementContext);
  }
  public Case(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Case, 0);
  }
  public constantExpression(): ConstantExpressionContext | undefined {
    return this.tryGetRuleContext(0, ConstantExpressionContext);
  }
  public Default(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Default, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_labeledStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterLabeledStatement) {
      listener.enterLabeledStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitLabeledStatement) {
      listener.exitLabeledStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitLabeledStatement) {
      return visitor.visitLabeledStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CompoundStatementContext extends ParserRuleContext {
  public LeftBrace(): TerminalNode {
    return this.getToken(CParser.LeftBrace, 0);
  }
  public RightBrace(): TerminalNode {
    return this.getToken(CParser.RightBrace, 0);
  }
  public blockItemList(): BlockItemListContext | undefined {
    return this.tryGetRuleContext(0, BlockItemListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_compoundStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterCompoundStatement) {
      listener.enterCompoundStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitCompoundStatement) {
      listener.exitCompoundStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitCompoundStatement) {
      return visitor.visitCompoundStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BlockItemListContext extends ParserRuleContext {
  public blockItem(): BlockItemContext[];
  public blockItem(i: number): BlockItemContext;
  public blockItem(i?: number): BlockItemContext | BlockItemContext[] {
    if (i === undefined) {
      return this.getRuleContexts(BlockItemContext);
    } else {
      return this.getRuleContext(i, BlockItemContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_blockItemList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterBlockItemList) {
      listener.enterBlockItemList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitBlockItemList) {
      listener.exitBlockItemList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitBlockItemList) {
      return visitor.visitBlockItemList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BlockItemContext extends ParserRuleContext {
  public statement(): StatementContext | undefined {
    return this.tryGetRuleContext(0, StatementContext);
  }
  public declaration(): DeclarationContext | undefined {
    return this.tryGetRuleContext(0, DeclarationContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_blockItem;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterBlockItem) {
      listener.enterBlockItem(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitBlockItem) {
      listener.exitBlockItem(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitBlockItem) {
      return visitor.visitBlockItem(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionStatementContext extends ParserRuleContext {
  public Semi(): TerminalNode {
    return this.getToken(CParser.Semi, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_expressionStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterExpressionStatement) {
      listener.enterExpressionStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitExpressionStatement) {
      listener.exitExpressionStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitExpressionStatement) {
      return visitor.visitExpressionStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SelectionStatementContext extends ParserRuleContext {
  public If(): TerminalNode | undefined {
    return this.tryGetToken(CParser.If, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  public statement(): StatementContext[];
  public statement(i: number): StatementContext;
  public statement(i?: number): StatementContext | StatementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StatementContext);
    } else {
      return this.getRuleContext(i, StatementContext);
    }
  }
  public Else(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Else, 0);
  }
  public Switch(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Switch, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_selectionStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterSelectionStatement) {
      listener.enterSelectionStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitSelectionStatement) {
      listener.exitSelectionStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitSelectionStatement) {
      return visitor.visitSelectionStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IterationStatementContext extends ParserRuleContext {
  public While(): TerminalNode | undefined {
    return this.tryGetToken(CParser.While, 0);
  }
  public LeftParen(): TerminalNode {
    return this.getToken(CParser.LeftParen, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public RightParen(): TerminalNode {
    return this.getToken(CParser.RightParen, 0);
  }
  public statement(): StatementContext {
    return this.getRuleContext(0, StatementContext);
  }
  public Do(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Do, 0);
  }
  public Semi(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Semi, 0);
  }
  public For(): TerminalNode | undefined {
    return this.tryGetToken(CParser.For, 0);
  }
  public forCondition(): ForConditionContext | undefined {
    return this.tryGetRuleContext(0, ForConditionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_iterationStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterIterationStatement) {
      listener.enterIterationStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitIterationStatement) {
      listener.exitIterationStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitIterationStatement) {
      return visitor.visitIterationStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForConditionContext extends ParserRuleContext {
  public Semi(): TerminalNode[];
  public Semi(i: number): TerminalNode;
  public Semi(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Semi);
    } else {
      return this.getToken(CParser.Semi, i);
    }
  }
  public forDeclaration(): ForDeclarationContext | undefined {
    return this.tryGetRuleContext(0, ForDeclarationContext);
  }
  public forExpression(): ForExpressionContext[];
  public forExpression(i: number): ForExpressionContext;
  public forExpression(
    i?: number
  ): ForExpressionContext | ForExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ForExpressionContext);
    } else {
      return this.getRuleContext(i, ForExpressionContext);
    }
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_forCondition;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterForCondition) {
      listener.enterForCondition(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitForCondition) {
      listener.exitForCondition(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitForCondition) {
      return visitor.visitForCondition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForDeclarationContext extends ParserRuleContext {
  public declarationSpecifiers(): DeclarationSpecifiersContext {
    return this.getRuleContext(0, DeclarationSpecifiersContext);
  }
  public initDeclaratorList(): InitDeclaratorListContext | undefined {
    return this.tryGetRuleContext(0, InitDeclaratorListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_forDeclaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterForDeclaration) {
      listener.enterForDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitForDeclaration) {
      listener.exitForDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitForDeclaration) {
      return visitor.visitForDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForExpressionContext extends ParserRuleContext {
  public assignmentExpression(): AssignmentExpressionContext[];
  public assignmentExpression(i: number): AssignmentExpressionContext;
  public assignmentExpression(
    i?: number
  ): AssignmentExpressionContext | AssignmentExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(AssignmentExpressionContext);
    } else {
      return this.getRuleContext(i, AssignmentExpressionContext);
    }
  }
  public Comma(): TerminalNode[];
  public Comma(i: number): TerminalNode;
  public Comma(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(CParser.Comma);
    } else {
      return this.getToken(CParser.Comma, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_forExpression;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterForExpression) {
      listener.enterForExpression(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitForExpression) {
      listener.exitForExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitForExpression) {
      return visitor.visitForExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class JumpStatementContext extends ParserRuleContext {
  public Semi(): TerminalNode {
    return this.getToken(CParser.Semi, 0);
  }
  public Goto(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Goto, 0);
  }
  public Identifier(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Identifier, 0);
  }
  public Return(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Return, 0);
  }
  public Continue(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Continue, 0);
  }
  public Break(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Break, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_jumpStatement;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterJumpStatement) {
      listener.enterJumpStatement(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitJumpStatement) {
      listener.exitJumpStatement(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitJumpStatement) {
      return visitor.visitJumpStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CompilationUnitContext extends ParserRuleContext {
  public EOF(): TerminalNode {
    return this.getToken(CParser.EOF, 0);
  }
  public translationUnit(): TranslationUnitContext | undefined {
    return this.tryGetRuleContext(0, TranslationUnitContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_compilationUnit;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterCompilationUnit) {
      listener.enterCompilationUnit(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitCompilationUnit) {
      listener.exitCompilationUnit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitCompilationUnit) {
      return visitor.visitCompilationUnit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TranslationUnitContext extends ParserRuleContext {
  public externalDeclaration(): ExternalDeclarationContext[];
  public externalDeclaration(i: number): ExternalDeclarationContext;
  public externalDeclaration(
    i?: number
  ): ExternalDeclarationContext | ExternalDeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExternalDeclarationContext);
    } else {
      return this.getRuleContext(i, ExternalDeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_translationUnit;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterTranslationUnit) {
      listener.enterTranslationUnit(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitTranslationUnit) {
      listener.exitTranslationUnit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitTranslationUnit) {
      return visitor.visitTranslationUnit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExternalDeclarationContext extends ParserRuleContext {
  public functionDefinition(): FunctionDefinitionContext | undefined {
    return this.tryGetRuleContext(0, FunctionDefinitionContext);
  }
  public declaration(): DeclarationContext | undefined {
    return this.tryGetRuleContext(0, DeclarationContext);
  }
  public Semi(): TerminalNode | undefined {
    return this.tryGetToken(CParser.Semi, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_externalDeclaration;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterExternalDeclaration) {
      listener.enterExternalDeclaration(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitExternalDeclaration) {
      listener.exitExternalDeclaration(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitExternalDeclaration) {
      return visitor.visitExternalDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionDefinitionContext extends ParserRuleContext {
  public functionDeclarator(): FunctionDeclaratorContext {
    return this.getRuleContext(0, FunctionDeclaratorContext);
  }
  public compoundStatement(): CompoundStatementContext {
    return this.getRuleContext(0, CompoundStatementContext);
  }
  public declarationSpecifiers(): DeclarationSpecifiersContext | undefined {
    return this.tryGetRuleContext(0, DeclarationSpecifiersContext);
  }
  public declarationList(): DeclarationListContext | undefined {
    return this.tryGetRuleContext(0, DeclarationListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_functionDefinition;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterFunctionDefinition) {
      listener.enterFunctionDefinition(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitFunctionDefinition) {
      listener.exitFunctionDefinition(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitFunctionDefinition) {
      return visitor.visitFunctionDefinition(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationListContext extends ParserRuleContext {
  public declaration(): DeclarationContext[];
  public declaration(i: number): DeclarationContext;
  public declaration(i?: number): DeclarationContext | DeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DeclarationContext);
    } else {
      return this.getRuleContext(i, DeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return CParser.RULE_declarationList;
  }
  // @Override
  public enterRule(listener: CListener): void {
    if (listener.enterDeclarationList) {
      listener.enterDeclarationList(this);
    }
  }
  // @Override
  public exitRule(listener: CListener): void {
    if (listener.exitDeclarationList) {
      listener.exitDeclarationList(this);
    }
  }
  // @Override
  public accept<Result>(visitor: CVisitor<Result>): Result {
    if (visitor.visitDeclarationList) {
      return visitor.visitDeclarationList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
