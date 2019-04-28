const NewObject = require('./new-object');

module.exports = class ClassDeclaration {
  constructor(id, params, body) {
    this.id = id;
    this.function = new NewObject(id, params, body);
    this.body = body.filter(s => !Array.isArray(s))
  }
};
