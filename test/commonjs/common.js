let commonA=require('./common_a.js')
// let commonB=require('./common_b.js')

console.log(commonA.x)
commonA.addX(2)
console.log(commonA.x)

// console.log(module)
// 
// 
function exec(moduleName) {
    let module = context.modules[moduleName];
    let deps = module.deps;
    let args = [];
    if(deps){
        deps.forEach(function(dep) {
            exec(dep);
            args.push(context.modules[dep].returnValue);
        });
        module.args = args;
        module.returnValue = context.modules[moduleName].factory.apply(context.modules[moduleName], args);
    }
}
