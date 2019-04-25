module.exports = class Block {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.body.statements.forEach(s => s.analyze(context));
  }
};
