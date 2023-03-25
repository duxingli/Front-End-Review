// after 在...之后

// 闭包  可以保存变量 times
function after(times, callback){
    return function(){
        if(--times === 0){
            callback();
        }
    }
}
let fn = after(3, function(){
    // 真正执行的函数
    console.log("really");
})
fn();
fn();
// 前两次不执行
fn(); // really

