/**
 * Promise.allSettled() 方法以 promise 组成的可迭代对象作为输入，并且返回一个 Promise 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promsie 结果的对象数组
 */

/**
 *
 * allSettled()与all()的有什么区别呢？
 *
 * all() 返回一个直接包裹resolve内容的数组，
 * all() 如果有一个Promise对象报错了，则all()无法执行，会报错你的错误，无法获得其他成功的数
 *
 * allSettled() 返回一个包裹着对象的数组。
 * allSettled() 方法是不管有没有报错，把所有的Promise实例的数据都返回回来，放入到一个对象中。如果是resolve的数据则status值为fulfilled,相反则为rejected。
 *
 */

Promise.allSettled = function(promises) {
    return new Promise(function(resolve) {
        let result = [];
        let count = 0;
        let len = promises.length
        if(len === 0){
            return resolve(result);
        }
        promises.forEach((p, i) => {
            Promise.resolve(p).then(res => {
                count++
                result[i] = {
                    status:'fulfilled',
                    value: res
                }
                if(count === len) {
                    resolve(result)
                }
            }).catch(err => {
                count++
                result[i] = {
                    status:'rejected',
                    value: err
                }
                if(count === len) {
                    resolve(result)
                }
            })
        })
    })
}

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).then((value) => console.log(value))
    // [
    //     { status: 'fulfilled', value: 3 },
    //     { status: 'rejected', reason: 'foo' }
    // ]
