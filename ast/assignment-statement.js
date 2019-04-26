module.exports = class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }

  analyze(context) {
    console.log("this.targets"+ this.targets);
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.sources.forEach(e => e.analyze(context));
    this.targets.forEach(v => v.analyze(context));
  }
};
