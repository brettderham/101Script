module.exports = class Block {
  constructor(statements) {
    this.statements = statements.filter(s => !Array.isArray(s));
  }

  analyze(context) {
    //this.body.statements.forEach(s => s.analyze(context));
    this.statements.forEach(s => s.analyze(context));
  }
};
