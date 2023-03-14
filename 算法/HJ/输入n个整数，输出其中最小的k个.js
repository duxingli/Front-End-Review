/**
 * 描述
 * 输入n个整数，找出其中最小的k个整数并按升序输出
 *
 * 本题有多组输入样例
 *
 * 数据范围： 1<=n<=1000  输入的整数满足1 <= val <=10000
 *
 * 输入描述：
 *      第一行输入两个整数n和k
 *      第二行输入一个整数数组
 *
 * 输出描述：
 *      从小到大输出最小的k个整数，用空格分开
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let line1 = await readline();
    let line2 = await readline();
    let n = line1.split(" ")[0];
    let k = line1.split(" ")[1];
    let arr = line2.split(' ');
    arr.sort((a,b) => a-b).forEach((item, index) =>{
        if(index < k){
            process.stdout.write(item+" ")
            /**
             *  https://www.cnblogs.com/taohuaya/p/16427408.html
             *
             *  不换行打印
             *      process.stdout.write(item+" ")
             *      \r代表回车，\n代表换行
             *
             *      console.log(arr.join(" "))
             */
        }
    })
}()
