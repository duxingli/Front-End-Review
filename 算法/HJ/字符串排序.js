/**
 * 描述
 * 给定 n 个字符串，请对 n 个字符串按照字典序排列
 * 输入描述：
 * 输入第一行为一个正整数n (1≤n≤1000),下面n行为n个字符串(字符串长度≤100),字符串中只含有大小写字母。
 * 输出描述：
 * 数据输出n行，输出结果为按照字典序排列的字符串。
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let arr = []
    let n = await readline();
    for(let i=0;i<n;i++){
        arr[i] = await readline();
    }
    arr.sort().forEach(item =>{
        console.log(item)
    })
}()



void async function () {
    // Write your code here
    let arr = []
    let n = await readline();
    for(let i=0;i<n;i++){
        arr[i] = await readline();
    }
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-1-i;j++){
            if(arr[j] > arr[j+1]){
                let t = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = t;
            }
        }
    }
    arr.forEach(item=>{
        console.log(item)
    })
    /**
     * 热知识  字符串之间是可以比较大小的   "a" < "b" true
     * "adasd" < "dsdad"  true
     * 所以就当初数字处理就行了
     */
}()
