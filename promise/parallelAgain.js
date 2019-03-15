/**
 * 和parallel不一样的是：总是返回resolve结果
 * 出现错误再次请求
 */

const items=[
{id:0,name:'zzh1'},
{id:1,name:'zzh2'},
{id:2,name:'zzh3'}
]

let counter = 1 // 请求次数
let maxRequestTimes = 2 // 最大请求次数，因为有可能别个页面就是访问不了
let failedList = []
let result = [] // 最后的结果

function getDataById (id) { 
    return new Promise((resolve, reject)=>{
         //模拟网路请求
         setTimeout(() => {
          if (Math.random() > 0.3) resolve({id, msg: 'ok'})
          else reject({id, msg: 'error'})
         }, 1000)
    }).catch(e => {
         failedList.push(arguments.callee(id)) // 如果失败，就重新发起请求，并将该请求的promise放入failedList中以便后续处理
    })
}

function genPromiseList(items){
    let  promiseList=[]
    for(let i=0,j=items.length;i<j;i++){
       promiseList.push(getDataById(items[i].id))
    }
    return promiseList;
}


function fetchData (requestList) { // 这里是对请求结果的处理
 Promise.all(requestList).then(data => {
      //console.log(data)
      result = result.concat(data.filter(item => item)) // filter返回true的时候保留该数组项，因为getDataById的catch里没有给返回值，这里的resolve里就会有undefined，需要过滤掉
      let failedLength = failedList.length
      if (failedLength > 0 && counter < maxRequestTimes) { // 如果失败列表里有请求，并且请求次数不超过设定的值，就进行下一次请求，并且打出log
       console.log(`第${counter}次请求完成，其中成功${requestList.length - failedLength}个，失败${failedLength}个，正在进行第${++counter}次请求...`)
       fetchData(failedList)
       failedList = [] // 清空failedList
      } else { // 表示所有请求都成功了，或者达到了最大请求次数。到这里就可以对result做进一步处理了。
       console.log(`请求完成，共请求${counter}次, 其中成功${requestList.length - failedLength}个，失败${failedLength}个\n`, result)
       counter = 1
      }

 }).catch(e => {
    console.log(e)
 })
}

fetchData(genPromiseList(items))