/**
 * 柯里化函数：对有特定参数个数的函数柯里化
 * @param  {[type]} func [[需要修柯里化的原函数]]
 */
function curry(func){

    var length = func.length,
    args = Array.prototype.slice.call(arguments, 1);
    return function(){
        var newArgs = args.concat([].slice.call(arguments));
        if(newArgs.length < length){
            return curry.call(this,func,...newArgs);
        }else{
            return func.apply(this,newArgs);
        }
    }

}

// 例子
var addCurry=curry(function (a,b,c){
    return a+b+c;
})
console.log(addCurry(2)(3)(5))  //10
console.log(addCurry(2,3)(5))   //10
console.log(addCurry(2,3,5))    //10