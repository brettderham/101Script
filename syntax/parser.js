const ohm = require('ohm-js');
const fs = require('fs');
const util = require('util');

const Program = require('../ast/program');
const Block = require('../ast/block');
const VariableDeclaration = require('../ast/variable-declaration');
const ClassDeclaration = require('../ast/class-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const BreakStatement = require('../ast/break-statement');
const FieldExpression = require('../ast/field-expression');
const ReturnStatement = require('../ast/return-statement');
const IfStatement = require('../ast/if-statement');
const LoopStatement = require('../ast/loop-statement');
const WhileStatement = require('../ast/while-statement');
const CallStatement = require('../ast/call-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const NewObject = require('../ast/new-object');
const ListExpression = require('../ast/list-expression');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const Call = require('../ast/call-expression');
const Parameter = require('../ast/parameter');
const Field = require('../ast/field');
const Method = require('../ast/method');
const Argument = require('../ast/argument');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');

const grammar = ohm.grammar(fs.readFileSync('./syntax/101Script.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function unpack(a) {
  return a.length === 0 ? null : a[0];
}

function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) {
    const p = new Program(body.ast());
    //  console.log(util.inspect(p, { depth: null }));
    return p;
  },

  Block(stmts) {
    return new Block(stmts.ast());
  },

  Stmt_simple(statement, _) {
    return statement.ast();
  },

  Stmt_while(_1, _2, test, _3, _4, body, _5) {
    return new WhileStatement(test.ast(), body.ast());
  },

  Stmt_loop(_1, _2, test, _3, _4, body, _5) {
    return new LoopStatement(test.ast(), body.ast());
  },

  Stmt_if(_if, _lp, test, _rp, _col1, consequent, _else, _col2, alternate, _s3) {
    return new IfStatement(test.ast(), consequent.ast(), alternate.ast());
  },

  Stmt_function(_1, id, _2, params, _3, _4, body, _5) {
    return new FunctionDeclaration(id.ast(), params.ast(), body.ast());
  },

  SimpleStmt_vardecl(kind, id, _1, e) {
    return new VariableDeclaration(kind.ast(), id.ast(), e.ast());
  },

  SimpleStmt_assign(v, _, e) {
    return new AssignmentStatement(v.ast(), e.ast());
  },

  SimpleStmt_call(c) {
    return new CallStatement(c.ast());
  },

  SimpleStmt_break(_) {
    return new BreakStatement();
  },

  SimpleStmt_return(_, e) {
    return new ReturnStatement(unpack(e.ast()));
  },

  Exp_or(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },

  Exp_and(left, op, right) {
    return new BinaryExpression(op.ast(), right.ast());
  },

  Exp1_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },

  Exp2_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },

  Exp3_binary(left, op, right) {
    return new BinaryExpression(op.ast(), left.ast(), right.ast());
  },

  Exp4_unary(op, operand) {
    return new UnaryExpression(op.ast(), operand.ast());
  },

  Exp5_list(_1, expressions, _2) {
    return new ListExpression(expressions.ast());
  },

  Exp5_parens(_1, expression, _2) {
    return expression.ast();
  },

  Call(callee, _1, args, _2) {
    return new Call(callee.ast(), args.ast());
  },

  ClassDecl_class(_1, id, _2, alternate, _3, body, _4) {
    return new ClassDeclaration(id.sourceString, arrayToNullable(alternate.ast()), body.ast());
  },

  NewObject_object(_1, id, _2, params, _3) {
    return new NewObject(id.ast(), params.ast());
  },

  VarExp_subscripted(v, _1, e, _2) {
    return new SubscriptedExpression(v.ast(), e.ast());
  },

  VarExp_field(v, _1, e,) {
    return new FieldExpression(v.ast(), e.ast());
  },

  VarExp_simple(id) {
    return new IdentifierExpression(id.ast());
  },

  Param(id, _, exp) {
    return new Parameter(id.ast(), unpack(exp.ast()));
  },

  Field(id, _, exp) {
    return new Field(id.ast(), exp.ast());
  },

  Method(id, _1, params, _2, _3, body, _4) {
    return new Method(id.ast(), params.ast(), body.ast());
  },

  Arg(id, _, exp) {
    return new Argument(unpack(id.ast()), exp.ast());
  },

  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },

  EmptyListOf() {
    return [];
  },

  boollit(_) {
    return new BooleanLiteral(!!this.sourceString);
  },

  numlit(_1, _2, _3, _4, _5, _6) {
    return new NumericLiteral(+this.sourceString);
  },

  strlit(_1, chars, _2) {
    return new StringLiteral(this.sourceString);
  },

  id(_1, _2) {
    return this.sourceString;
  },

  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
