// function getData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve('hello'), 2000)
//     })
// }
// getData().then(res => {
//     console.log(res)
// })
// 立马输出hello
// 其实呢，这个差异就是 func() 和 func 的区别，setTimeout 的第一个参数是 func，如果用 func() 相当于其返回值为第一个参数
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 'hello')
    })
}
getData().then(res => {
    console.log(res)
})

// 2s后输出hello

// 本质相当于setTimeout 第三个参数，是给回调函数的
// 相当于
// function getData() {
//     return new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             resolve('hello')
//         },2000)
//     })
// }
// getData().then(res => {
//     console.log(res)
// })