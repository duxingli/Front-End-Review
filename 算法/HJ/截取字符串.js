/**
 * 描述
 * 输入一个字符串和一个整数 k ，截取字符串的前k个字符并输出
 *
 * 数据范围：字符串长度满足  1 ≤ n ≤ 1000  ，  1 <= k <= n
 *
 * 输入描述：
 * 1.输入待截取的字符串
 * 2.输入一个正整数k，代表截取的长度
 *
 * 输出描述：
 * 截取后的字符串
 * @type {Interface}
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let inputs = [];
void async function () {
    // Write your code here
    while(line = await readline()){
        inputs.push(line)
        if(inputs.length === 2){
            let string = inputs[0];
            let k = parseInt(inputs[1]);
            console.log(string.slice(0,k))
        }
    }
}()
