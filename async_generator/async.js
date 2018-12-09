/*async函数*/
//eg1-基本语法（async+await）
//1.async函数返回一个 Promise 对象,async函数内部return语句返回的值，会成为then方法回调函数的参数。
//2.await 命令
//await返回值：await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值
function timeout(value,ms) {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(`after ${ms} ms ...`);
    }, ms);
    console.log(value)
  });
}


async function asyncPrint(value, ms) {
  var info= await timeout(value,ms);
  console.log(info);
  return "end!"
}

asyncPrint('hello world', 50)
.then(data=>console.log(data))
.catch(e=>console.log(e));
// hello world
// after 50 ms ...
// end!

console.log('------------------------------------------------------')
//eg2-错误处理(难点)
//1.async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
//2.除非遇到return语句或者抛出错误。其中任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行

async function f() {
  await Promise.reject('出错了'); 
  await Promise.resolve('hello world'); // 不会执行
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
// 后面的await Promise.resolve('hello world')均不执行



//3.如果想要实现即使前一个异步操作失败，也不要中断后面的异步操作
//方法-：将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
    console.log(e)
  }
    return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
//方法二：await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world

console.log('------------------------------------------------------')
//eg3-使用注意点(例子不能运行)
//第一点，eg2-3已经说过，await命令后面的Promise对象，运行结果可能是rejected,
//所以最好把await命令放在try...catch代码块中。


// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
// not this
let foo = await getFoo();
let bar = await getBar();

//but
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// or 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;

//第三点，希望多个请求并发执行，可以使用Promise.all方法
//写法一，将promises装进Promise.all
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}
// 或者使用下面的写法，将promises的结果逐个记录，promise执行也是并行
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}


