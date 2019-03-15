var x = [1,2];
var addX = function (value) {
  x[1]+=value
  return value + x[1];
};


console.log(module)
console.log(this==module.exports)


module.exports.x = x;
module.exports.addX = addX;