module.exports = class IdentifierExpression {
  constructor(referent) {
    this.referent = referent;
  }

  analyze(context) {
    this.referent = context.lookup(this.referent);
  }
};
