var ToReadable = require('./readable.js')

const iterator = function (limit){
    return {
        next:function(){
            if(limit--){
                return {done:false,value:limit+Math.random()}
            }
            return {done:true}
        }
    }
}(10000000)

const readable = new ToReadable(iterator)

readable.on('data',data=>process.stdout.write(data))

readable.on('end',()=>{process.stdout.write('DONE')})