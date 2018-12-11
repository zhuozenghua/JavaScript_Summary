function getA(){
      return  new Promise(function(resolve, reject){ 
      setTimeout(function(){     
            resolve(2);
        }, 1000);
    });
}
 
function getB(){
    return  new Promise(function(resolve, reject){       
        setTimeout(function(){
            resolve(3);
        }, 1000);
    });
}
 
function addAB(a,b){
    return a+b
}

//方法1-连续使用then链式操作
/*function getResult(){
    var  obj={};
    Promise.resolve().then(function(){
        return  getA() 
    })
    .then(function(a){
         obj.a=a;
    })
    .then(function(){
        return getB() 
    })
    .then(function(b){
         obj.b=b;
         return obj;
    })
    .then(function(obj){
       return  addAB(obj['a'],obj['b'])
    })
    .then(data=>{
        console.log(data)
    })
    .catch(e => console.log(e));

}

getResult();*/

//方法2-promise构建队列
/*function getResult(){
    var res=[];
    // 构建队列
    function queue(arr) {
      var sequence = Promise.resolve();
      arr.forEach(function (item) {
        sequence = sequence.then(item).then(data=>{
            res.push(data);
            return res
        })
      })
      return sequence
    }

    // 执行队列
    queue([getA,getB]).then(data=>{
        return addAB(data[0],data[1])
    })
    .then(data => {
        console.log(data)
    })
    .catch(e => console.log(e));

}

getResult();*/

//方法3-使用async、await实现类似同步编程
function getResult(){
 async function queue(arr) {
  let res = []
  for (let fn of arr) {
    var data= await fn();
    res.push(data);
  }
  return await res
}

queue([getA,getB])
  .then(data => {
    return addAB(data[0],data[1])
  }).then(data=>console.log(data))

}

getResult();


