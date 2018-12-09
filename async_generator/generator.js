/*genetaor（生成器）函数 -了解*/
//eg1-基本语法（*+yield）
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  yield function (){};
  return 'ending';
}

var res=helloWorldGenerator();
//generator函数返回一个遍历器对象
console.log(Object.prototype.toString.call(res))//[object Generator]
//遍历器对象继承了遍历器对象，可以使用let of遍历。作用类似于调用next()方法
// for(let v of res){
//       console.log(v)
// }
//hello
//world
//[Function]
console.log(res.next())
console.log(res.next())
console.log(res.next())
console.log(res.next())
// { value: 'hello', done: false }
// { value: 'world', done: false }
// { value: [Function], done: false }
// { value: 'ending', done: true }

console.log('------------------------------------------------------')
//eg2-返回值
//yield表达式本身没有返回值，或者说总是返回undefined。
//next方法执行后，返回对应yield后面的值（yield表达式的返回值）
//next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
console.log(a.next() )
console.log(a.next() )
console.log(a.next() )
// { value: 6, done: false }
// { value: NaN, done: false }
// { value: NaN, done: true }
var b = foo(5);
console.log(b.next() )
console.log(b.next(12))
console.log(b.next(13))
// { value: 6, done: false }
// { value: 8, done: false }
// { value: 42, done: true }

console.log('------------------------------------------------------')
//eg3-异步应用
var fetch = function(url){
  return new Promise((resolve,reject)=>{
     setTimeout(function(){
       resolve({info:'fetch from '+url})
     }, 1000)
  })
}

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.info);
}


var g = gen();
var result = g.next();
console.log(result)
result.value.then(function(data){
  g.next(data);
}).catch(e=>console.log(e))
