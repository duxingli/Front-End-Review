// 异步
let Promise = require("./Promise2");
let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("hello")
    },1000)
}).then(value => {
    console.log(value)
})


