const { Func, Param, PrimitiveType } = require('../ast');

const IntType = new PrimitiveType('int');
const StringType = new PrimitiveType('string');
const NilType = new PrimitiveType('nil');

const standardFunctions = [
  new Func('print', [new Param('s', StringType)]),
  new Func('getchar', [], StringType),
  new Func('size', [new Param('s', StringType)], IntType)
];

const mathFunctions = [
    new Func("sqrt", [new Param("x", IntType)]),
    new Func("abs", [new Param("x", IntType)]),
]

module.exports = { IntType, StringType, NilType, standardFunctions };
