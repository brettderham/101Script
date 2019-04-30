//const PrimitiveType = require("../ast/primitive-types");
const Func = require("../ast/new-object");
const Param = require("../ast/parameter");

// const NumType = new PrimitiveType("num");
// const StringType = new PrimitiveType("string");
// const BooleanType = new PrimitiveType("boo");

const StandardFunctions = [
  new Func("print", "void", [new Param("s", "void")]),
//   new Func("void", "exit", [new Param(NumType, "code")]),
//   new Func("num", "len", [new Param("void", "s")]),
];

// const StringFunctions = [
//   new Func(StringType, "substring", [
//     new Param("s", StringType),
//     new Param("start", NumType),
//     new Param("end", NumType),
//   ])
// ];

// const MathFunctions = [
//   new Func(NumType, "abs", [new Param(NumType, "n")]),
//   new Func(NumType, "sqrt", [new Param(NumType, "n")]),
//   new Func(NumType, "pi", []),
//   new Func(NumType, "random", [
//     new Param(NumType, "start"),
//     new Param(NumType, "end"),
//   ]),
//   new Func(NumType, "pow", [new Param(NumType, "x"), new Param(NumType, "y")]),
// ];

// const ListFunctions = [
//   // TODO: append(value)
//   // TODO: prepend(value)
//   // TODO: insert(index, value)
//   // TODO: remove(index)
// ];

// const SetFunctions = [
//   // TODO: add(value)
//   // TODO: remove(value)
// ];

// const DictFunctions = [
//   // TODO: add(key)
//   // TODO: remove(key)
//   // TODO: update(key, value)
//   // TODO: getValue(key)
//   // TODO: keys()
//   // TODO: values()
//   // TODO: items()
// ]

module.exports = {
//   NumType,
//   StringType,
//   BooleanType,
  StandardFunctions,
//   StringFunctions
//   MathFunctions,
};
