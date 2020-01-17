/**
 * 流程控制工具集
 * 1.串行控制
 * 2.并行控制
 */

/**
 * 1.串行控制：一个接着一个发请求
 * @param {*} items
 * @param {*} asyncFunc
 */

function seriesFlow(items, asyncFunc) {
  const result = [];
  items.forEach(async (item, i) => {
    result[i] = await asyncFunc(item);
  });
  return result;
}

/**
 * 2.并行控制：请求一次性并行发出
 * @param {*} items
 * @param {*} asyncFunc
 */

function parallelFlow(items, asyncFunc) {
  return new Promise((resolve, reject) => {
    const promises = [];
    items.forEach((item, i) => {
      promises[i] = asyncFunc(item);
    });
    return Promise.all(promises)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  seriesFlow,
  parallelFlow
};
