## u-js

跨浏览器和 Node.js 的实用 js 库。

- 支持浏览器和Node.js环境
- 常用的类型检查工具
- 常用的音频处理工具
- 常用blob处理工具
- 常会任务流控制工具
- 常用的Timer技巧工具

### Install

```
// 如果你已经安装了yarn
$ yarn add @frankkai/u-js

// 同样，也可以选择npm
$ npm install @frankkai/u-js
```

### Features

- 类型检查
- 音频处理
- blob处理
- 任务流控制
- Timer技巧

#### 类型检查

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

##### Examples

```js
// Browser Environment
import { type as typeUtils } from "@frankkai/u-js";

const isStringTest = typeUtils.isString("Yes, I'm a string.");
console.log(isStringTest); // true

// Node.js Environment
const { type } = require("@frankkai/u-js");

const isStringTest = type.isString("Yes, I'm a string.");
console.log(isStringTest); // true

const isNumberTest = type.isNumber("No, I'm a string.");
console.log(isNumberTest); // false
```

#### 音频处理

- getAudioDuration(source)
  - source
    - { File | Blob | Url } Browser
    - { Url | Path } Node.js

##### Examples

```js
// Browser Environment
import { audio as audioUtils } from "@frankkai/u-js";

audioUtils
  .getAudioDuration("https://foo.bar.baz.com/996.mp3")
  .then((duration) => {
    console.log(duration);
  });
// Node.js Environment
const { audio } = require("@frankkai/u-js");

audio.getAudioDuration("../996.mp3").then((duration) => {
  console.log(duration);
});
```

#### blob处理

- transferBlobFileToBase64(source)
  - source
    - { File | Blob } Browser
    - { ArrayBuffer } Node.js

##### Examples

```js
// Browser Environment
import { blob as blobUtils } from "@frankkai/u-js";

const blobObj = new Blob(["hello world"], { type: "text/plain" });
blobUtils.transferBlobFileToBase64(blobObj).then((base64Str) => {
  console.log(base64Str);
});

// Node.js Environment
const { blob } = require("@frankkai/u-js");
const fs = require("fs");

const source = fs.readFileSync("./meta.js");

blob.transferBlobFileToBase64(source).then((base64) => {
  console.log(base64);
});
```

#### 任务流控制

- parallelFlow(items, asyncFunc)
  - items
  - asyncFunc

##### Examples

```js
// Node.js Environment
const { task } = require("@frankkai/u-js");

task.parallelFlow(["foo", "bar", "baz"], asyncFunc).then((data) => {
  console.log(data); // [ 'hi, foo', 'hi, bar', 'hi, baz' ]
});

function asyncFunc(item) {
  return new Promise((resolve) => {
    resolve(`hi, ${item}`);
  });
}
```

#### 常用的Timer技巧工具

- evenlySpaced(items, space, callback)
  - items
  - space
  - callback
- intervalCondition({ watcher, condition, clearTimer, intervalTimer }, callback)
  - watcher
  - condition
  - clearTimer
  - intervalTimer

##### Examples

```js
// Node.js Environment
const { timer } = require("@frankkai/u-js");

timer.evenlySpaced(["foo", "bar", "baz"], 1000, (data) => {
  console.log(data); // "foo"  "bar" "baz"
});
```

```js
// Node.js Environment
const { timer } = require("@frankkai/u-js");
let foo = { initial: 1, target: 10 };

setTimeout(() => {
  foo.initial = 10;
}, 1000);

timer.intervalCondition(
  {
    watcher: foo,
    condition: "watcher.initial === watcher.target",
    clearTimer: 100,
    intervalTimer: 1000,
  },
  (data) => {
    console.log(data); // true
  }
);
```
