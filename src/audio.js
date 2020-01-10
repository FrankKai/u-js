const audioLoad = require("audio-loader");
const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);
const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);
/**
 * * 功能：获取音频文件时长(audio duration)
 * * 思路：创建伪<audio>，加载audio文件，<audio>的durationChange事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/7
 * @param source { File | Blob | Url } Browser, { Url | Path } Node.js
 * @return {number} Return the audio's duration
 */

function getAudioDuration(source) {
  return new Promise(resolve => {
    if (isBrowser()) {
      const audioElement = document.createElement("audio");
      const src =
        typeof source === "string"
          ? source
          : window.URL.createObjectURL(source);
      audioElement.src = src;
      audioElement.ondurationchange = e => {
        const duration = e.path[0].duration;
        resolve(duration);
        URL.revokeObjectURL(audioElement.src);
      };
    }
    if (isNode()) {
      audioLoad(source).then(function(buffer) {
        resolve(buffer.duration);
      });
    }
  });
}

module.exports = { getAudioDuration };
