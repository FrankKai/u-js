## UJF（Useful JS Functions）
Fullname is Useful JS Functions，my own javascript function library across Browser and Node.js.

- Support for Browser and Node.js
- Common type checks utils
- Common audio processing utils
- Common blob processing utils


### Type Check
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

#### Examples
```js
// Browser Environment
import { type as typeUtils } from 'ujf';

const isStringTest = typeUtils.isString("Yes, I'm a string.");
console.log(isStringTest); // true

// Node.js Environment
const { type } = require("ujf");

const isStringTest = type.isString("Yes, I'm a string.");
console.log(isStringTest); // true

const isNumberTest = type.isNumber("No, I'm a string.");
console.log(isNumberTest); // false
```

### Audio Processing
- getAudioDuration(source) 
  - source 
    - { File | Blob | Url } Browser
    - { Url | Path } Node.js

#### Examples
```js
// Browser Environment
import { audio as audioUtils } from 'ujf';

audioUtils.getAudioDuration("https://foo.bar.baz.com/996.mp3").then(duration => {
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

#### Examples
```js
// Browser Environment
import { blob as blobUtils } from 'ujf';

const blobObj = new Blob(['hello world'], { type: 'text/plain' });
blobUtils.transferBlobFileToBase64(blobObj).then((base64Str) => {
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