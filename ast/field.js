module.exports = class Field {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }

  analyze(context) {
    this.expression.analyze(context);
  }
};
