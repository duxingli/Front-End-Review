Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        // console.log(1111)
        reject(reason)
    });
}
// 测试
Promise.reject(new Promise((resolve, reject) => {
    // console.log(2222)
})).then(data=>{
    console.log(data,'success')
}).catch(err=>{
    console.log(err,'error')
})
