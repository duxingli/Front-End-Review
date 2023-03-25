let fs = require("fs");

function after(times, cb){
    let school = {};
    // 如果达到次数就执行after方法的回调函数 并将结果传入
    return function(key, value){
        school[key] = value;
        if(--times === 0){
            cb(school)
        }
    }
}
let out = after(2,function(result){
    console.log(result);
})

// 串行  并行
fs.readFile("./name.txt","utf8",function(err,data){
    out("name",data);
    console.log(data);
})
fs.readFile("./age.txt","utf8",function(err,data){
    out("age",10);
    console.log(data);
})

// 最终拿到一个整体的结果 {name:"dxl",age:18}
// 1.通过回调函数解决 after函数
// 2.发布订阅模式