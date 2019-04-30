const fs = require('fs');
const parse = require('../../syntax/parser');

describe('The semantic analyzer', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.error')) {
      test(`detects a ${name.replace(/[^a-z]/g, ' ')}`, (done) => {
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' '), 'i');
        expect(() => program.analyze()).toThrow(Error);
        done();
      });
    } else if (name.endsWith('.IOI')) {
      test(`should analyze ${name} without errors`, (done) => {
        // For now, we are happy to know that these files pass semantic analysis.
        // We eventually need to check that the ASTs are properly decorated.
        const program = parse(fs.readFileSync(`${__dirname}/${name}`, 'utf-8'));
        program.analyze();
        done();
      });
    }
  });
});
