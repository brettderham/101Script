module.exports = class Method {
  constructor(id, params, body) {
    this.id = id;
    this.params = params;
    this.body = body;
  }

  analyze(context) {
    // First put the function in the current context, then analyze it in
    // a new child context.
    context.add(this.function);
    this.function.analyze(context.createChildContextForFunctionBody(this));
  }
};
