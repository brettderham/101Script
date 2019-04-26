module.exports = class AssignmentStatement {
  constructor(target, sources) {
    Object.assign(this, { target, sources });
  }

  analyze(context) {
      this.sources.analyze(context);
      this.target.analyze(context);

      if (this.target == id) {
        this.referent = this.referent.analyze();
      }
    
    // this.sources.analyze(context);
    // this.statements.target.analyze(context); // add(context.id);
    //  if(this.target) {
    //    this.target.lookup(context.id);
    //  }
  }
};
