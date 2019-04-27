module.exports = class IdentifierExpression {
  constructor(referent) {
    this.referent = referent;
  }

  analyze(context) {
    console.log(`Looking up ${this.referent} for context ${context}`);
    this.referent = context.lookup(this.referent);
  }
};
