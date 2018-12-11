function isFunction(it){
     return Object.prototype.toString.call(it)==='[object Function]';
}

function myPromise(callback){

  if (!(typeof callback === 'function' ))
        throw new TypeError('You must pass a  function as the first argument to the promise constructor');

  var self = this;
  this.status = 'pending' // myPromise当前的状态
  this.data = undefined  // myPromise的值
  this.onResolvedCallback = [] // myPromise resolve时的回调函数集
  this.onRejectedCallback = [] // myPromise reject时的回调函数集
  callback(resolve, reject) // 执行函数并传入相应的参数

  function resolve(value){
    if(self.status==='pending'){
        self.status='resolved';
        self.data=value;
        // 依次执行成功之后的函数栈
        for(var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
    }
  }

  function reject(error){
    if (self.status ==='pending') {
       self.status = 'rejected'
       self.data = error;
       // 依次执行失败之后的函数栈
       for(var i = 0; i < self.onRejectedCallback.length; i++) {
           self.onRejectedCallback[i](error)
        }
    }
  }

}


/**
 * [then 方法]
 * @param  {[function]} onFulfilled [resolve回调函数]
 * @param  {[function]} onRejected  [reject回调函数]
 * @return {[myPromise]}            
 */
myPromise.prototype.then= function (onFulfilled, onRejected) {
        var self=this;
        console.log(this)
        //返回一个新的promise,保证保证是可thenable的
        return new myPromise(function(resolve, reject) {
           //reject结果执行函数
           function handle(value) {
                var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
                if( ret && typeof ret ['then'] === 'function'){
                    ret.then(function(value){
                       resolve(value);
                    });
                } else {
                    resolve(ret);
                }
            }
            //reject结果执行函数
            function errback(reason){
                reason = isFunction(onRejected) && onRejected(reason) || reason;
                reject(reason);
            }
            if (self.status === 'pending') {
                self.onResolvedCallback.push(handle);
                self.onRejectedCallback.push(errback);
            } else if(self.status === 'resolved'){
                handle(self.data);
            } else if(self.status === 'rejected') {
            　　 errback(self.data);
           }
      })
        
};


/**
 * [catch 函数-then函数子集]
 * @param  {[type]} onRejected [reject回调]
 * @return {[]}            [description]
 */
myPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected)
}


myPromise.resolve=function(arg){
      return new myPromise(function(resolve,reject){
          resolve(arg)
      })
}

myPromise.reject=function(arg){
      return new myPromise(function(resolve,reject){
          reject(arg)
      })
}


myPromise.prototype.delay = function(ms,value){
    return this.then(function(orignVal){
        return myPromise.delay(ms,value || orignVal);
    })
}

myPromise.delay = function(ms,value){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(value);
        },ms);
    })
}



myPromise.all = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
    }
    return new myPromise(function(resolve,reject){
        var result = [],
            len = promises.length,
            count = len;
            
        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }

        function rejecter(reason){
            reject(reason);
        }

        function resolveAll(index,value){
            result[index] = value;
            if( --count == 0){
                resolve(result)
            }
        }

        for (var i=0;i<len;i++) {
            promises[i].then(resolver(i),rejecter);
        }
    });
}

myPromise.race = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return new myPromise(function(resolve,reject){
        var len = promises.length;

        function resolver(value) {
            resolve(value);
        }

        function rejecter(reason){
            reject(reason);
        }

        for (var i=0; i < len; i++) {
            promises[i].then(resolver,rejecter);
        }
    });
}



var promise1=new myPromise(function(resolve,reject){
   setTimeout(()=>{
      resolve("data1")
      // reject("data1")
  },1000)
}).then(function (data){
      console.log(data)
      return data+"data2"
}).then(function(data){
    console.log(data)
}).catch(e=>console.log(e))

,promise2=new myPromise(function(resolve,reject){
    // setTimeout(()=>{
          resolve("1")
    // }, 500)
})

,promise3=new myPromise(function(resolve,reject){
     setTimeout(()=>{
       resolve("2")
     },1000)
});


myPromise.all([promise1,promise2,promise3])
.then(data=>console.log(data),err=>console.log(err))