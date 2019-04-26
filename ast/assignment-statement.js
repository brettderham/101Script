module.exports = class AssignmentStatement {
  constructor(target, sources) {
    Object.assign(this, { target, sources });
  }

  analyze(context) {
    this.sources.analyze(context);
    this.target.lookup(context.id);
  }
};
