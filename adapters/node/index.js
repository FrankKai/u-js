// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"audio.js":[function(require,module,exports) {
"use strict";

var audioLoad = require("audio-loader");

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");
/**
 * * 功能：获取音频文件时长(audio duration)
 * * 思路：创建伪<audio>，加载audio文件，<audio>的durationChange事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/7
 * @param source { File | Blob | Url } Browser, { Url | Path } Node.js
 * @return {number} Return the audio's duration
 */

function getAudioDuration(source) {
  return new Promise(function (resolve) {
    if (isBrowser()) {
      var audioElement = document.createElement("audio");
      var src = typeof source === "string" ? source : window.URL.createObjectURL(source);
      audioElement.src = src;

      audioElement.ondurationchange = function (e) {
        var duration = e.path[0].duration;
        resolve(duration);
        URL.revokeObjectURL(audioElement.src);
      };
    }

    if (isNode()) {
      audioLoad(source).then(function (buffer) {
        resolve(buffer.duration);
      });
    }
  });
}

module.exports = {
  getAudioDuration: getAudioDuration
};
},{}],"blob.js":[function(require,module,exports) {
"use strict";

var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
var isNode = new Function("try {return this===global;}catch(e){return false;}");
/**
 * * 功能：转换Blob和File为Base64 string
 * * 思路：创建FileReader实例，读取file文件，FileReader实例的loadend事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/8
 * @param source { Blob | File } Browser, { ArrayBuffer } Node.js
 * @return {string} Return the file's Base64 string
 */

function transferBlobFileToBase64(source) {
  return new Promise(function (resolve) {
    if (isBrowser()) {
      var reader = new FileReader();
      reader.readAsDataURL(source);

      reader.onloadend = function () {
        var fileBase64 = reader.result;
        resolve(fileBase64);
      };
    }

    if (isNode()) {
      var fileBase64 = new Buffer.from(source).toString("base64");
      resolve(fileBase64);
    }
  });
}

module.exports = {
  transferBlobFileToBase64: transferBlobFileToBase64
};
},{}],"type.js":[function(require,module,exports) {
"use strict";

// const util = require("util");
// const Buffer = require("buffer");
var toString = Object.prototype.toString;
var isNaNNative = Number.isNaN; // const isProxyNative = window ? null : util.types.isProxy;
// const isBuffer = Buffer.isBuffer;

/**
 * @param {string} value The value to be checked
 * @return {boolean} Return true when it's a string
 */

function isString(value) {
  return toString.call(value) === "[object String]";
}
/**
 * @param {number} value The value to be checked
 * @return {boolean} Return true when it's a number
 */


function isNumber(value) {
  return toString.call(value) === "[object Number]";
}
/**
 * @param {boolean} value The value to be checked
 * @return {boolean} Return true when it's a boolean
 */


function isBoolean(value) {
  return toString.call(value) === "[object Boolean]";
}
/**
 * @param {undefined} value The value to be checked
 * @return {boolean} Return true when it's a undefined
 */


function isUndefined(value) {
  return toString.call(value) === "[object Undefined]";
}
/**
 * @param {null} value The value to be checked
 * @return {boolean} Return true when it's a null
 */


function isNull(value) {
  return toString.call(value) === "[object Null]";
}
/**
 * @param {NaN} value The value to be checked
 * @return {boolean} Return true when it's a NaN
 */


function isNaN(value) {
  return isNaNNative(value) && toString.call(value) === "[object Number]";
}
/**
 * @param {Array} value The value to be checked
 * @return {boolean} Return true when it's a Array
 */


function isArray(value) {
  return toString.call(value) === "[object Array]";
}
/**
 * @param {Function} value The value to be checked
 * @return {boolean} Return true when it's a Function
 */


function isFunction(value) {
  return toString.call(value) === "[object Function]";
}
/**
 * @param {Date} value The value to be checked
 * @return {boolean} Return true when it's a Date
 */


function isDate(value) {
  return toString.call(value) === "[object Date]";
}
/**
 * @param {RegExp} value The value to be checked
 * @return {boolean} Return true when it's a RegExp
 */


function isRegExp(value) {
  return toString.call(value) === "[object RegExp]";
}
/**
 * @param {Error} value The value to be checked
 * @return {boolean} Return true when it's a Error
 */


function isError(value) {
  return toString.call(value) === "[object Error]";
}
/**
 * @param {Promise} value The value to be checked
 * @return {boolean} Return true when it's a Promise
 */


function isPromise(value) {
  return toString.call(value) === "[object Promise]";
}
/**
 * @param {Symbol} value The value to be checked
 * @return {boolean} Return true when it's a Symbol
 */


function isSymbol(value) {
  return toString.call(value) === "[object Symbol]";
}
/**
 * @param {BigInt} value The value to be checked
 * @return {boolean} Return true when it's a BigInt
 */


function isBigInt(value) {
  return toString.call(value) === "[object BigInt]";
}
/**
 * @param {Map} value The value to be checked
 * @return {boolean} Return true when it's a Map
 */


function isMap(value) {
  return toString.call(value) === "[object Map]";
}
/**
 * @param {Set} value The value to be checked
 * @return {boolean} Return true when it's a Set
 */


function isSet(value) {
  return toString.call(value) === "[object Set]";
}
/**
 * @param {WeakMap} value The value to be checked
 * @return {boolean} Return true when it's a WeakMap
 */


function isWeakMap(value) {
  return toString.call(value) === "[object WeakMap]";
}
/**
 * @param {WeakSet} value The value to be checked
 * @return {boolean} Return true when it's a WeakSet
 */


function isWeakSet(value) {
  return toString.call(value) === "[object WeakSet]";
}
/**
 * @param {ArrayBuffer} value The value to be checked
 * @return {boolean} Return true when it's a ArrayBuffer
 */


function isArrayBuffer(value) {
  return toString.call(value) === "[object ArrayBuffer]";
}
/**
 * @param {FormData} value The value to be checked
 * @return {boolean} Return true when it's a FormData
 */


function isFormData(value) {
  return toString.call(value) === "[object FormData]";
}
/**
 * @param {Blob} value The value to be checked
 * @return {boolean} Return true when it's a Blob
 */


function isBlob(value) {
  return toString.call(value) === "[object Blob]";
}
/**
 * @param {File} value The value to be checked
 * @return {boolean} Return true when it's a File
 */


function isFile(value) {
  return toString.call(value) === "[object File]";
}
/**
 * @param {URLSearchParams} value The value to be checked
 * @return {boolean} Return true when it's a URLSearchParams
 */


function isURLSearchParams(value) {
  return toString.call(value) === "[object URLSearchParams]";
} // /**
//  * @param {Proxy} value The value to be checked
//  * @return {boolean} Return true when it's a Proxy
//  */
// function isProxy(value) {
//   if (isProxyNative) {
//     return isProxyNative(value);
//   }
//   return new Error("Proxy Check No Support");
// }

/**
 * @param {Object} value The value to be checked
 * @return {boolean} Return true when it's a Object
 */


function isObject(value) {
  var result = value !== null && toString.call(value) === "[object Object]";
  var isSupportProxy = !isError(isProxy());

  if (isSupportProxy) {
    return result && isProxy(value);
  }

  return result;
}
/**
 * @param {JSON} value The value to be checked
 * @return {boolean} Return true when it's a JSON
 */


function isJSON(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }

  return true;
}

module.exports = {
  isString: isString,
  isNumber: isNumber,
  isBoolean: isBoolean,
  isUndefined: isUndefined,
  isNull: isNull,
  isNaN: isNaN,
  isArray: isArray,
  isFunction: isFunction,
  isDate: isDate,
  isRegExp: isRegExp,
  isError: isError,
  isPromise: isPromise,
  isSymbol: isSymbol,
  isBigInt: isBigInt,
  isMap: isMap,
  isSet: isSet,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isBlob: isBlob,
  isFile: isFile,
  isURLSearchParams: isURLSearchParams,
  // isProxy,
  isObject: isObject,
  isJSON: isJSON // isBuffer

};
},{}],"task.js":[function(require,module,exports) {
"use strict";

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
  var result = [];
  items.forEach(async function (item, i) {
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
  return new Promise(function (resolve, reject) {
    var promises = [];
    items.forEach(function (item, i) {
      promises[i] = asyncFunc(item);
    });
    return Promise.all(promises).then(function (data) {
      resolve(data);
    })["catch"](function (err) {
      reject(err);
    });
  });
}

module.exports = {
  seriesFlow: seriesFlow,
  parallelFlow: parallelFlow
};
},{}],"timer.js":[function(require,module,exports) {
"use strict";

var typeUtils = require("./type");
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
    items.forEach(function (item, i) {
      setTimeout(function () {
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


function intervalCondition(_ref, callback) {
  var watcher = _ref.watcher,
      condition = _ref.condition,
      clearTimer = _ref.clearTimer,
      intervalTimer = _ref.intervalTimer;

  if (typeUtils.isFunction(callback)) {
    var intervalId = setInterval(function () {
      if (eval(condition)) {
        setTimeout(function () {
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
  evenlySpaced: evenlySpaced,
  intervalCondition: intervalCondition
};
},{"./type":"type.js"}],"index.js":[function(require,module,exports) {
"use strict";

var audio = require("./audio");

var blob = require("./blob");

var type = require("./type");

var task = require("./task");

var timer = require("./timer");

module.exports = {
  audio: audio,
  blob: blob,
  type: type,
  task: task,
  timer: timer
};
},{"./audio":"audio.js","./blob":"blob.js","./type":"type.js","./task":"task.js","./timer":"timer.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map