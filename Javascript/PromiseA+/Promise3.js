// 1) （then中传递的函数）判断成功和失败的返回结果
// 2)  判断是不是Promise  如果是promise 就采用他的状态
// 3)  如果不是 promise 直接将结果传递下去即可

// then 链式调用 可选参数

const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

const resolvePromise = (promise2, x, resolve, reject)=>{
    // 判断x的值和promise2是不是同一个，如果是同一个，就不要再等待了，直接出错即可
    if(promise2 === x){
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }
    let called;
    if(typeof x === "object" &&  x !== null || typeof x === "function"){
        // 判断x的类型
        // promise 有n种实现 都符合了这个规范 兼容别人的promise
        // 严谨 应该判断 别人的promise 如果失败了就不能再调用成功 如果成功了不能再调用失败
        //内部测试的时候 会成功和失败都调用
        try{
            // then属性可能出错 then通过defineProperty来定义的
            // 怎么判断 x是不是一个promise 看他有没有then方法
            // 取then方法可能会出错，所以需要使用 trycatch
            let then = x.then;
            if(typeof then === "function"){
                // 直接使用取好的then，而不是使用x.then，否则会在次取值，有可能第一次取值没有报错，第二次取值就报错了
                then.call(x, y=>{
                    // 如果promise是成功的就把结果向下传，如果失败的就让下一个人也失败
                    if(called){
                        return;
                    }
                    called = true; // 防止多次调用成功和失败
                    // y还有可能是promise 递归，直到解析出普通值为止
                    resolvePromise(promise2, y, resolve, reject)
                    // 采用promise的成功结果将值向下传递
                }, r=>{
                    if(called){
                        return;
                    }
                    called = true;
                    // 报错的时候就直接往下走，不用再担心 是不是 promise 了
                    reject(r);
                })
            }else{
                // {then:()=>{}}
                // 说明 x 是一个普通对象，直接成功即可
                resolve(x);
            }
        } catch(e){
            // 为了辨别这个promise 防止调用多次
            if (called) return
            called = true
            reject(e);
        }
    }else{
        // x是一个普通值 常量
        resolve(x);
    }
}

class Promise{
    // 1. 看这个属性能否在原型上使用
    // 2. 看这个属性是否公用
    constructor(executor) {
        this.status = PENDING // 默认是pending
        this.value = undefined;
        this.reason = undefined;
        // 存储成功的所有的回调 只有pending的时候才存储
        this.onResolvedCallbacks = [];
        // 存储所有失败的
        this.onRejectedCallbacks = [];
        const resolve = (value)=>{
            // 只有状态为 PENDING 时才允许修改状态，因为promise状态不可逆
            if(this.status === PENDING){
                this.value = value;
                this.status = FULFILLED;
                // 发布
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        const reject = (reason)=>{

            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                // 发布
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        // executor 中抛出错误时也会执行 reject()

        // 只能捕获同步错误
        try{
            executor(resolve, reject);
        } catch(e){
            reject(e)
        }
    }
    /**
     * @description:
     * then方法会用到一个发布订阅模式，处理 executor 中的异步代码.
     * 如果resolve()的是一个Promise，会自动将这个promise执行，并且采用他的状态，如果成功会将成功的结果向下一层传递，
     * 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then的失败的回调
     * 如果then方法返回了一个失败的promise他会走外层then的失败的回调
     *  1、（then中传递的函数）判断成功/失败函数的返回结果
     *  2、 如果是 promise 则，采用它的结果
     *  3、 如果不是promise 则，继续将结果传递下去
     * @param {*} onFulfilled,
     * @param {*} onRejected)
     */
    // then目前有两个参数，then方法就是异步的
    // 同一个promise then 多次, then 可选参数
    then(onFulfilled,  onRejected){
        // 处理 可选参数的情况
        onFulfilled = typeof  onFulfilled === "function"? onFulfilled:value=>value;
        onRejected = typeof onRejected === "function"?onRejected:err=>{
            // 将失败向下传递
            throw err;
        }
        // 可以不停的调用then方法,返还了一个新的promise
        // 异步的特点 等待当前主栈代码都执行后才执行
        let promise2;
        promise2 = new  Promise((resolve, reject)=>{
            // 同步处理
            if(this.status === FULFILLED){
                // 宏任务 为了保证promise2已经new完了
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        // x可能是普通值，也可能是promise
                        // 判断x的值， 推导promise2的状态
                        resolvePromise(promise2, x, resolve,reject)
                    }catch(e){
                        reject(e);
                    }

                },0)
            }
            if(this.status === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve,reject)
                    } catch(e){
                        reject(e);
                    }

                },0)

            }
            // 如果是异步就先订阅好
            // 如果是PENDING状态，那么应该将函数存起来 分组存放（异步处理）
            if(this.status === PENDING){
                // push() 参数为什么是函数？
                // this.onResolvedCallbacks.push(onFulfilled(this.value));
                // 这样做也可以，但是无法添加一些逻辑，比如在添加函数前做一些逻辑，所以这里采用函数的方式

                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x =  onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve,reject)
                        } catch(e){
                            reject(e);
                        }

                    },0)

                    // 这里可以添加额外的逻辑
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x =  onRejected(this.reason);
                            resolvePromise(promise2, x, resolve,reject)
                        } catch(e){
                            reject(e);
                        }
                    },0)
                })
            }
        })
        return promise2;
    }
    catch(onRejected){
        // 借助 之前实现的 .then 方法将错误信息传入该回调函数
        this.then(null, onRejected)
    }
    finally(callback){
        return this.then(data => {
            return Promise.resolve(callback()).then(() => data)
        }, err => {
            return Promise.resolve(callback()).then(() => {
                throw err
            })
        })
    }
}



// 测试代码
// npm install -g promises-aplus-tests


// 希望测试一下这个库是否符合我们的promise A+规范
// promises-aplus-tests Promise3.js


// Promise.defer() 可以解决封装嵌套的问题
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}



module.exports = Promise


