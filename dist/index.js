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

/**
 * * 功能：获取音频文件时长(audio duration)
 * * 思路：创建伪<audio>，加载audio文件，<audio>的durationChange事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/7
 * @param {File|Url} source The source to be analyse
 * @return {number} Return the audio's duration
 */
function getAudioDuration(source) {
  return new Promise(function (resolve) {
    var audioElement = document.createElement("audio");
    audioElement.src = window.URL.createObjectURL(source);

    audioElement.ondurationchange = function (e) {
      var duration = e.path[0].duration;
      resolve(duration);
      URL.revokeObjectURL(audioElement.src);
    };
  });
}

module.exports = {
  getAudioDuration: getAudioDuration
};
},{}],"blob.js":[function(require,module,exports) {
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * * 功能：转换Blob和File为Base64 string
 * * 思路：创建FileReader实例，读取file文件，FileReader实例的loadend事件触发获得duration
 * * 作者：高凯
 * * 日期：2019/11/8
 * @param {Blob|File} file The file to be transform
 * @return {number} Return the file's Base64 string
 */
function transferBlobFileToBase64(_x) {
  return _transferBlobFileToBase.apply(this, arguments);
}

function _transferBlobFileToBase() {
  _transferBlobFileToBase = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(file) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var reader = new FileReader();
              reader.readAsDataURL(file);

              reader.onloadend = function () {
                var fileBase64 = reader.result;
                resolve(fileBase64);
              };
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _transferBlobFileToBase.apply(this, arguments);
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var audio = require("./audio");

var blob = require("./blob");

var type = require("./type");

module.exports = {
  audio: audio,
  blob: blob,
  type: type
};
},{"./audio":"audio.js","./blob":"blob.js","./type":"type.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61994" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map