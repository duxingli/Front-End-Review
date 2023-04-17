/**
 * 给定一个字符串s，s包括以空格分隔的若千个单词，请对s进行如下处理后输出单词内部调整
 * 1.对每个单词字母重新按 字典序排序Q1
 * 2.单词间顺序调整:
 * 1) 统计每个单词出现的次数，并按次数 降序排列Q
 * 2) 次数相同，按 单词长度升序排列
 * 3) 次数和单词长度均相同，按字典升序排列
 * 请输出处理后的字符串，每个单词以一个空格分隔。
 *
 * 输入描述:
 *     [a-ZA-z0-9] 以及空格，字符串长度范围:[1，1000]一行字符串，每个字符取值范围:例1:
 *  输入
 *  This is an apple
 *  输出
 *  an is This aelpp
 *
 *  输入:
 *  My sister is in the house not in the yard
 *  输出:
 *  in in eht eht My is not adry ehosu eirsst
 *
 *
 * map forEach 区别
 *
 * forEach() 可以做到的东西，map() 也同样可以。反过来也是如此。
 * map() 会分配内存空间存储新数组并返回，forEach() 不会返回数据。
 * forEach() 允许callback更改原始数组的元素。map() 返回新的数组。
 *
 * 统计某个字符(串)出现的次数：ab
 *  str.match(/ab/g).length
 */

let readline = require("readline");
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.on("line", function (line){
    let arr = line.split(" ");
    // 单词内部排序
    arr.forEach((item,index) => {
        arr[index] =  item.split("").sort().join("");
    })
    // 单词间排序
    const countObj = arr.reduce(function(pre, cur){
       pre[cur] ? pre[cur]++ : pre[cur]=1;
       return pre;
    },{})
    arr.sort((a,b)=>{
        if(countObj[a] !== countObj[b]){
            return countObj[b] - countObj[a];
        }
        else if(a.length !== b.length){
            return a.length- b.length;
        }
        else {
            // 升序
            return a-b ? 1 : -1
        }
    })
    console.log(arr.join(" "))
})






