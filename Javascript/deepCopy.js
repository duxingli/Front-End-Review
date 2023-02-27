

/**
 * 深拷贝：对于简单数据类型直接拷贝他的值，对于引用数据类型，在堆内存中开辟一块内存用于存放复制的对象，并把原有的对象类型数据拷贝过来，这两个对象相互独立，属于两个不同的内存地址，修改其中一个，另一个不会发生改变
 *      JSON.parse(JSON.stringify(obj))
 *
 *      缺点
 *      忽略 undefined
 *      不能序列化函数，Symbol等
 *      不能解决循环引用的对象
 *
 *      Object.assign()法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
 */

// let a = {
//     age: 1,
//     jobs: {
//         first: 'FE'
//     }
// }
// let b = { ...a }
// a.jobs.first = 'native'
// console.log(b.jobs.first) // native
// let b = JSON.parse(JSON.stringify(a));
// a.jobs.first = 'native'
// console.log(b.jobs.first) // FE


// JSON.parse 局限性 如果对象中存在循环引用，你会发现程序会报错
// let obj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: 3,
//     },
// }
// obj.c = obj.b
// obj.e = obj.a
// obj.b.c = obj.c
// let newObj = JSON.parse(JSON.stringify(obj))
// console.log(newObj)


// 同时在遇到不支持的数据类型，比如函数、 undefined 或者 symbol 的时候，这些属性都会被忽略：
// let a = {
//     age: undefined,
//     sex: Symbol('male'),
//     jobs: function() {},
//     name: 'yck'
// }
// let b = JSON.parse(JSON.stringify(a))
// console.log(b) // {name: "yck"}

// 以下是 JSON 支持的数据类型: object array string number

// 如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用MessageChannel


// function structuralClone(obj){
//     return new Promise(resolve =>{
//         const {port1, port2} = new MessageChannel();
//         // 宏任务 两个端口都是只读的。每个端口都可以通过postMessage发送数据，而一个端口只要绑定了onmessage回调方法，就可以接收从另一个端口传过来的数据。
//         port2.onmessage = event => resolve(event.data);
//         port1.postMessage(obj);
//     })
// }

// var obj = {
//     a: 1,
//     b: {
//         c: 2
//     }
// }
// obj.b.d = obj.b
// const test = async()=>{
//     const clone = await structuralClone(obj);
//     console.log(clone);
// }
// test()

// 注意该方法 MessageChannel 是异步的
// 可以处理 undefined 和循环引用对象

/**
 * Object.assign()
 */
// let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
// let obj2 = Object.assign({}, obj1);
// obj2.person.name = "wade";
// obj2.sports = 'football'
// console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

/**
 * 函数库lodash的_.cloneDeep方法
 */
// var _ = require('lodash');
// var obj1 = {
//     a: 1,
//     b: { f: { g: 1 } },
//     c: [1, 2, 3]
// };
// var obj2 = _.cloneDeep(obj1);
// console.log(obj1.b.f === obj2.b.f); // false


// 当然还是存在一部分缺陷的，比如说递归肯定会存在爆栈的问题，因为执行栈的大小是有限制的，到一定数量栈就会爆掉。当遇到这种问题，我们可以通过遍历的方式来改写递归。也就是如何写层序遍历（BFS）的问题了，只需要通过数组来模拟执行栈就能解决爆栈问题。


/**
 * 递归实现深拷贝函数
 *    1. 递归这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；
 *    2. 这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
 *    3. 对象的属性里面成环，即循环引用没有解决。
 */



function deepCopy(obj) {
    if (!obj || typeof obj !== "object") return;
    let newObject = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObject[key] =
                typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObject;
}
// console.log(clone({b: {c: {d: 1}}}));  // {b: {c: {d: 1}}})

// 解决循环引用问题Map
function deepClone(obj) {
    let map = new Map();
    let result = clone(obj, map);
    return result;
    function clone(obj, map) {
        if (typeof obj === 'object' && obj !== null) {
            let res = Array.isArray(obj) ? [] : {};
            if (map.has(obj)) {
                return obj;
            }
            // 考虑循环引用的情况
            map.set(obj);
            for (let key in obj) {
                res[key] = clone(obj[key], map);
            }
            return res;
        }
        return obj;
    }
}
console.log(deepClone({b: {c: {d: 1}}}));  // {b: {c: {d: 1}}})


