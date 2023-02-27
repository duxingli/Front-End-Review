/**
 *
 * https://juejin.cn/post/7196690584287281208#heading-15
 * 浅拷贝：一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值，如果是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。
 *      arr2 = arr1
 *      arr.slice()
 *      arr.concat()
 *
 *      Object.assign(source, obj1,obj2)
 *          多个源对象有同名属性，则后面的属性会覆盖前面的属性
 *          null 和 undefined 不能转化为对象，所以第一个参数不能为null或 undefined
 *          不会拷贝对象的继承属性，不会拷贝对象的不可枚举的属性，可以拷贝 Symbol 类型的属性
 *      展开运算符 ...
 */
// let a = {
//     age: 1
// }
// let b = Object.assign({}, a)
// a.age = 2
// console.log(b.age) // 1
//
// let a = {
//     age:1
// }
// let b = {...a}
// a.age = 2
// console.log(b.age) //1


// 浅拷贝的实现;
function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== "object") return;
    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};
    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = object[key];
        }
    }
    return newObject;
}