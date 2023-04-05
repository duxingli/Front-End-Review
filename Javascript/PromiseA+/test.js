let fs = require("fs");
const Promise = require("./2.Promise1");
// fs.readFile("./name.txt","utf8",function(err,data){
//     fs.readFile(data,"utf8",function(err, data){
//         console.log("age",data);
//     })
// })
function read(url){
    return new Promise((resolve, reject)=>{
        fs.readFile(url, "utf8", function(err, data){
            if(err) reject(err);
            console.log(data)
        })
    })
}
// 如果一个promise中的then方法中的函数(成功和失败)返回的结果是一个promise的话，会自动将这个promise执行，并且采用它的状态,若果成功会将成功的结果向外层的下一个then传递

read("./name.txt").then((data)=> {
    return read(data+"1");
}, err => {
    console.log(err);
}).then(data =>{
    console.log(data);
},err=>{
    console.log(err);
    // return 1;
    // 如果返回的是一个普通值 那么会将这个普通值作为下一次的成功的结果
    // 若果希望在这里不要继续向下走then
    return new Promise(()=>{}) // 终止promise 可以返回一个pending的Promise
}).then(data =>{
    console.log("success");
},()=>{
    console.log("err");
})
// 如果返回的是一个普通值 那么会将这个普通值作为下一次的成功的结果

// 只有两种情况会失败
// 返回一个失败的promise、抛出异常