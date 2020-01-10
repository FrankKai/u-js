const fs = require("fs");
const { blob } = require("../../dist/index");

const bitmap = fs.readFileSync("./meta.js");

blob.transferBlobFileToBase64(bitmap).then(objBase64 => {
  console.log(objBase64);
});
