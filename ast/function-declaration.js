const NewObject = require('./new-object');

module.exports = class FunctionDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.function = new NewObject(id, params, body);
  }


  analyze(context) {
    // console.log(context);
    // console.log("context.function " + context.function);
    // First put the function in the current context, then analyze it in
    // a new child context.
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};
