/*
<<<<<<< HEAD
 * Generator Tests
 *
 * Tests that the generated target code, when run, produces the expected output.
=======
 * Adapted from Dr. Toal @ https://github.com/rtoal/plainscript/blob/master/test/generator/generator-test.js
>>>>>>> 8fba0e717708767339473878f96996c60c0e94a0
 */

const fs = require('fs');
const { spawn } = require('child_process');
<<<<<<< HEAD
const { compile } = require('../../plainscript');
=======
const { compile } = require('../../101');
>>>>>>> 8fba0e717708767339473878f96996c60c0e94a0

describe('The code generator', () => {
  fs.readdirSync(__dirname).forEach((name) => {
    if (name.endsWith('.IOI')) {
      test(`produces a behaviorally correct target for ${name}`, (done) => {
        fs.readFile(`${__dirname}/${name}`, 'utf-8', (err, input) => {
          const target = compile(input, {});
          const child = spawn('node', ['-e', target]);
          let output = '';
          child.stdout.on('data', (data) => { output += data; });
          child.on('close', () => {
            fs.readFile(`${__dirname}/${name}.expected`, 'utf-8', (_err, expected) => {
              expect(output).toEqual(expected);
              done();
            });
          });
        });
      });
    }
  });
});