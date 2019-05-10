module.exports = class Argument {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }

  analyze(context) {
    this.expression.analyze(context);
  }
};
