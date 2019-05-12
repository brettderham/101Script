// eslint-disable-next-line max-len
// const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let currentL;
let currentR;
module.exports = class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }


  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);

    if (this.left.referent === undefined) {
      if (typeof this.left.value === 'string' || typeof this.left.value === 'number') {
        currentL = this.left.value;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (typeof this.left.referent === 'string' || typeof this.left.referent === 'number') {
        currentL = this.left.referent;
      }
    }
    if (this.right.referent === undefined) {
      if (typeof this.right.value === 'string' || typeof this.right.value === 'number') {
        currentR = this.right.value;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (typeof this.right.referent === 'string' || typeof this.right.referent === 'number') {
        currentR = this.right.referent;
      }
    }

    if ((typeof currentL === 'string' && typeof currentR === 'number') || (typeof currentR === 'string' && typeof currentL === 'number')) {
      throw new Error('Incorrect Type Error');
    }
  }

  // optimize() {
  //   this.left = this.left.optimize();
  //   this.right = this.right.optimize();
  //   return this;
  // }
};
