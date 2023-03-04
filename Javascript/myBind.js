/**
 *
 * https://juejin.cn/post/7158009281735262239
 *
 * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
 * 2. 保存当前函数的引用，获取其余传入参数值。
 * 3. 创建一个函数返回
 * 4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
 *
 * bind输入(即参数)是一个函数，输出(即返回值)也是一个函数。它不会去调用函数，只是处理函数。不太严格的说就是：它把某个对象context绑定到了函数fn身上，使得fn后续被调用时this总是context这个对象
 * 至于为什么用apply而不是用fn(arguments)，那是因为需要用context来给fn指定this，这正是只有apply或call才能完成的工作。如果用fn(arguments)的话，函数调用时的this会变成undefined或window。
 */


Function.prototype.myBind = function(context){
    // 判断调用对象是否为函数
    if(typeof this !== "function"){
        throw new TypeError("Error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
        fn = this; // 获取调用bind的函数
    return function Fn(){
        // 根据调用方式，传入不同绑定值
        return fn.apply(
            // 把它绑定的context上
            this instanceof Fn? this : context,
            // 绑定函数也可以使用 new 运算符构造
            // bind是支持柯里化：函数的参数可以分多次传入

            args.concat(...arguments)
        )
        // return fn.apply(context, args.concat(...arguments));
    }
}

// var func = function (){
//     console.log(this instanceof func);
// }
// // 作为普通函数调用
// func();
// // false
// // 作为构造函数调用
// new func();
// // true


var name = 'Jack';
var Yve = {
    name: 'Yvette'
};
function person(age, job, gender) {
    return {
        name: this.name,
        age,
        job,
        gender
    }
}

var bindYve2 = person.myBind(Yve, 22, 'engineer');
var Yvette2 = bindYve2('female');
console.log(Yvette2);