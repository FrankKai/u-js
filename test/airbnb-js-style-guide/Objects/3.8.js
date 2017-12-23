const original = {a:1,b:2}
// const copy = Object.assign({},original,{c:3})
const copy = {...original,c:3} 
const {a,c,...noA}=copy
console.log(original,copy,noA)