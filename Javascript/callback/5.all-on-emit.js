let fs = require("fs");
let event = {
    // 发布订阅模式  发布和订阅没有任何关系
    _arr:[],
    on(fn){
        this._arr.push(fn);
    },
    emit(){
        this._arr.forEach(fn => fn())
    }
}
let school = {};

event.on(function(){
    console.log("读取一个")
})
event.on(function(){
    if(Object.keys(school).length === 2){
        console.log(school)
    }
})

// 串行  并行
fs.readFile("./name.txt","utf8",function(err,data){
    school.name = data;
    event.emit();
})
fs.readFile("./age.txt","utf8",function(err,data){
    school.age = data;
    event.emit();
})

// 最终拿到一个整体的结果 {name:"dxl",age:18}
// 1.通过回调函数解决 after函数
// 2.发布订阅模式  发布emit和订阅on观察者模式
// 观察者(有关系的 而且是基于发布订阅模式) 和 发布订阅模式有什么区别

