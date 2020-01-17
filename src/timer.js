const typeUtils = require("./type");
/**
 * setTimeout和setInterval工具集
 * 1.循环内每项等间隔运行
 * 2.事件轮询条件是否满足
 */

/**
 * 1.循环内每项等间隔运行
 * @param {*} items 被遍历项
 * @param {*} space 间隔，单位为毫秒
 * @param {*} callback 回调函数
 */
function evenlySpaced(items, space, callback) {
  if (typeUtils.isFunction(callback)) {
    items.forEach((item, i) => {
      setTimeout(() => {
        callback(item);
      }, i * space);
    });
  } else {
    throw new Error("Invalid callback parameter");
  }
}

/**
 * 2.事件轮训条件是否满足
 * @param {*} {watcher, condition, clearTimer, intervalTimer} 监听对象；条件；清除轮询器间隔；轮询器间隔
 * @param {*} callback
 */

function intervalCondition(
  { watcher, condition, clearTimer, intervalTimer },
  callback
) {
  if (typeUtils.isFunction(callback)) {
    const intervalId = setInterval(() => {
      if (eval(condition)) {
        setTimeout(() => {
          clearInterval(intervalId);
        }, clearTimer);
        callback(true);
      }
    }, intervalTimer);
  } else {
    throw new Error("Invalid callback parameter");
  }
}

module.exports = {
  evenlySpaced,
  intervalCondition
};
