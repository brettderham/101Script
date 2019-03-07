const ohm = require('ohm-js');
const fs = require('fs');

const Program = require('./program');
const Block = require('./block');
const VariableDeclaration = require('./variable-declaration');
const ClassDeclaration = require('./class-declaration');
const AssignmentStatement = require('./assignment-statement');
const BreakStatement = require('./break-statement');
const ReturnStatement = require('./return-statement');
const IfStatement = require('./if-statement');
const Case = require('./case');
const LoopStatement = require('./loop-statement');
const WhileStatement = require('./while-statement');
const CallStatement = require('./call-statement');
const FunctionDeclaration = require('./function-declaration');
const FunctionObject = require('./function-object');
const ListExpression = require('./list-expression');
const BinaryExpression = require('./binary-expression');
const UnaryExpression = require('./unary-expression');
const IdentifierExpression = require('./identifier-expression');
const SubscriptedExpression = require('./subscripted-expression');
const Call = require('./call-expression');
const Parameter = require('./parameter');
const Argument = require('./argument');
const BooleanLiteral = require('./boolean-literal');
const NumericLiteral = require('./numeric-literal');
const StringLiteral = require('./string-literal');

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
    return new Program(body.ast());
  },

  Block(stmt) {
    return new Block(stmt.ast());
  },

  ClassDecl_class(_1, id, _2, alternate, body, _3) {
    return new ClassDeclaration(id.sourceString, arrayToNullable(alternate.ast()), body.ast());
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

  Stmt_if(_1, _2, firstTest, _3, _4, body, _5, newline, _6, _7, moreTests, _8, _9, moreBody, _10, _11, moreNewline, _12, alternate, _13) {
    return new IfStatement(firstTest.ast(), body.ast(), newline.ast(), moreTests.ast(), moreBody.ast(), moreNewline.ast(), alternate.ast());
  },

  Stmt_function(_1, id, _2, params, _3, _4, body, _5) {
    return new FunctionDeclaration(id.ast(), params.ast(), body.ast());
  },

  SimpleStmt_vardecl(id, _1, e) {
    return new VariableDeclaration(id.ast(), e.ast());
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

  NewObject_object(id, _1, args, _2) {
    return new FunctionObject(id.ast(), args.ast());
  },

  VarExp_subscripted(v, _1, e, _2) {
    return new SubscriptedExpression(v.ast(), e.ast());
  },

  VarExp_simple(id) {
    return new IdentifierExpression(id.ast());
  },

  Param(id, _, exp) {
    return new Parameter(id.ast(), unpack(exp.ast()));
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

  strlit(_1, chars, _6) {
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
