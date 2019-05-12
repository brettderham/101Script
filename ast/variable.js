module.exports = class Variable {
  constructor(id) {
    this.id = id;
  }

  analyze(/* context */) { // eslint-disable-line class-methods-use-this
  }

  optimize() {
    return this;
  }
};
