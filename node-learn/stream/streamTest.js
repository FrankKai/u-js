var fs = require('fs')
fs.createReadStream("../ujf.js").pipe(process.stdout)