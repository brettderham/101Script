const Variable = require('./variable');

module.exports = class VariableDeclaration {
  constructor(kind, id, initializer) {
    Object.assign(this, { kind, id, initializer });
  }

  analyze(context) {
    this.initializer.analyze(context);
    context.add(this);
  }

  optimize() {
    return this;
  }
};
