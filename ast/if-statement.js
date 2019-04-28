module.exports = class IfStatement {
  constructor(test, alternate) {
    Object.assign(this, { test, alternate });
  }


  analyze(context) {
    this.test.analyze(context);
    const testContext = context.createChildContextForLoop();
    this.test.analyze(testContext);    
    
    
  
  }
};
