'use strict'
const Transform = require('stream').Transform

class Rotate extends Transform{
    constructor(n){
        super()
        this.offset = (n||13) %26
    }
    _transform(buf,enc,next){
        var res = buf.toString().split('').map(c=>{
            var code = c.charCodeAt(0)
            if(c>='a'&&c<='z'){
                code += this.offset
                if(code>'z'.charCodeAt(0)){
                    code -= 26
                }
            }
            return String.fromCharCode(code)
        }).join('')
        this.push(res)
        next()
    }
}
var transform = new Rotate(3)
transform.on('data',data=>process.stdout.write(data))
transform.write('hello')
transform.write('world')
transform.end()