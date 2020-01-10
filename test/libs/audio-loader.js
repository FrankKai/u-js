const audioLoad = require("audio-loader");
const mp3Path = "../你曾是少年.mp3";

audioLoad(mp3Path).then(function(buffer) {
  console.log(buffer.duration);
});
