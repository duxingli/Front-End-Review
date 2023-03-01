/**
 * 内部属性class属什么
 * 所有typeof 返回值为 "object" 的对象（如数组） 都包含一个内部属性[[class]]
 * 我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类，这个属性无法直接访问，一般Object.prototype.toString() 来查看
 *
 */


// Object.prototype.toString.call([1,2,3]);
// "[object Array]"
// Object.prototype.toString.call(/regex-literal/i);
// "[object RegExp]"


class Class1{}
Object.prototype.toString.call(new Class1());

// 我们自己创建的类就不会有这份特殊待遇，因为 toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签
// 默认情况类的[[Class]]返回[object Object]


class Class2{
    get [Symbol.toStringTag](){
        return "Class2";
    }
}
// "[object Object]"
Object.prototype.toString.call(new Class2());
// "[object Class2]"