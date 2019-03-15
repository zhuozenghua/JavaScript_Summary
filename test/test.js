function promise(fn){

     this.status="pending"
     this.data=""
     this.resolveArr=[]
     this.rejectArr=[];
     var self=this;

    function resolve(value){
         if(self.status==='pending')
            self.status='resolve'
             self.data=value
         for(var i=0;i<self.resolveArr.length;i++){
             self.resolveArr[i](value)
         }

      }

      function reject(value){
         if(self.status==='pending')
            self.status='reject'
            self.data=value
           for(var i=0;i<self.rejectArr.length;i++){
             self.rejectArr[i](value)
         }
   
       }

    
    fn(resolve,reject)

}

promise.prototype.then=function(resolveFn,rejectFn){
     var self=this
     return new promise(function(resolve,reject){
          function handle(value){
                var ret = typeof resolveFn === 'function' && resolveFn(value) || value;
                if( ret && typeof ret ['then'] === 'function'){
                    ret.then(function(value){
                       resolve(value);
                    });
                } else {
                    resolve(ret);
                }

           }


           function errcall(value){
              value=rejectFn&&rejectFn(value)||value
              reject(value)

           }

         if(self.status==='resolve'){
            handle(self.data)
         }else if(self.status==='reject'){
            errcall(self.data)
         }else{
            self.resolveArr.push(handle)
            self.resolveArr.push(errcall)
         }
     })

}



promise.prototype.catch= function(rejectFn){
   return this.then(null,reject)
};




var p=new promise(function(resolve,reject){
    setTimeout(()=>{
        resolve("1")
    }, 1000)
}).then(function(data){console.log(data) ;
  return data+"2"})
.then((data)=>console.log(data))