/**
 * Promise.race(promises) ，顾名思义就是赛跑的意思，Promise.race([p1, p2, p3]) 里面 promise  数组那个执行完成得快就获取那个的结果，不管结果本身是成功履行状态还是失败拒绝状态，只输出最快的 promise
 * https://juejin.cn/post/7210299613974200378#heading-1
 */
Promise.race = (promises)=>{
    return new Promise((resolve, reject)=>{
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve).catch(reject);
            // Promise.resolve(promise).then(value =>{
            //     resolve(value)
            // }).catch(err =>{
            //     reject(err)
            // })
        })
    })
}
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("rejected")
        // resolve('Promise 1 resolved');
    }, 500);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 2 resolved');
    }, 1000);
})


Promise.race([p1, p2]).then(result => {
    console.log(result); // "Promise 1 resolved"
}).catch(reason =>{
    console.log(reason)
})

/**
 * 我们可以使用 Promise.race() 方法来添加超时功能。例如，如果我们向某个 API 发送请求，但是该 API 的响应时间过长，我们可以使用 Promise.race() 方法来设置请求的超时时间。 下面是一个例子，我们使用 Promise.race() 方法来发送请求并在 3 秒内获取响应。如果请求未能在 3 秒内完成，我们将返回超时错误
 *
 *
 *
 * 在某些情况下，我们可能需要取消某个异步操作。例如，如果我们正在下载一个大文件，但用户决定取消下载操作，我们可以使用 Promise.race() 方法来取消下载操作
 */

