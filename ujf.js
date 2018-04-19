/**
 * desc: 常用函数库
 * author : frank
 */
var UJF = function(){
    this.version="0.0.1";
};
UJF.prototype={
/**
* desc: 什么类型？
* @param {string||number||boolean||undefined||null||Array||Function||Date||RegExp||Error||Promise||Object} data
* log:  类型打印信息
*/
    checkType(data){
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
        else if(Object.prototype.toString.call(data)=="[object Null]")
        {
            console.log("null特殊类型");
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
        else if(Object.prototype.toString.call(data)=="[object Promise]")
        {
            console.log("promise类型");
        }
        else if(Object.prototype.toString.call(data)=="[object Object]")
        {
            console.log("对象类型");
        }
        else{
            console.log("未知类型")
        }
    },
/**
* desc: 是数组吗？
* @param {Array} arr 
* return {Boolean}
*/
    isArray(arr){
        var toString = Object.prototype.toString
        return toString.call(arr) === "[object Array]"
    },
/**
* desc: 数组中有元素吗？
* @param {Array} arr
* return {Boolean}
*/
    isArrayHasElement:function(arr){
        return UJF.prototype.isArray(arr) && arr.length>0
    },
/**
* desc: 是对象吗？
* @param {Object} obj
* return {Boolean}
*/
    isObject:function(obj){
        return obj !== null && typeof obj === 'object'
    },
/**
* desc: 是Promise对象吗？
* @param {Promise} val
* return {Boolean} 
*/
    isPromise(val){
        return val && typeof val.then === 'function'
    },
/**
* desc: 纯函数式排序,可选从大到小,从小到大
* @param {Array,string} arr
* return {Array} 
*/
    arraySort:function(arr,type){
		var pureArr = arr.map((x)=>x) || [];
		var localType = type || "";
		var mapCallback = null;
		switch (localType){
			case "small-to-big":{
				mapCallback = (x,y)=>(x>y);
				break;
			}
			case "big-to-small":{
				mapCallback = (x,y)=>(x<y);
				break;
			}
			default:
				mapCallback = (x,y)=>(x>y);
				break;
		}
        pureArr.sort(mapCallback);
        return pureArr;
    },
/**
* desc: 纯函数式去重数组
* @param {Array} arr
* return {Array}
*/
    arrayDistinct:function(arr){
		var pureArr = [...new Set(arr)];
        return pureArr;
        //return Array.from(pureArr);
	},
/**
* desc: 深拷贝对象
* @param {Object} obj
* return {Object}
*/
    deepCopyObj:function(original){
        let copy = {}
        Object.keys(original).forEach(key=>{
            copy[key] = original[key]
        })
        return copy
	},
/**
* desc: 解析Url查询参数为JSON
* @param {string} Url
* return {string}
* eg:"http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&"→"{"a":"1","b":"2","c":"","d":"xxx"}"
*/
    resolveUrl:function(Url){
        "use strict"
        //'http://m.manaowan.com/index.html?a=1&b=2&c=&d=xxx&'→"a=1&b=2&c=&d=xxx&"
        function getSearch(Url){
            let indexReg=/\?/
            let resultArr = indexReg.exec(Url)
            let searchStr = Url.substr(resultArr['index']+1)
            return searchStr
        }
        var mnwUrl = Url;
        var searchResult = getSearch(mnwUrl);
        
        //"a=1&b=2&c=&d=xxx&"→["a=1","b=2","c=","d=xxx"]
        function getPara(result){
            if(result!==''){
                let paraReg=/\&/g
                let paraArr=[],
                    para='';
                let circle = ''
                paraArr = paraReg.exec(result)
                para = result.substring(0,paraArr.index)
                arr.push(para)
                circle = result.substr(paraArr['index']+1)
                getPara(circle)
            }else{
                console.log("遍历结束")
            }
        }
        var arr = []
		getPara(searchResult)

		//["a=1","b=2","c=","d=xxx"]→"{"a":"1","b":"2","c":"","d":"xxx"}"
        var obj = {}
        for(let i =0 ;i<arr.length;i++){
            let mid = arr[i]
            let key = mid.substring(0,mid.indexOf("="))
            let value = mid.substr(mid.indexOf("=")+1)
            obj[key] = value
        }
        return JSON.stringify(obj)
	},
/**
 * desc: 缓存函数
 */
    cached:function(fn) {
        var cache = Object.create(null);
        return (function cachedFn (str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str))
        })
	  },
/**
 * desc: 驼峰化
 * @param {string} str
 * return {string}
 */
    camlize:function(str){
        var camelizeRE = /-(\w)/g
        var result = str.replace(camelizeRE,function(_,w,offset,str){/*Cannot use p2/p3/p4,only four key parameters:match,word(s),offset,str*/
            return w?w.toUpperCase():'';
        })
        return result
	},
/**
 * desc: 连字符化
 * @param {string} str
 * return {string}
 */
    hyphenate:function(str){
        var hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, function(_,c){
            return c?"-"+c.toLowerCase():''
        })
	},
/**
 * desc: 对象自检键存在性
 * @param {Object,string}
 * return {Boolean}
 */
    hasOwn:function(obj,key){
        return Object.prototype.hasOwnProperty.call(obj,key)
	},
/**
 * desc: 截取数组
 * @param {Array,number}
 * return {Array}
 */
    toArray: function(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
          ret[i] = list[i + start];
        }
        return ret
	},
/**
 * desc: 获取对象键数组，值数组和键值数组
 * @param {Object,boolean,boolean}
 * return {Array}
 */
    getObjDetails:function(obj,getKey,getValue){
        var keysArr = [],valuesArr = [];
        var fullArr=[];
        for(var key in obj){
            keysArr.push(key)
            valuesArr.push(obj[key])
        }
        fullArr.push(keysArr)
        fullArr.push(valuesArr)
        return getKey&&getValue ? fullArr
               :getKey?keysArr
                :getValue?valuesArr
                :[]
	},
/**
 * desc: 扩展对象
 * @param {Object,Object}
 * return {Object}
 */
    extendObj:function(extendedObj,sourceObj){
        for(var key in sourceObj){
            extendedObj[key] = sourceObj[key]
        }
        return extendedObj
	},
/**
 * desc: 数组转对象
 * @param {Array}
 * return {Object}
 */
    arrToObj:function(arr){
        var obj = {}
        for(var i = 0;i<arr.length;i++){
            obj[i]=arr[i]
        }
        return obj
	},
/**
 * desc: false get callback
 */
    no:function(a,b,c){
        return false;
	},
/**
 * desc: underscore get callback
 */
    identity:function(_){
        return _;
	},
/**
 * desc:获取数组最小值
 * @param {Array}
 * return {Object}
 */
    arrMin:function(arr){
        var min = Math.min.apply(null,arr)
        var idx = arr.indexOf(min)
        var obj ={}
        obj.min = min
        obj.idx = idx
        return obj
	},
/**
 * desc: 获取小数位数
 */
    getDecimalLength:function (num){
        var numStr = num + ''
        var decimalLength = numStr.length-(numStr.indexOf('.')+1)
        return decimalLength
	},
/**
 * desc: 纯函数式四舍五入
 */
    parFixed:function (value ,precision){
		var pureValue = value || 3.1415926;
        return parseFloat((pureValue).toFixed(precision))
    },
/*
* desc: 在不知道浮点数位数时应该怎样判断两个浮点数之和与第三数是否相等？
*/
    decimalTest(x,y,z){
        var L = UJF.prototype.getDecimalLength
        var C = UJF.prototype.parFixed
        var maxDecimal = Math.min.apply(null,[L(x+y),L(z)])
        return C(x+y,maxDecimal) === C(z,maxDecimal)
    },
    /*toggle多选框数组中的数据*/
    toggleData(item,list){
    	var index = list.indexOf(item);
        if( index > -1){
            list.splice(index, 1)
        }else{
            list.push(item);
        }
    },
/**
 * desc: 分页算法
 */
    controlPagArr(data,pageSize,pageNo){
        var arr = data;
        var index = pageSize * (pageNo -1);
        var length = pageSize;
        return arr.splice(index,length);
    }
}
module.exports = UJF;
