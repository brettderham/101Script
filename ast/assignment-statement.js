module.exports = class AssignmentStatement {
  constructor(target, source) {
    Object.assign(this, { target, source });
  }

  analyze(context) {
    this.source.analyze(context);
    this.target.analyze(context);
  }
};
