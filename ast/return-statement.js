module.exports = class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }

  analyze(context) {
    context.assertInFunction('Return statement outside function');
    if (this.returnValue) {
      this.returnValue.analyze(context);
    }
    context.assertInFunction('Return statement outside function');
  }
};
