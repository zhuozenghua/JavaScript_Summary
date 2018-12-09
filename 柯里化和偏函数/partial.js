/**
 * 偏函数实现：固定一个函数的一些参数，然后产生另一个更小元的函数
 * @param  {Function}  fn         [需要修改为偏函数的原函数]
 * @param  {...[type]} presetArgs [参数]
 */
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
        let allArgs =presetArgs.concat(laterArgs)
        return fn.apply(this, allArgs)
  }
}


//例子
function ajax(url,data,callback){
     console.log(url+data);
     callback();
}

var sendAjaxTo1=partial(ajax,"www.p1.com")
var sendAjaxTo2=partial(ajax,"www.p2.com")

sendAjaxTo1({name:"p1"},function(){
    console.log('ajax to p1 end')
})
sendAjaxTo2({name:"p2"},function(){
    console.log('ajax to p2 end')
})