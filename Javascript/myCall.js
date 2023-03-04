/**
call 函数的实现步骤：
- 1.判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 2.判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 3.处理传入的参数，截取第一个参数后的所有参数。
- 4.将函数作为上下文对象的一个属性。
- 5.使用上下文对象来调用这个方法，并保存返回结果。
- 6.删除刚才新增的属性。
- 7.返回结果。

 call、apply和bind区别：
    相同点:都是动态修改this指向；都不会修改原先函数的this指向
    不同点：
     (1)执行方式不同：
        call和apply是改变后页面加载之后就立即执行，是同步代码。
        bind是异步代码，改变后不会立即执行；而是返回一个新的函数
     (2)传参方式不同：
        call和bind传参是一个一个逐一传入，不能使用剩余参数的方式传参。
        apply可以使用数组的方式传入的，只要是数组方式就可以使用剩余参数的方式传入
     (3)修改this的性质不同
        call、apply只是临时的修改一次，也就是call和apply方法的那一次；当再次调用原函数的时候，它的指向还是原来的指向.
        bind是永久修改函数this指向，但是它修改的不是原来的函数；而是返回一个修改过后新的函数，此函数的this永远被改变了，绑定了就修改不了
 */
Function.prototype.myCall = function(context){
    // this:add context:minus
    // 判断调用对象
    if(typeof this !== "function"){
        console.error("type error");
    }
    // 获取除第一个minus 的剩余参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
    // 将函数作为上下文对象的一个属性
    context.fn = this;
    // 使用上下文对象来调用这个方法，并保存返回结果
    result = context.fn(...args);
    // 删除刚才新增的属性。
    delete context.fn;
    // 返回结果
    return result;
}
function add (x, y)
{
    console.log (x + y);
}
function minus (x, y)
{
    console.log (x - y);
}
add.myCall (minus , 1, 1);  // 2
// add(1,1)  但是this是minus







