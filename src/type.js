const util = require("util");
const Buffer = require("buffer");

const toString = Object.prototype.toString;
const isNaNNative = Number.isNaN;
const isProxyNative = window ? null : util.types.isProxy;
const isBuffer = Buffer.isBuffer;

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
}

/**
 * @param {Proxy} value The value to be checked
 * @return {boolean} Return true when it's a Proxy
 */
function isProxy(value) {
  if (isProxyNative) {
    return isProxyNative(value);
  }
  return new Error("Proxy Check No Support");
}

/**
 * @param {Object} value The value to be checked
 * @return {boolean} Return true when it's a Object
 */
function isObject(value) {
  const result = value !== null && toString.call(value) === "[object Object]";
  const isSupportProxy = !isError(isProxy());
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
  isString,
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isNaN,
  isArray,
  isFunction,
  isDate,
  isRegExp,
  isError,
  isPromise,
  isSymbol,
  isBigInt,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isArrayBuffer,
  isFormData,
  isBlob,
  isFile,
  isURLSearchParams,
  isProxy,
  isObject,
  isJSON,
  isBuffer
};
