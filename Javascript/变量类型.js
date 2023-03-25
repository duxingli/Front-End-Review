/**
 * typeof 运算符
 *  1.识别所有值类型
 *  2.识别函数
 *  3.判断是否是引用类型(不可再细分 )
 */

// let a;
// typeof a // undefined;
// const str = "abc"
// typeof str // "string"
// const n = 100;
// typeof n // "number"
// const b = true;
// typeof b // boolean
// const s = Symbol('s')
// typeof s // symbol

typeof console.log // function
typeof function (){} // function

typeof null // object
typeof ["a", "b"] // object
typeof {x: 100} //object


/**
 *  变量计算：类型转换
 *      1.字符串拼接
 *      2. ==
 *      3. if语句和逻辑运算
 */
// const a = 100 + 10 // 110
// const b = 100 + '10' // '10010'
// const c = true + '10' // 'true10'

// 100 == "100" // true
// 0 == '' // true
// 0 == false // true
// false == '' // true
// null == undefined // true

const obj = {x:100}
if(obj.a == null) {}
// 相当于
// if(obj.a === null || obj.a === undefined){}

/**
 * truly变量：     !!a === true
 * falsely变量：   !!a === false
 */

// falsely变量 除此之外都是true
// !!0 === false
// !!NaN === false
// !!'' === false
// !!null === false
// !!undefined === false
// !!false === false

// const a = true
// if(a) {
//
// }


// 逻辑判断
// console.log(10 && 0) // 0
console.log("" || "abc") // 'abc'
console.log(!window.abc) // true


// 值类型和引用类型的区别
const obj1 = {x:100, y:200}
const obj2 = obj1;
let x1 = obj1.x
obj2.x = 101
x1 = 102
console.log(obj1) // {x:101}

