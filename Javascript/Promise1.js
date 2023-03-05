//https://juejin.cn/post/6850037281206566919
const PENDING = 'PENDING'
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED";
// promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
class myPromise{
    constructor(executor) {
        // 默认状态为 PENDING
        this.status = PENDING;
        // 存放成功状态的值，默认为 undefined 可以是undefined/thenable/promise
        this.value = undefined;
        // 存放失败状态的值，默认为 undefined
        this.reason = undefined;

        // 解决异步代码调用 then 方法时，当前的 promise 并没有成功一直处于 pending 状态。的问题   --> 先将成功和失败的回调分别存放起来，在executor()的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调
        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectCallbacks = [];

        // 调用此方法就是成功
        let resolve = (value) => {
            if(this.status === PENDING){
                this.status = FULFILLED;
                this.value = value;
                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        // 调用此方法就是失败
        let reject = (reason) => {
            if(this.status === PENDING){
                this.status = REJECTED;
                this.reason = reason;
                // 依次将对应的函数执行
                this.onRejectCallbacks.forEach(fn=>fn());
            }
        }
        try{
            // executor接受两个参数，分别是resolve和reject
            // 立即执行，将 resolve 和 reject 函数传给使用者
            executor(resolve, reject)
        } catch(error){
            // 发生异常时执行失败逻辑
            reject(error);
        }
    }
    // promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected
    then(onFulfilled, onRejected) {
        //如果调用then时，promise 已经成功，则执行onFulfilled，参数是promise的value
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }
        //如果调用then时，promise 已经失败，那么执行onRejected, 参数是promise的reason；如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }

        // 处理异步
        if(this.status === PENDING){
            // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value);
            })
            this.onRejectCallbacks.push(()=>{
                onRejected(this.reason);
            })

        }

    }
}


const promise = new myPromise((resolve, reject)=>{
    // resolve("成功");
    setTimeout(()=>{
        resolve("成功")
    },1000)
}).then(
    (data)=>{
        console.log("success", data);
    },
    (err) =>{
        console.log("failed",err)
    }
)
