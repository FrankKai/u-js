## u-js

Useful javascript library across Browser and Node.js.

- Support for Browser and Node.js
- Common type checks utils
- Common audio processing utils
- Common blob processing utils
- Common task flow control utils
- Common timer trick utils

### Install

```
// if you have installed yarn
$ yarn add ujf

// npm is also a choice
$ npm install ujf
```

### Features

- Type Check
- Audio Processing
- Blob Processing
- Task flow control
- Timer trick

#### Type Check

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
import { type as typeUtils } from "ujf";

const isStringTest = typeUtils.isString("Yes, I'm a string.");
console.log(isStringTest); // true

// Node.js Environment
const { type } = require("ujf");

const isStringTest = type.isString("Yes, I'm a string.");
console.log(isStringTest); // true

const isNumberTest = type.isNumber("No, I'm a string.");
console.log(isNumberTest); // false
```

#### Audio Processing

- getAudioDuration(source)
  - source
    - { File | Blob | Url } Browser
    - { Url | Path } Node.js

##### Examples

```js
// Browser Environment
import { audio as audioUtils } from "ujf";

audioUtils
  .getAudioDuration("https://foo.bar.baz.com/996.mp3")
  .then(duration => {
    console.log(duration);
  });
// Node.js Environment
const { audio } = require("ujf");

audio.getAudioDuration("../996.mp3").then(duration => {
  console.log(duration);
});
```

#### Blob Processing

- transferBlobFileToBase64(source)
  - source
    - { File | Blob } Browser
    - { ArrayBuffer } Node.js

##### Examples

```js
// Browser Environment
import { blob as blobUtils } from "ujf";

const blobObj = new Blob(["hello world"], { type: "text/plain" });
blobUtils.transferBlobFileToBase64(blobObj).then(base64Str => {
  console.log(base64Str);
});

// Node.js Environment
const { blob } = require("ujf");
const fs = require("fs");

const source = fs.readFileSync("./meta.js");

blob.transferBlobFileToBase64(source).then(base64 => {
  console.log(base64);
});
```

#### Task flow control

- parallelFlow(items, asyncFunc)
  - items
  - asyncFunc

##### Examples

```js
// Node.js Environment
const { task } = require("ujf");

task.parallelFlow(["foo", "bar", "baz"], asyncFunc).then(data => {
  console.log(data); // [ 'hi, foo', 'hi, bar', 'hi, baz' ]
});

function asyncFunc(item) {
  return new Promise(resolve => {
    resolve(`hi, ${item}`);
  });
}
```

#### Timer trick

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
const { timer } = require("ujf");

timer.evenlySpaced(["foo", "bar", "baz"], 1000, data => {
  console.log(data); // "foo"  "bar" "baz"
});
```

```js
// Node.js Environment
const { timer } = require("ujf");
let foo = { initial: 1, target: 10 };

setTimeout(() => {
  foo.initial = 10;
}, 1000);

timer.intervalCondition(
  {
    watcher: foo,
    condition: "watcher.initial === watcher.target",
    clearTimer: 100,
    intervalTimer: 1000
  },
  data => {
    console.log(data); // true
  }
);
```
