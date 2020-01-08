const { blob, type, audio } = require("../../dist/index");

console.log(blob, type, audio);

const stringTest = type.isString('1');
console.log(stringTest);
