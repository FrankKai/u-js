'use strict'
const Readable = require('stream').Readable

class ToReadable extends Readable {
    constructor (iterator){
        super()
        this.iterator = iterator
    }
    _read(){
        const res = this.iterator.next()
        if(res.done){
            return this.push(null)
        }
        setTimeout(()=>{
            this.push(res.value+'\n')
        },0)
    }
}

module.exports = ToReadable