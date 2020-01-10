const { audio } = require("../../dist/index");

audio.getAudioDuration("../你曾是少年.mp3").then(duration => {
  console.log(duration);
});
