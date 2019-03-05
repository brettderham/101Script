const ohm = require('ohm-js');
const fs = require('fs');

const Program = require('../ast/program');
const Block = require('../ast/block');
const VariableDeclaration = require('../ast/variable-declaration');
const ClassDeclaration = require('../ast/class-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const BreakStatement = require('../ast/break-statement');
const ReturnStatement = require('../ast/return-statement');
const IfStatement = require('../ast/if-statement');
const Case = require('../ast/case');
const LoopStatement = require('../ast/loop-statement');
const WhileStatement = require('../ast/while-statement');
const LoopStatement = require('../ast/loop-statement');
const CallStatement = require('../ast/call-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/function-object');
const ListExpression = require('../ast/list-expression');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const Call = require('../ast/call');
const Parameter = require('../ast/parameter');
const Argument = require('../ast/argument');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');

const grammar = ohm.grammar(fs.readFileSync('./syntax/101Script.ohm'))

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function unpack(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) { return new Program(body.ast()); },

  Block(stmt) { return new Block(stmt.ast()); },

  ClassDec(_1, id, vars, FunDec, _2) { return new ClassDeclaration(id.sourceString, vars.ast(), FunDec.ast()); },

  Stmt_simple(statement, _) { return statement.ast(); },

  Stmt_while(_, test) { return new WhileStatement(test.ast(), suite.ast()); },

  Stmt_loop(_, test) { return new LoopStatement(test.ast(), suite.ast()); },

  Stmt_if(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const bodies = [firstSuite.ast(), ...moreSuites.ast()];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IfStatement(cases, unpack(lastSuite.ast()));
  },

  // Stmt_function(_1, id, _2, params, _3, suite) { return new FunctionDeclaration(id.ast(), params.ast(), suite.ast()); },

  SimpleStmt_vardecl(_1, v, _2, e) { return new VariableDeclaration(v.ast(), e.ast()); },

  SimpleStmt_assign(v, _, e) { return new AssignmentStatement(v.ast(), e.ast()); },

  SimpleStmt_call(c) { return new CallStatement(c.ast()); },

  SimpleStmt_break(_) { return new BreakStatement(); },

  SimpleStmt_return(_, e) { return new ReturnStatement(unpack(e.ast())); },

  Exp_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },

  Exp_and(left, op, right) { return new BinaryExpression(op.ast(), right.ast()); },

  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },

  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },

  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },

  Exp4_unary(op, operand) { return new UnaryExpression(op.ast(), operand.ast()); },

  Exp5_list(_1, expressions, _2) { return new ListExpression(expressions.ast()); },

  Exp5_parens(_1, expression, _2) { return expression.ast(); },

  Exp5_object(_1, v, _2, args, _3) { return new FunctionObject(v.ast(), args.ast()); }, 

  Call(callee, _1, args, _2) { return new Call(callee.ast(), args.ast()); },

  VarExp_subscripted(v, _1, e, _2) { return new SubscriptedExpression(v.ast(), e.ast()); },

  VarExp_simple(id) { return new IdentifierExpression(id.ast()); },

  Param(id, _, exp) { return new Parameter(id.ast(), unpack(exp.ast())); },

  Arg(id, _, exp) { return new Argument(unpack(id.ast()), exp.ast()); },

  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },

  EmptyListOf() { return []; },

  boollit(_) { return new BooleanLiteral(!!this.sourceString); },

  numlit(_1, _2, _3, _4, _5, _6) { return new NumericLiteral(+this.sourceString); },

  strlit(_1, chars, _6) { return new StringLiteral(this.sourceString); },

  id(_1, _2) { return this.sourceString; },

  _terminal() { return this.sourceString; },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw match.message;
  }
  return match.succeeded();
};
