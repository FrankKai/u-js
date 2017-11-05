# UJF
Fullname is Usful-Js-Functions，my own javascript function library.

```
var UJF = require('ujf.js')
//创建对象实例
var ujf=UJF.prototype;
//检测类型
ujf.checkType("a");

//检测数组
ujf.isArray(arr)
//检测promise
ujf.isPromise(val)
//检测数组中元素
ujf.isArrayHasElement(arr)
//数组排序
ujf.arraySort([5,2,3]);
//简单数组去重
ujf._arrayDinstinct([1,2,3,1]);
//复杂数组去重
ujf._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);
//数组转对象
ujf.arrToObj(arr)
//数组最小值
ujf.arrMin(arr)

//检测对象
ujf.isObject(obj)
//深拷贝对象
ujf.deepCopyObj(obj)
//检测对象是否包含属性
ujf.hasOwn(obj,key)
//对象转数组
ujf.toArray(list,start)
//按需获取对象中详细数据
getObjDetails(obj,getKey,getValue)
//扩充对象
ujf.extendObj(extendedObj,sourceObj)

//解析URI查询参数
ujf.resolveUrl(url)
//缓存函数
ujf.cached(fn)
//返回驼峰
ujf.camlize(str)
//返回连字符格式
ujf.hyphenate(str)
```

>目前只支持单一元素去重，复杂情况正在研究<br>
①指定key去重:ujf._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}],"time");<br>
②复杂情况对象去重：ujf._arrayDinstinct([{name:"A",time:1},{name:"B",time:2},{name:"C",time:1},{name:"C",time:1}],"time");


