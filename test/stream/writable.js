//可写流

const Writable = require('stream').Writable

const writable = Writable()

writable._write = function(data,enc,next){
    process.stdout.write(data.toString().toUpperCase())
    process.nextTick(next)
}

writable.on('finish',()=>process.stdout.write('DONE'))

writable.write('a'+'\n')
writable.write('b'+'\n')
writable.write('c'+'\n')

writable.end()