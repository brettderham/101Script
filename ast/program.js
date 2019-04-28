const Context = require('../semantics/context');

module.exports = class Program {
  constructor(body) {
    this.body = body;
  }

  analyze() {
    console.log(`Looking up ${this.body}`)
    const context = new Context({ parent: Context.INITIAL });
    this.body.analyze(context);
  }
};
