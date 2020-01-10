### 检查类型
```
isString
isNumber
isBoolean
isUndefined
isNull
isNaN
isArray
isFunction
isDate
isRegExp
isError
isPromise
isSymbol
isBigInt
isMap
isSet
isWeakMap
isWeakSet
isArrayBuffer
isFormData
isBlob
isFile
isURLSearchParams
isObject
isJSON
```

### 音频处理
```
getAudioDuration
```

#### 使用示例
```js
const { audio } = require("ujf");

audio.getAudioDuration("../你曾是少年.mp3").then(duration => {
  console.log(duration);
});
```
### blob处理
```
transferBlobFileToBase64
```
#### 使用示例
```js
const { blob } = require("ujf");
const fs = require("fs");

const source = fs.readFileSync("./meta.js");

blob.transferBlobFileToBase64(source).then(base64 => {
  console.log(base64);
});
```