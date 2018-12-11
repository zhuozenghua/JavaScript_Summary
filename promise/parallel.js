const getA = new Promise((resolve, reject) => {
   //模拟异步任务
   setTimeout(function(){
     resolve(2);
   }, 1000) 
})
.then(result => result)
.catch(e => e);

const getB = new Promise((resolve, reject) => {
   setTimeout(function(){
     resolve(3);
   }, 1000) 
})
.then(result => result)
.catch(e => e);

function addAB(a,b){
    return a+b
}

Promise.all([getA, getB]).then(data=>{
    return addAB(data[0],data[1]);
})
.then(result=>{
    console.log(result)
 })
.catch(e => console.log(e));