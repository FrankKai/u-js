const arr =[1, 2, 3].map((x) => {
    const y = x + 1;
    if(y==2){
        return x * y;
    }
    return x
  });
console.log(arr)