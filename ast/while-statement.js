module.exports = class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }

  analyze(context) {
    this.test.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.analyze(bodyContext);
  }
};
