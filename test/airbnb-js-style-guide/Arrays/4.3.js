const items = [1,2,3,4]
const itemsCopy = [...items]
////在浅拷贝的基础之上新增元素
const itemsCopy = [...items,{has:(obj,key)=>{
        var has = Object.prototype.hasOwnProperty
   return has.call(obj,call)
}}
]
//从新对象基础上浅拷贝新对象
const [0,1,2,3,...nice] = itemsCopy