// 嵌套  -> then 链式调用

// let Promise = require("./Promise2.js")

// let p = new Promise((resolve, reject)=>{
//     resolve(100);
// })

// let promise2 = p.then(data => {
//     // throw new Error("出错了");
//     setTimeout(() => {
//         resolve(new Promise((resolve, reject)=>{
//             setTimeout(()=>{
//                 resolve("1000")
//             },1000)
//         }))
//     }, 1000)
// })
// promise2.then(data =>{
//     console.log(data);
// },err =>{
//     console.log(err);
// })


// 可选参数
let p = new Promise((resolve, reject)=>{
    resolve(123);
    // reject(123);
})

p.then(data => {
    return data;
}, err=>{
    throw err;
}).then(data =>{
    return data;
},err=>{
    throw err;
}).then(data =>{
    console.log(data);
},err =>{
    console.log(err);
})




