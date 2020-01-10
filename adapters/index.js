const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);
const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

if (isBrowser()) {
  module.exports = require("./browser");
}

if (isNode()) {
  module.exports = require("./node");
}
