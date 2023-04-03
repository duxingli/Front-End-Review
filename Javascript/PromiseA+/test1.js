let Promise = require("./Promise1");
const p1 = new Promise((resolve, reject) => {
    resolve('ok')
})
p1.then(data => {
    console.log('data', data);
})
// 同步
let p2 = new Promise((resolve, reject)=>{
    // executor 执行器
    console.log(1);
    // throw new Error("失败");
    resolve("hello")
    // reject("-----")
}).then((data)=>{
    console.log(data)
},(err)=>{
    console.log("err", err)
})
console.log(2);