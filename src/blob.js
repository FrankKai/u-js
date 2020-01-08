/**
 * * 功能：转换Blob和File为Base64 string
 * * 思路：创建FileReader实例，读取file文件，FileReader实例的loadend事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/8
 * @param {Blob|File} file The file to be transform
 * @return {number} Return the file's Base64 string
 */
async function transferBlobFileToBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const fileBase64 = reader.result;
      resolve(fileBase64);
    };
  });
}
export default { transferBlobFileToBase64 };
