const promisify = (fn)=>{
    return function(...args){
        return new Promise((resolve, reject)=>{
            fn(...args,function(err, data){
                if(err) return reject(err);
                resolve(data)
            })
        })
    }
}
// node 中所有的 api 都转换成 promise
// function promises(obj){
//     for(let key in obj){
//         if(typeof obj[key] === "function"){
//             obj[key] = promise(obj[key])
//         }
//     }
// }
const promises = (target)=>{
    //  将对象转为数组,遍历数组中的fn，依次完成 promisify 操作
    //   Object.keys(obj).forEach
    Reflect.ownKeys(target).forEach(key =>{
        if(typeof target[key] === 'function'){
            // 默认会将原有的方法 全部增加一个 Async 后缀 变成 promise 写法
            target[key+'Async'] = promisify(target[key]);
        }
    })
    return target;
}