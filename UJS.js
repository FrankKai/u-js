var UJS = function(){
    this.version="0.0.1";
};
UJS.prototype={
    _checkType:function(data){
        if(typeof data=="string")
        {
            console.log("字符串字面量");
        }
        else if(typeof data=="number")
        {
            console.log("数值字面量")
        }
        else if(typeof data=="boolean")
        {
            console.log("布尔值字面量");
        }
        else if(typeof data=="undefined")
        {
            console.log("undefined特殊类型");
        }
        else if(data instanceof Array)
        {
            console.log("数组对象子类型");
        }
        else if(data instanceof Function)
        {
            console.log("函数对象子类型");
        }
        else if(data instanceof Date)
        {
            console.log("日期对象子类型");
        }
        else if(data instanceof RegExp)
        {
            console.log("正则对象子类型");
        }
        else if(data instanceof Error)
        {
            console.log("错误对象子类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Object]")
        {
            console.log("对象类型");
        }
        else if(c=="[object Null]")
        {
            console.log("null特殊类型");
        }
        else
        {
            console.log("未知类型")
        }
    },
    _arraySort:function(arr){
        arr.sort((x,y)=>(x>y));
        return arr;
    },
    _arrNew : [],
    _arrayDinstinct:function(arr){

        for(var i=0;i<arr.length;i++){
            if(arr[i] instanceof Object && Object.prototype.toString.call(arr[i])!=="[object Null]"){
                if(Object.prototype.toString.call(arr[i])=="[object Object]"){
                    arr.sort((x,y)=>(x.time>y.time));
                    arr.reduce(function(accumulator, currentValue, currentIndex, array){  
                        if(accumulator.time === currentValue.time){
                            array[currentIndex-1]=null;
                        }
                        //console.log(accumulator);
                        return currentValue;
                    });
                    return _arrNew = arr.filter((subarr)=>{return subarr!=null})
                }else{
                    console.log(new Error("UJI暂不支持当前类型数组去重。"))
                }
            }else{
                return [...new Set(this._arraySort(arr))];
            }
        }
        //return [...new Set(arr)];
    }
}

var test=new UJS();
test._checkType("a");
test._arraySort([5,2,3]);
test._arrayDinstinct([2,3,1]);
test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);

/*目前只支持单一元素去重，复杂情况正在研究
①指定key去重:test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}],"time");
②复杂情况对象去重：test._arrayDinstinct([{name:"A",time:1},{name:"B",time:2},{name:"C",time:1},{name:"C",time:1}],"time");
*/

/*当创建一个新的对象实例时，会影响上面方法的输出。例如:console.log(new UJS());*/
