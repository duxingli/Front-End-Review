// finally 最终的 try catch finally  ES9

let p = new Promise((resolve, reject)=>{
    resolve(1000);
})

// Promise.resolve.finally = function(cb){
//     return p.then(
//         // 处理 cb函数返回promise的可能 可以等待这个promise执行完成  then 返回上一次的data 所以参数为空
//         data =>
//          Promise.resolve(cb()).then(()=>data),
//         err => Promise.resolve(cb()).then(()=>{
//             throw err;
//         })
//     )
// }
// Promise.prototype.finally = function(cb){
//     return p.then(data => {
//         cb(); // 执行完没有等待直接return
//         return data; // 如果是成功走到下一个人的成功里
//     },err=>{
//         cb();
//         throw err;
//     })
// }


Promise.prototype.finally = function(cb){
    return p.then(data => {
        // 处理 cb函数返回promise的可能 可以等待这个promise执行完成  then 返回上一次的data 所以参数为空
        return Promise.resolve(cb()).then(()=>data);
    },err=>{
        return Promise.resolve(cb()).then(()=>{
            throw err;
        })
    })
}
p.finally(()=>{
    console.log("最终的")
}).then(data =>{
    console.log(data);
}).catch(e => {
    console.log(e);
})

