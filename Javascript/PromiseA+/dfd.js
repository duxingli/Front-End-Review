let Promise = require("./Promise3");

let fs = require("fs");

// function read(url){
//     return new Promise((resolve, reject)=>{
//         fs.readFile(url, "utf8",function(err, data){
//             if(err) reject(err);
//             resolve(data);
//         })
//     })
// }

// Promise.defer() 可以解决封装嵌套的问题
function read(url){
    let dfd = Promise.defer();
    fs.readFile(url, "utf8",function (err,data){
        if(err) dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise; // 返回一个promise
}
read("./name.txt").then(data =>{
    console.log(data);
})


