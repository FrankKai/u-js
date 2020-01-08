"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var UJF = function UJF() {
    this.version = "0.0.1";
};
UJF.prototype = {
    checkType: function checkType(data) {
        if (typeof data == "string") {
            console.log("字符串字面量");
        } else if (typeof data == "number") {
            console.log("数值字面量");
        } else if (typeof data == "boolean") {
            console.log("布尔值字面量");
        } else if (typeof data == "undefined") {
            console.log("undefined特殊类型");
        } else if (data instanceof Array) {
            console.log("数组对象子类型");
        } else if (data instanceof Function) {
            console.log("函数对象子类型");
        } else if (data instanceof Date) {
            console.log("日期对象子类型");
        } else if (data instanceof RegExp) {
            console.log("正则对象子类型");
        } else if (data instanceof Error) {
            console.log("错误对象子类型");
        } else if (Object.prototype.toString.call(data) == "[object Object]") {
            console.log("对象类型");
        } else if (Object.prototype.toString.call(data) == "[object Null]") {
            console.log("null特殊类型");
        } else if (Object.prototype.toString.call(data) == "[object Promise]") {
            console.log("promise类型");
        } else {
            console.log("未知类型");
        }
    },
    isArray: function isArray(arr) {
        var toString = Object.prototype.toString;
        return toString.call(arr) === "[object Array]";
    },

    isArrayHasElement: function isArrayHasElement(arr) {
        return UJF.prototype.isArray(arr) && arr.length > 0;
    },
    isObject: function isObject(obj) {
        return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object';
    },
    isPromise: function isPromise(val) {
        return val && typeof val.then === 'function';
    },

    arraySort: function arraySort(arr) {
        arr = arr || [];
        arr.sort(function (x, y) {
            return x > y;
        });
        return arr;
    },
    arrayDistinct: function arrayDistinct(arr) {
        return [].concat(_toConsumableArray(new Set(arr)));
        //return Array.from(new Set(arr));
    },
    deepCopyObj: function deepCopyObj(original) {
        var copy = {};
        Object.keys(original).forEach(function (key) {
            copy[key] = original[key];
        });
        return copy;
    },
    resolveUrl: function resolveUrl(Url) {
        "use strict";
        //'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&'→"a=1&b=2&c=&d=xxx&"

        function getSearch(Url) {
            var indexReg = /\?/;
            var resultArr = indexReg.exec(Url);
            var searchStr = Url.substr(resultArr['index'] + 1);
            return searchStr;
        }
        var mnwUrl = 'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&';
        var searchResult = getUrlParameter(mnwUrl);

        //"a=1&b=2&c=&d=xxx&"→["a=1","b=2","c=","d=xxx"]
        function getPara(result) {
            if (result !== '') {
                var paraReg = /\&/g;
                var paraArr = [],
                    para = '';
                var circle = '';
                paraArr = paraReg.exec(result);
                para = result.substring(0, paraArr.index);
                arr.push(para);
                circle = result.substr(paraArr['index'] + 1);
                getPara(circle);
            } else {
                console.log("遍历结束");
            }
        }
        var arr = [];
        getPara(searchResult);
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var mid = arr[i];
            var key = mid.substring(0, mid.indexOf("="));
            var value = mid.substr(mid.indexOf("=") + 1);
            obj[key] = value;
        }
        return JSON.stringify(obj);
    },
    cached: function cached(fn) {
        var cache = Object.create(null);
        return function cachedFn(str) {
            var hit = cache[str];
            return hit || (cache[str] = fn(str));
        };
    },
    camlize: function camlize(str) {
        var camelizeRE = /-(\w)/g;
        var result = str.replace(camelizeRE, function (_, w, offset, str) {
            /*Cannot use p2/p3/p4,only four key parameters:match,word(s),offset,str*/
            return w ? w.toUpperCase() : '';
        });
        return result;
    },
    hyphenate: function hyphenate(str) {
        var hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, function (_, c) {
            return c ? "-" + c.toLowerCase() : '';
        });
    },
    hasOwn: function hasOwn(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    },
    toArray: function toArray(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
            ret[i] = list[i + start];
        }
        return ret;
    },
    getObjDetails: function getObjDetails(obj, getKey, getValue) {
        var keysArr = [],
            valuesArr = [];
        var fullArr = [];
        for (var key in obj) {
            keysArr.push(key);
            valuesArr.push(obj[key]);
        }
        fullArr.push(keysArr);
        fullArr.push(valuesArr);
        return getKey && getValue ? fullArr : getKey ? keysArr : getValue ? valuesArr : [];
    },
    extendObj: function extendObj(extendedObj, sourceObj) {
        for (var key in sourceObj) {
            extendedObj[key] = sourceObj[key];
        }
        return extendedObj;
    },
    arrToObj: function arrToObj(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[i] = arr[i];
        }
        return obj;
    },
    no: function no(a, b, c) {
        return false;
    },
    identity: function identity(_) {
        return _;
    },
    arrMin: function arrMin(arr) {
        console.log(this);
        var min = Math.min.apply(null, arr);
        var idx = arr.indexOf(min);
        var obj = {};
        obj.min = min;
        obj.idx = idx;
        return obj;
    },
    getDecimalLength: function getDecimalLength(num) {
        var numStr = num + '';
        var decimalLength = numStr.length - (numStr.indexOf('.') + 1);
        return decimalLength;
    },
    parFixed: function parFixed(value, precision) {
        return parseFloat(value.toFixed(precision));
    },
    /*在不知道浮点数位数时应该怎样判断两个浮点数之和与第三数是否相等？*/
    decimalTest: function decimalTest(x, y, z) {
        var L = UJF.prototype.getDecimalLength;
        var C = UJF.prototype.parFixed;
        var maxDecimal = Math.min.apply(null, [L(x + y), L(z)]);
        return C(x + y, maxDecimal) === C(z, maxDecimal);
    }
};
module.exports = UJF;
