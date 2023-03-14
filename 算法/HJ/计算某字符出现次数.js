/**
 * 输入描述：
 * 第一行输入一个由字母、数字和空格组成的字符串，第二行输入一个字符（保证该字符不为空格）。
 *
 * 输出描述：
 * 输出输入字符串中含有该字符的个数。（不区分大小写字母）
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    /**
     * 注意 (await readline()) 要带括号
     * @type {string}
     */
    let string = (await readline()).toLowerCase();
    let query = (await readline()).toLowerCase();
    let num = 0;
    string.split("").forEach((item)=>{
        if(item === query)
            num++;
    })
    console.log(num)
}()
