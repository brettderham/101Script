const ohm = require('ohm-js')
const fs = require('fs')

const grammar = ohm.grammar(fs.readFileSync('./syntax/101Script.ohm'))module.exports = (text) => {
    const match = grammar.match(text);
    if (!match.succeeded()) {
    throw match.message;
    }
    return match.succeeded()
}