/**
 * 回调函数是高阶函数的一种
 * 高阶函数 (返回函数就是高阶函数)
 *      1  如果函数的参数是一个函数
 *      2  如果一个函数返回了一个函数
 *
 *    常见的高阶函数的应用
 *      AOP 面向切片编程， 重写一些原生方法
 *
 */

function say(who){
    console.log(who+"说话")
}
Function.prototype.before = function(cb){
    // this = say
    // 剩余运算符 将所有的参数组合成一个数组
    // 使用箭头函数回调时 不能使用arguments
    return (...args)=>{
        console.log(args)
        cb();
        this(...args)
    }
}
let newFn = say.before(function(){
    console.log("说话前")
})
newFn("我") // 看调用函数之前的上下文


// vue 2.0 也会利用函数劫持
let oldPush = Array.prototype.push;
function push(...args){
    // this [1,2,3]
    console.log("数据更新了")
    oldPush.call(this, ...args)
}
let arr = [1,2,3]
push.call(arr,4,5,6,7);
console.log(arr)

// react setState事务

