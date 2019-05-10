// const util = require('util');

module.exports = class Block {
  constructor(statements) {
    this.statements = statements.filter(s => !Array.isArray(s));
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }
};
