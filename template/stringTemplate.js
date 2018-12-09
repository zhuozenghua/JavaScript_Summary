/**
 * [render render函数实现将template中的占位符用data中对应的值填充] 
 * @param  {[type]} template [模板]
 * @param  {[type]} data     [数据]
 * @return {[type]}          [渲染后的值]
 */
//方法1 - 直接匹配template中的占位符并替换之,推荐
function render(template, data) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, $1) => data[$1.trim()]);
}
// var template = "{{name}}很厉害，才{{age}}岁,{{name}}很厉害，才{{age}}岁",
//     data = {name:"XXX",age:"16"};

// console.log(render(template,data))


//方法2 - 根据data中key,匹配template中的占位符并替换之
// function render(template, data) {
//   Object.keys(data).forEach(key => {
//     template = template.replace(new RegExp(`{{${key}}}`,'g'), data[key]);
//   });
//   return template;
// }




