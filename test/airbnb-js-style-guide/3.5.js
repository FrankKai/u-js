function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var original = { a: 1, b: 2
  // const copy = Object.assign({},original,{c:3})
};var copy = Object.assign({}, original, { c: 3 });

var a = copy.a,
    noA = _objectWithoutProperties(copy, ["a"]);

console.log(original, copy, noA);
