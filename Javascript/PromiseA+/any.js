/**
 *      Promise.any() 接收一个由 Promise 所组成的可迭代对象，该方法会返回一个新的 promise，一旦可迭代对象内的任意一个 promise 变成了兑现状态，那么由该方法所返回的 promise 就会变成兑现状态，并且它的兑现值就是可迭代对象内的首先兑现的 promise 的兑现值。
 *      如果可迭代对象内的 promise 最终都没有兑现（即所有 promise 都被拒绝了），那么该方法所返回的 promise 就会变成拒绝状态，并且它的拒因会是一个 AggregateError 实例，这是 Error 的子类，用于把单一的错误集合在一起
 *
 *      语法：Promise.any(iterable);
 *
 *  场景：从最快的服务器检索资源
 *       显示第一张已加载的图片（来自MDN）
 *  返回值：
 *      1.如果传入了一个空的可迭代对象，那么就会返回一个已经被拒的 promise
 *      2.如果传入了一个不含有 promise 的可迭代对象，那么就会返回一个异步兑现的 promise
 *      3.其余情况下都会返回一个处于等待状态的 promise。如果可迭代对象中的任意一个 promise 兑现了，那么这个处于等待状态的 promise 就会异步地（调用栈为空时）切换至兑现状态。
 *      4.如果可迭代对象中的所有 promise 都被拒绝了，那么这个处于等待状态的 promise 就会异步地切换至被拒状态。
 *
 *
 *  说明：
 *      1.该方法用于获取首个兑现的 promise 的值。只要有一个 promise 兑现了，那么此方法就会提前结束，而不会继续等待其他的 promise 全部敲定。
 *      2.不像 Promise.all() 会返回一组兑现值那样，我们只能得到一个兑现值（假设至少有一个 promise 兑现）。当我们只需要一个 promise 兑现，而不关心是哪一个兑现时此方法很有用的。
 *      3.同时，也不像 Promise.race() 总是返回第一个敲定值（兑现或拒绝）那样，这个方法返回的是第一个兑现的值。这个方法将会忽略掉所有的被拒绝的 promise，直到第一个 promise 兑现
 */

// Promise.any 只要传入的 promise 有一个是 fullfilled 则立即 resolve 出去，否则将所有 reject 结果收集起来并返回 AggregateError
Promise.any = (promises)=>{
    return new Promise((resolve, reject)=>{
        promises = Array.isArray(promises)? promises:[];
        let len = promises.length;
        // 用于收集所有reject
        let errs = [];
        if(len === 0){
            return reject(new AggregateError("All promises were rejected"))
        }
        promises.forEach((promise) => {
            promise.then(value => {
                resolve(value)
            },err => {
                len--;
                errs.push(err);
                if(len === 0){
                    reject(new AggregateError(errs))
                }
            })
        })
    })
}

const pErr = new Promise((resolve, reject) => {
    reject("总是失败");
});
const pSlow = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "最终完成");
});
const pFast = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
    console.log(value);
})
// 期望输出："很快完成"


