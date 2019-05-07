const Parameter = require("./parameter");

module.exports = class NewObject {
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
    // this.params = params.filter(s => !Array.isArray(s));
  }

  get isExternal() {
    return !this.function.body;
  }

  analyze(context) {
    this.params = this.params.map(p => new Parameter(p.id, p.defaultExpression));
    this.params.map(p => p.analyze(context));
    if (this.body) {
      this.body.statements.map(s => s.analyze(context));
    }
  }
};
