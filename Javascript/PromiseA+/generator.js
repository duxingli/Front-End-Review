// dva generator es6规范里面 可以和promise进行配合

// 这就是一个generator 函数，特点就是可以暂停
// * yield 产出
// iterator 迭代器

// for of 循环 必须要有iterator
// 类数组转数组 (Array.from有迭代器   [...likeArray],没有迭代器)

// function* read(){
//     yield 1;
//     yield 2;
//     yield 3;
//     return 100
// }
// let it = read();
// console.log(it.next()); // { value: 1, done: false }
// console.log(it.next());
// console.log(it.next());
// console.log(it.next()); // { value: 100, done: true }

// 类数组
// let obj = {
//     0:1,
//     1:2,
//     length:2
// }
// console.log([...obj]); // obj is not iterable
// console.log(Array.from(obj)) //[ 1, 2 ]

// let obj = {
//     0:1,
//     1:2,
//     [Symbol.iterator](){
//         let index = 0;
//         console.log(this)
//         return {
//             next(){
//                 return {
//                     value:this.index++,
//                     done:this.length === index++
//                 }
//             }
//         }
//     },
//     length:2
// }
// console.log([...obj]);



// 更好的做法  用生成器去 生成迭代器
// let obj = {
//     0:1,
//     1:2,
//     *[Symbol.iterator](){
//         for(let i=0; i< this.length; i++){
//             yield this[i];
//         }
//     },
//     length:2
// }
// console.log([...obj]); // [ 1, 2 ]


// function* read(){
//     let a = yield "hello";
//     console.log(a,"----");  // 1
//     let b = yield "world";
//     console.log(b,"****");  // 2
// }
// let it = read();
// // 第一次next传参无意义
// console.log(it.next()); // { value: 'world', done: false }
// console.log(it.next(1)); // { value: 'world', done: false }
// console.log(it.next(2)); // { value: undefined, done: true }

// let fs = require("fs").promises;
// function* read(){
//     let content = yield fs.readFile("./name.txt","utf8")
//     let r = yield fs.readFile(content, "utf8");
//     return r;
// }
// let it = read();
// let {
//     value,
//     done
// } = it.next();
// Promise.resolve(value).then(data => {
//     let {
//         value,
//         done
//     } = it.next(data);
//     // Promise.resolve确保是promise 可以使用then
//     Promise.resolve(value).then(data => {
//         let {
//             value,
//             done
//         } = it.next(data);
//         console.log(value)
//     })
// })


// 重复操作->循环  但是循环不支持异步 -> 递归

// let fs = require("fs").promises;
// function* read(){
//    try{
//        let content = yield fs.readFile("./name.txt","utf8")
//        let r = yield fs.readFile(content, "utf8");
//        return r;
//    }catch(e){
//        console.log("err", e);
//    }
// }
// // generator -runtime
// function co(it){
//     return new Promise((resolve, reject)=>{
//         function next(data){
//             let {
//                 value,
//                 done
//             } = it.next(data);
//             if(!done){
//                 // 包装成 Promsie
//                 Promise.resolve(value).then(data => {
//                     // console.log(data);
//                     next(data);
//                 },err => {
//                     it.throw(err); // 可以捕获generator中异常
//                     // reject();
//                 })
//             }else{
//                 resolve(data);
//             }
//         }
//         next()
//     })
// }
// co(read()).then(data => {
//     console.log(data);
// }, err =>{
//     console.log(err);
// })
// 基于 generator + co



// async await 会编译成generator + co
// let fs = require("fs").promises;
// // 会把所有fs API  编程PromiseAPI
// async function read(){
//     try{
//         let content = await fs.readFile("./name.txt","utf8")
//         let r = await fs.readFile(content, "utf8");
//         return r;
//     }catch(e){
//         console.log("err", e);
//     }
// }
// read().then(data => {
//     console.log(data);
// },err => {
//     console.log(err)
// })

// 1) 回调 高阶函数 aop
// 2) promise实现原理 发布订阅 + 回调
// 3) generator +CO
// 4) async + await

// 封装 promises;

let fs = require("fs")
function promise(fn){
    return function(...args){
        return new Promise((resolve, reject)=>{
            fn(...args,function(err, data){
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
}
function promises(obj){
    for(let key in obj){
        if(typeof obj[key] === "function"){
            obj[key] = promise(obj[key])
        }
    }
}

promises(fs);
fs.readFile("name.txt","utf8").then(data =>{
    console.log(data);
})


