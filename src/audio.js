/**
 * * 功能：获取音频文件时长(audio duration)
 * * 思路：创建伪<audio>，加载audio文件，<audio>的durationChange事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/7
 * @param {File|Url} source The source to be analyse
 * @return {number} Return the audio's duration
 */

function getAudioDuration(source) {
  return new Promise(resolve => {
    const audioElement = document.createElement("audio");
    audioElement.src = window.URL.createObjectURL(source);
    audioElement.ondurationchange = e => {
      const duration = e.path[0].duration;
      resolve(duration);
      URL.revokeObjectURL(audioElement.src);
    };
  });
}
export default { getAudioDuration };
