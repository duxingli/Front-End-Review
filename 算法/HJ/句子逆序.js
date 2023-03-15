/**
 * 描述
 * 将一个英文语句以单词为单位逆序排放。例如“I am a boy”，逆序排放后为“boy a am I”
 * 所有单词之间用一个空格隔开，语句中除了英文字母外，不再包含其他字符
 *
 * 注意本题有多组输入
 * 输入描述：
 *      输入一个英文语句，每个单词用空格隔开。保证输入只包含空格和字母。
 *
 * 输出描述：
 *      得到逆序的句子
 * @type {Interface}
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let arr = line.trim().split(' ');
        console.log(arr.reverse().join(" "))
    }
}()
