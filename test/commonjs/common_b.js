var x = 5;
var addX = function (value) {
  return value + x;
};


// console.log(module)


module.exports.x = x;
module.exports.addX = addX;