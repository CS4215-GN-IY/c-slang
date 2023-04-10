import { parse } from '../../parser';
import { type Program } from '../../../ast/types/ast';
import { INT32 } from '../../../ast/types/dataTypes';

describe('selection statement', () => {
  it('handles switch statement', () => {
    const code = `
        int main() {
            int i = 5;
            switch(i) {
                case 1:
                case 2:
                case 3:
                    return 2;
                case 4:
                case 5:
                    return 6;
                default:
                    return 8;
            }
        }
    `;
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          id: {
            name: 'main',
            type: 'Identifier'
          },
          type: 'FunctionDeclaration',
          params: [],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'Declaration',
                dataType: INT32,
                isConstant: false,
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    pattern: {
                      name: 'i',
                      type: 'Identifier'
                    },
                    initialValue: {
                      type: 'Constant',
                      value: 5
                    }
                  }
                ]
              },
              {
                type: 'SwitchStatement',
                discriminant: {
                  expressions: [
                    {
                      name: 'i',
                      type: 'Identifier'
                    }
                  ],
                  type: 'SequenceExpression'
                },
                body: {
                  type: 'BlockStatement',
                  items: [
                    {
                      type: 'CaseStatement',
                      label: {
                        type: 'Constant',
                        value: 1
                      },
                      body: {
                        type: 'CaseStatement',
                        label: {
                          type: 'Constant',
                          value: 2
                        },
                        body: {
                          type: 'CaseStatement',
                          label: {
                            type: 'Constant',
                            value: 3
                          },
                          body: {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'SequenceExpression',
                              expressions: [
                                {
                                  type: 'Constant',
                                  value: 2
                                }
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      type: 'CaseStatement',
                      label: {
                        type: 'Constant',
                        value: 4
                      },
                      body: {
                        type: 'CaseStatement',
                        label: {
                          type: 'Constant',
                          value: 5
                        },
                        body: {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
                                type: 'Constant',
                                value: 6
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      type: 'DefaultStatement',
                      body: {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Constant',
                              value: 8
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });

  it('handles switch statement with fallthrough', () => {
    const code = `
        int main() {
            int i = 5;
            switch(i) {
                case 1:
                    i += 2;
                case 2:
                case 3:
                    return 2;
                case 4:
                case 5:
                    return 6;
                default:
                    return 8;
            }
        }
    `;
    const ast = parse(code);
    const expectedAst: Program = {
      type: 'Program',
      body: [
        {
          id: {
            name: 'main',
            type: 'Identifier'
          },
          type: 'FunctionDeclaration',
          params: [],
          body: {
            type: 'BlockStatement',
            items: [
              {
                type: 'Declaration',
                dataType: INT32,
                isConstant: false,
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    pattern: {
                      name: 'i',
                      type: 'Identifier'
                    },
                    initialValue: {
                      type: 'Constant',
                      value: 5
                    }
                  }
                ]
              },
              {
                type: 'SwitchStatement',
                discriminant: {
                  expressions: [
                    {
                      name: 'i',
                      type: 'Identifier'
                    }
                  ],
                  type: 'SequenceExpression'
                },
                body: {
                  type: 'BlockStatement',
                  items: [
                    {
                      type: 'CaseStatement',
                      label: {
                        type: 'Constant',
                        value: 1
                      },
                      body: {
                        type: 'ExpressionStatement',
                        sequence: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'AssignmentExpression',
                              left: {
                                name: 'i',
                                type: 'Identifier'
                              },
                              operator: '+=',
                              right: {
                                type: 'Constant',
                                value: 2
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      type: 'CaseStatement',
                      label: {
                        type: 'Constant',
                        value: 2
                      },
                      body: {
                        type: 'CaseStatement',
                        label: {
                          type: 'Constant',
                          value: 3
                        },
                        body: {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
                                type: 'Constant',
                                value: 2
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      type: 'CaseStatement',
                      label: {
                        type: 'Constant',
                        value: 4
                      },
                      body: {
                        type: 'CaseStatement',
                        label: {
                          type: 'Constant',
                          value: 5
                        },
                        body: {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
                                type: 'Constant',
                                value: 6
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      type: 'DefaultStatement',
                      body: {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Constant',
                              value: 8
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };
    expect(ast).toEqual(expectedAst);
  });
});
