
/**
 * 每一个promise自己处理错误
 */

const getA = new Promise((resolve, reject) => {
   //模拟异步任务
   setTimeout(function(){
     resolve(2);
   }, 1000) 
})
.then(result => result)
.catch(e=>e)


const getB = new Promise((resolve, reject) => {
   setTimeout(function(){
     // resolve(3);
     reject('Error in getB');
   }, 1000) 
})
.then(result => result)
.catch(e=>e)


Promise.all([getA, getB]).then(data=>{
    console.log(data)
})
.catch(e => console.log(e));