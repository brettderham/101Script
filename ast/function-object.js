module.exports = class FunctionObject {
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
  }

  analyze(context) {
    this.params.forEach(p => p.analyze(context));
    if (this.body) {
      this.body.statements.forEach(s => s.analyze(context));
    }
  }
};
