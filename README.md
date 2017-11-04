# UJF
Fullname is Usful-Js-Functions，my own javascript function library.

```
//创建对象实例
var test=new UJF();
//检测类型
test.checkType("a");

//检测数组
test.isArray(arr)
//检测promise
test.isPromise(val)
//检测数组中元素
test.isArrayHasElement(arr)
//数组排序
test.arraySort([5,2,3]);
//简单数组去重
test._arrayDinstinct([1,2,3,1]);
//复杂数组去重
test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);
//数组转对象
test.arrToObj(arr)
//数组最小值
test.arrMin(arr)

//检测对象
test.isObject(obj)
//深拷贝对象
test.deepCopyObj(obj)
//检测对象是否包含属性
test.hasOwn(obj,key)
//对象转数组
test.toArray(list,start)
//按需获取对象中详细数据
getObjDetails(obj,getKey,getValue)
//扩充对象
test.extendObj(extendedObj,sourceObj)

//解析URI查询参数
test.resolveUrl(url)
//缓存函数
test.cached(fn)
//返回驼峰
test.camlize(str)
//返回连字符格式
test.hyphenate(str)
```

>目前只支持单一元素去重，复杂情况正在研究<br>
①指定key去重:test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}],"time");<br>
②复杂情况对象去重：test._arrayDinstinct([{name:"A",time:1},{name:"B",time:2},{name:"C",time:1},{name:"C",time:1}],"time");

