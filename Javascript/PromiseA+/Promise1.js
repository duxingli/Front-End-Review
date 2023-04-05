const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
// 基础版
class Promise {
    constructor(executor) {
        // 默认是等待态
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        const resolve = value => {
            // 只有状态为 PENDING 时才允许修改状态，因为promise状态不可逆
            if (this.status === PENDING) {
                this.value = value
                this.status = FULFILLED
            }
        }
        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
            }
        }
        // new Promise() 报错的时候也会执行 reject()
        try {
            // 立即执行
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}

module.exports = Promise
