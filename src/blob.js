const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);
const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

/**
 * * 功能：转换Blob和File为Base64 string
 * * 思路：创建FileReader实例，读取file文件，FileReader实例的loadend事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/8
 * @param source { Blob | File } Browser, { ArrayBuffer } Node.js
 * @return {string} Return the file's Base64 string
 */
function transferBlobFileToBase64(source) {
  return new Promise(resolve => {
    if (isBrowser()) {
      const reader = new FileReader();
      reader.readAsDataURL(source);
      reader.onloadend = () => {
        const fileBase64 = reader.result;
        resolve(fileBase64);
      };
    }
    if (isNode()) {
      const fileBase64 = new Buffer.from(source).toString("base64");
      resolve(fileBase64);
    }
  });
}

module.exports = { transferBlobFileToBase64 };
