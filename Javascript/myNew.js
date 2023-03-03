// 什么是new?
//     在JS中，new的作用是通过构造函数来创建一个实例对象（和普通函数不一样，当函数用作构造函数时首字母一般要大写
// function Foo(name){
//     this.name = name;
// }
// console.log("new Foo的类型",typeof new Foo('mm')); //object
// console.log("Foo的类型",typeof Foo); // undefined



/**
 * new 的封装
 *   操作符:
 *    new Foo(x, y) 原始写法
 *     （1）首先创建了一个新的空对象
 *     （2）设置原型，将对象的原型设置为构造函数的 prototype 对象。
 *     （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
 *     （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
 *    myNew(Foo, x, y)
 */

function myNew() {
    let newObject = null,
        constructor = Array.prototype.shift.call(arguments),
        result = null;

    // 参数判断
    if (typeof constructor !== "function") {
        console.error("type error");
        return;
    }

    // 新建一个空对象，对象的原型为构造函数的 prototype 对象
    newObject = Object.create(constructor.prototype);

    // 将 this 指向新建对象，并执行函数
    result = constructor.apply(newObject, arguments);

    // 判断返回对象
    let flag =
        result && (typeof result === "object" || typeof result === "function");

    // 判断返回结果
    return flag ? result : newObject;
}

// 使用方法
// objectFactory(构造函数, 初始化参数);


