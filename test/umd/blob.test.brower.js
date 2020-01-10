const Blob = require("fetch-blob");
const { blob } = require("../../dist/index");

const objBlob = new Blob(["foo"], { type: "text/plain" });
blob
  .transferBlobFileToBase64(objBlob)
  .then(objBase64 => {
    console.log(objBase64);
  })
  .catch(err => {
    console.log(err);
  });
