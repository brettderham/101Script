/*
  Taken from Dr. Raymond Toal's PlainScript language @ https://github.com/rtoal/plainscript
*/

const fs = require('fs');
const assert = require('assert');
const parse = require('../../ast/parser.js');

describe('The grammar', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.IOI')) {
      it(`matches the program ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // In this test we just care that it parses without errors
          assert.ok(parse(input));
          done();
        });
      });
    } else if (name.endsWith('.error')) {
      it(`detects a syntax error in ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          // We always wrap Ohm failures in an error with text "Syntax Error"
          assert.throws(() => parse(input), /Syntax Error/);
          done();
        });
      });
    }
  });
});
