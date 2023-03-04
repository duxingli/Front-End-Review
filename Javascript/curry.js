// https://github.com/mqyqingfeng/Blog/issues/42
// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
// 参数复用。本质上是提高适用性。

// ES5
function curry(fn, args) {
    // 获取函数需要的参数长度
    let length = fn.length;
    args = args || [];
    return function() {
        let subArgs = args.slice(0);
        // 拼接得到现有的所有参数
        for (let i = 0; i < arguments.length; i++) {
            subArgs.push(arguments[i]);
        }
        // 判断参数的长度是否已经满足函数所需参数的长度
        if (subArgs.length >= length) {
            // 如果满足，执行函数 apply
            return fn.apply(this, subArgs);
        } else {
            // 如果不满足，递归返回科里化的函数，等待参数的传入 curry.call
            return curry.call(this, fn, subArgs);
        }
    };
}
var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
// ES6
// function curry(fn, ...args){
//     return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
// }
// function add(...args){
//     return args.reduce((pre, cur)=>{
//         return pre + cur;
//     });
// };
// let addCurry = curry(add);
// addCurry(1)(2) // 3
