module.exports = class IfStatement {
  constructor(test, alternate) {
    Object.assign(this, { test, alternate });
  }


  analyze(context) {
    console.log("this.cases = " + this.cases);
    this.cases.forEach(c => c.analyze(context.createChildContextForBlock()));
    if (this.alternate) {
      this.alternate.forEach(s => s.analyze(context.createChildContextForBlock()));
    }
  }
};
