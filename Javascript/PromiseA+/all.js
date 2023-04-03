// Promise.all 全部  可以实现等待所有的异步执行完后，拿到统一的结果
// 解决异步开发 同步处理结果
let Promise1 = require("./Promise3");
//
let fs = require("fs");
function read(url){
    let dfd = Promise1.defer();
    fs.readFile(url, "utf8",function (err,data){
        if(err) dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise;
}


/**
const p = Promise.all([p1, p2, p3])
最终p的状态由p1、p2、p3决定，分成两种情况。
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
*/
const isPromise = (value) =>{
    if(typeof value === "object" && value !== null || typeof value === "function"){
        if(typeof value.then === "function"){
            return true;
        }
    }else{
        return false;
    }
}
// 重写all
Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let arr = [];
        let index = 0; // 解决多个异步的并发问题，要使用计数器
        function processData(key, value){
            arr[key] = value;
            if(values.length === ++index){
                resolve(arr);
            }
        }
        for(let i=0;i<values.length;i++){
            let current = values[i];
            if(isPromise(current)){
                current.then((data)=>{
                    processData(i,data)
                }, reject)
            }else{
                processData(i,current)
            }
        }
    })
}

// 原生的Promise 用数组排序，整体是有序的
// all 静态方法  全部成功就成功，有任何一个失败就失败
// 测试1
// Promise.all([1,2,3,read("./name.txt"),5,6,7]).then(data=>{
//     console.log(data);
// })

// 测试2
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve)=>{
    setTimeout(()=> resolve(2),1000);
})
const p3 = new Promise((resolve) => {
    setTimeout(() => resolve(3), 3000);
})
const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')

// 1. 所有的Promise都成功了
const p11 = Promise.all([ p1, p2, p3 ]).then(value=>{
    console.log(value)
},err =>{
    console.log(err)
})
// [ 1, 2, 3 ]

// 2. 有一个Promise失败了
const p12 = Promise.all([ p1, p2, p4 ]).then(console.log).catch(console.log) // err4

// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
const p13 = Promise.all([ p1, p5, p4 ]).then(console.log).catch(console.log) // err5
// 与原生的Promise.all返回是一致的


// 一个函数
// Promise.all = function(values) {
//     if (!Array.isArray(values)) {
//         const type = typeof values;
//         return new TypeError(`TypeError: ${type} ${values} is not iterable`)
//     }
//
//     return new Promise((resolve, reject) => {
//         let resultArr = [];
//         let orderIndex = 0;
//         const processResultByKey = (value, index) => {
//             resultArr[index] = value;
//             if (++orderIndex === values.length) {
//                 resolve(resultArr)
//             }
//         }
//         for (let i = 0; i < values.length; i++) {
//             let value = values[i];
//             if (value && typeof value.then === 'function') {
//                 value.then((value) => {
//                     processResultByKey(value, i);
//                 }, reject);
//             } else {
//                 processResultByKey(value, i);
//             }
//         }
//     });
// }
