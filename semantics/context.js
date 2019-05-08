/*
 * Semantic Analysis Context
 *
 * A context object holds state for the semantic analysis phase, such as the
 * enclosing function (if any), whether or not we are in a loop, a map of
 * declarations introduced in this scope, and the parent context.
 *
 *   const Context = require('./semantics/context');
 */

const util = require('util')
const FunctionDeclaration = require('../ast/function-declaration');
const NewObject = require('../ast/new-object');
const Parameter = require('../ast/parameter');

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this,
      {
        parent, currentFunction, inLoop, declarations: {},
      });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  add(entity) {
    if (entity.id in this.declarations && entity.id !== undefined) {
      throw new Error(`Identitier ${entity.id} already declared in this scope`);
    }
    this.declarations[entity.id] = entity;
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    if (id in this.declarations) {
      return this.declarations[id];
    } else if (this.parent === null) { // eslint-disable-line
  //} else if (this.kind === (null)) {
      throw new Error(`Identifier ${util.format(id)} has not been declared`);
    } else{
    return this.parent.lookup(id);
    }
  }

  assertInFunction(message) { // eslint-disable-line class-methods-use-this
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) { // eslint-disable-line class-methods-use-this
    // console.log("CONTEXT" + context);
    // console.log(`${entity} ` + entity);
    // console.log("NewObject " + NewObject);
    if (entity.constructor !== NewObject) {
      console.log("ENTITY : " + entity);
      throw new Error(`${entity.constructor} is not a function`);
    }
  }
}

Context.INITIAL = new Context();

Context.INITIAL.declarations = {
  print: new FunctionDeclaration('print', [new Parameter('_', null)], null),
};

// new FunctionDeclaration('print', [new Parameter('_', null)], null).analyze(Context.INITIAL);
// new FunctionDeclaration('sqrt', [new Parameter('_', null)], null).analyze(Context.INITIAL);
module.exports = Context;