var UJF = require('../ujf.js')
var test = new UJF();
test.checkType([1,23,3])
test.checkType(test)
test.checkType(UJF)

var newArr = test.arraySort([5,2,3]);
test._arrayDinstinct([2,3,1]);
test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);


//绑定库中的方法到当前window,实现继承
function camlize(str){
    return UJF.prototype.camlize.call(this,str)
}
camlize("a-b-c-d-e-f-g-hijklmn")

function hyphenate(str){
    return UJF.prototype.hyphenate.apply(this,arguments)
}
hyphenate("regexpResult")

/*Call own method test*/
test.isArrayHasElement([1,2,3])
/*Array-like object to Array test*/
function toArray(){
    function sum(foo,bar){
        return [1,2,3]
    }
    // return sum(1,2)
    return UJF.prototype.toArray(sum(1,2))
}
toArray()
test.getObjDetails({foo:1,bar:2},true,true)
test.getObjDetails({foo:1,bar:2},true,false)
test.getObjDetails({foo:1,bar:2},false,true)