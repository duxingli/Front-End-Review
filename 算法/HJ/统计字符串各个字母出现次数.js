var str = 'abcdaabc';
// console.log(str.split('')) // [ 'a', 'b', 'c', 'd', 'a', 'a', 'b', 'c' ]

let resObj = str.split('').reduce((pre, cur) => {
    pre[cur] ? pre[cur]++ : pre[cur] = 1
    return pre; // 一定要return  要不然接收不到
}, {})
// { a: 3, b: 2, c: 2, d: 1 }

// 箭头函数，省略了 return
// let resObj = str.split("").reduce((previous, current) => (
//             previous[current]++ || (previous[current] = 1), previous
//         ),{})
console.log(resObj);
