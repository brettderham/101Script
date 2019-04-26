module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  analyze(context) {
    this.sources.analyze(context);
    this.targets.analyze(context);
  }
};
