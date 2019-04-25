module.exports = class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }

  analyze(context) {
    this.callee = context.lookup(this.callee);
    context.assertIsFunction(this.callee);
    this.checkArgumentMatching(this.callee);
    this.args.forEach(arg => arg.analyze(context));
  }
};
