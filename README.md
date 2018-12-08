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
ujf.arrayDistinct([1,2,3,1]);
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
//小数精度丢失问题
ujf.decimalTest(x,y,z)
```
start

master 1

master 2

feature 1

feature 2

feature 3

git tag 测试

git tag 测试第二次