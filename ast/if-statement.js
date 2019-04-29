module.exports = class IfStatement {
  constructor(test, alternate) {
    Object.assign(this, { test, alternate });
  }


  analyze(context) {
    // console.log(this.test.id);
    // if (context.lookup(this.test.id)){
    //   this.test.id = context.lookup(this.test.id);
    // }
    this.test.analyze(context);
    const testContext = context.createChildContextForLoop();
    this.test.analyze(testContext);    
    
    
  
  }
};
