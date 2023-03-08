let arr = [2,5,[7,8,[2,3,1,[3,9,8,[2,8]]]]]

// 可以带深度的

function flatten(arr,depth=1){
    let copy = arr.slice();
    while(copy.some(item => Array.isArray(item)) && depth >0){
        copy = [].concat(...copy);
        depth--;
    }
    return copy;
}


// 方法一 ES6
// function flatten(arr){
//     return arr.flat(Infinity)
// }

// 方法二 转字符串toString / join()

// let arr =  [1,2,3,[4,5],6]
// arr.toString() // '1,2,3,4,5,6'
// function flatten(arr){
//     return arr.toString().split(",").map(item => +item);
//     // return arr.join().split(",")
// }


// 方法三 concat 递归
// function flatten(arr){
//     let result = [];
//     for(let i=0; i<arr.length; i++){
//         if(Array.isArray(arr[i])){
//             result = result.concat(flatten(arr[i]));
//         }else{
//             result.push(arr[i]);
//         }
//     }
//     return result;
// }

// 方法四 reduce 递归
// function flatten(arr){
//     return arr.reduce((pre, cur)=>{
//         return pre.concat(Array.isArray(cur)? flatten(cur):cur);
//     }, []);
// }
// 方法五 es6的扩展运算符能将二维数组变为一维
// function flatten(arr){
//     while(arr.some(item => Array.isArray(item))){
//         arr = [].concat(...arr);
//     }
//     return arr;
// }

// 方法六 正则
// function flatten(arr){
//     let str = JSON.stringify(arr);
//     let replaceStr = str.replace(/(\[|\])/g, "");
//     return replaceStr.split(",").map(item => item*1) //+item
// }
