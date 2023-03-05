// 问题 打印 1 2 3 4 5

// for (var i=1; i<=5; i++) {
//     setTimeout( function timer( ) {
//         console.log( i );
//     },
//     i*1000 );
// }
// 只打印6


// 因为setTimeout()第一个参数是函数，无法加其他语句(函数执行)
// 所以我就用了立即执行和call()两种方式让函数执行

// 立即执行函数

// for(var i=1; i<=5; i++){
//     (function(j){
//         setTimeout(function(){
//             console.log(j);
//         },1000*j)
//     })(i)
// }

// for(var i=1;i<=5;i++){
//     setTimeout(
//         (function(j){
//                 return function(){
//                     console.log(j);
//                 }
//             }
//         )(i)
//         ,i*1000);
// }

// setTimeout第三个参数
// for(var i=1;i<=5;i++){
//     setTimeout(function(j){
//         console.log(j);
//     },i*1000,i);
// }

// for(var i = 1;i<=5;i++){
//     var j =1;
//     setTimeout(function(){
//         console.log(j);
//         j++;
//     },1000*i)
// }


// ES6
// for(let i=1;i<=5;i++){
//     setTimeout(function(){
//         console.log(i)
//     },1000*i)
// }


