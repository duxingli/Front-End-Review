// promise.resolve 是具备等待功能的.如果参数是 promise 会等待这个 promise 解析完毕，在向下执行，所以这里需要在 resolve 方法中做一个小小的处理
Promise.resolve = function(value){
    // 1 参数是一个 Promise 实例,不做任何修改、原封不动地返回这个实例
    if(value instanceof Promise){
        return value;
    }
    // 2 参数是一个thenable对象,将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
    if(value.then){
        return new Promise((resolve, reject)=>{
            value.then(resolve, reject);
        })
    }
    // 3 参数不是具有then方法的对象，或根本就不是对象
    // 4 不带有任何参数
    return new Promise((resolve, reject)=>{
        resolve(value);
    })
}
// 测试
Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 3000);
})).then(data=>{
    console.log(data,'success')
}).catch(err=>{
    console.log(err,'error')
})
