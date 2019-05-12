const prettyJs = require('pretty-js');

const Context = require('../semantics/context');
const Program = require('../ast/program');
const Block = require('../ast/block');
const VariableDeclaration = require('../ast/variable-declaration');
const ClassDeclaration = require('../ast/class-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const BreakStatement = require('../ast/break-statement');
const FieldExpression = require('../ast/field-expression');
const ReturnStatement = require('../ast/return-statement');
const IfStatement = require('../ast/if-statement');
const WhileStatement = require('../ast/while-statement');
const CallStatement = require('../ast/call-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const FunctionObject = require('../ast/new-object');
const NewObject = require('../ast/new-object');
const ListExpression = require('../ast/list-expression');
const BinaryExpression = require('../ast/binary-expression');
const UnaryExpression = require('../ast/unary-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const Call = require('../ast/call-expression');
const Parameter = require('../ast/parameter');
const Field = require('../ast/field');
const Argument = require('../ast/argument');
const Variable = require('../ast/variable');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');

function makeOp(op) {
  return {
    not: '!', and: 'and', or: 'or', '==': 'equals', '!=': 'notEqual',
  }[op] || op;
}

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

// function bracketIfNecessary(a) {
//   return (a.length === 1) ? `${a}` : `[${a.join(',')}]`;
// }

function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.declarations[name];
    return `function ${jsName(entity)}(${params}) {${body}}`;
  }
  return [
    generateLibraryStub('print(_)', 'console.log(_);'),
  ].join('');
}

function generateBlock(block) {
  return block.statements;
}

module.exports = function (program) {
  return program.gen();
};

Object.assign(Argument.prototype, {
  gen() { return this.expression.gen(); },
});

Object.assign(AssignmentStatement.prototype, {
  gen() {
    const targets = this.target;
    const sources = this.source;
  },
});

Object.assign(BinaryExpression.prototype, {
  gen() {
    console.log(this.left.constructor);
    if (this.left.constructor === this.right.constructor) {
      return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
    }
    return 'Error!';
  },
});

Object.assign(Block.prototype, {
  gen() { return this.statements.forEach(); },
});

Object.assign(BooleanLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(BreakStatement.prototype, {
  gen() { return 'break'; },
});

Object.assign(Call.prototype, {
  gen() {
    const fun = this.callee.referent;
    const params = {};
    const args = Array(this.args.length).fill(undefined);
    fun.params.forEach((p, i) => { params[p.id] = i; });
    this.args.forEach((a, i) => { args[a.isPositionalArgument ? i : params[a.id]] = a; });
    return `${jsName(fun)}(${args.map(a => (a ? a.gen() : 'undefined')).join(',')})`;
  },
});

Object.assign(ClassDeclaration.prototype, {
  gen() { return this.function.gen(); },
});

Object.assign(FunctionDeclaration.prototype, {
  gen() { return this.function.gen(); },
});

Object.assign(FunctionObject.prototype, {
  gen() {
    return `function ${jsName(this)}(${this.params.map(p => p.gen()).join(',')}) {
      ${generateBlock(this.body)}
    }`;
  },
});

Object.assign(Field.prototype, {
  gen() { return this.expression.gen(); },
});

Object.assign(IdentifierExpression.prototype, {
  gen() { return this.referent.gen(); },
});

Object.assign(IfStatement.prototype, {
  gen() {
    if (test.constructor === BooleanLiteral) {
      const cases = this.test.map((test, index) => {
        const prefix = index === 0 ? 'if' : '} else if';
        return `${prefix} (${test.gen()}) {${generateBlock(this.consequents[index])}`;
      });
      const alternate = this.alternate ? `}else{${generateBlock(this.alternate)}` : '';
      return `${cases.join('')}${alternate}}`;
    }
    console.log('Error!');
  },
});

Object.assign(ListExpression.prototype, {
  gen() {
    const jsMembers = this.members.map(member => member.gen());
    return `[${jsMembers.join(',')}]`;
  },
});

// new object

Object.assign(NumericLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Parameter.prototype, {
  gen() {
    let translation = jsName(this);
    if (this.defaultExpression) {
      translation += ` = ${this.defaultExpression.gen()}`;
    }
    return translation;
  },
});

Object.assign(Program.prototype, {
  gen() {
    const libraryFunctions = ''; // generateLibraryFunctions();
    const programStatements = generateBlock(this.body);
    const target = `${libraryFunctions}${programStatements}`;
    return prettyJs(target, { indent: '  ' });
  },
});

Object.assign(ReturnStatement.prototype, {
  gen() {
    return `return ${this.returnValue ? this.returnValue.gen() : ''}`;
  },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(UnaryExpression.prototype, {
  gen() {
    if (this.operand.constructor === NumericLiteral) {
      return `(${makeOp(this.op)} ${this.operand.gen()})`;
    }
    console.log('Error!');
  },
});

Object.assign(VariableDeclaration.prototype, {
  gen() {
    console.log(this.id);
    const variables = this.id;
    const initializers = this.initializer;
    return `let ${variables} = ${initializers}`;
  },
});

Object.assign(Variable.prototype, {
  gen() {
    return jsName(this);
  },
});

Object.assign(WhileStatement.prototype, {
  gen() {
    if (test.constructor === BooleanLiteral) {
      return `while (${this.test.gen()}) { ${generateBlock(this.body)} }`;
    }
    console.log('Error!');
  },
});


/*
/* eslint-disable no-unused-vars
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
/* eslint-enable no-unused-vars

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
*/
