module.exports = class Parameter {
  constructor(id, defaultExpression) {
    Object.assign(this, { id, defaultExpression});
  }

  analyze(context) {
    context.add(this);
  }
};