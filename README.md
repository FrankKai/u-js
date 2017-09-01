# UJF
Fullname is Usful-Js-Functions，my own javascript function library.

```
//创建对象实例
var test=new UJS();
//检测类型
test._checkType("a");
//数组排序
test._arraySort([5,2,3]);
//简单数组去重
test._arrayDinstinct([1,2,3,1]);
//复杂数组去重
test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}]);
```

>目前只支持单一元素去重，复杂情况正在研究
①指定key去重:test._arrayDinstinct([{time:1},{time:2},{time:4},{time:1}],"time");
②复杂情况对象去重：test._arrayDinstinct([{name:"A",time:1},{name:"B",time:2},{name:"C",time:1},{name:"C",time:1}],"time");

