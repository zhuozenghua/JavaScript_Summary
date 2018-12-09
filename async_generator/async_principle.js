/*async 函数的实现原理*/
// 将 Generator 函数和自动执行器，包装在一个函数里
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}


function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    //执行next方法
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      //遍历完成
      if(next.done) {
        return resolve(next.value);
      }
       //否则将调用next方法继续执行下一个yield后面的异步操作（用promise包裹），
       //并将结果作为上一个yield的返回值
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}