let p = new Promise((resolve, reject)=>{
    reject(1000);
})
// 原型上的方法  p--> this
Promise.prototype.catch = function(onRejected){
    p.then(null, onRejected)
}
p.catch(e => {
    console.log(e);
})
