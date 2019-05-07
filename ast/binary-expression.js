module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }

  analyze(context) {
    console.log(this.left);
    this.left.analyze(context);
    this.right.analyze(context);
  }
};
