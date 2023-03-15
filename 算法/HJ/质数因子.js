/**
 * 描述
 * 功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）
 *
 * 输入：
 * 180
 *
 * 输出：
 * 2 2 3 3 5
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    // Write your code here
    let arr = [];
    let n = await readline();
    for(let i=2; i<=n/i; i++){
        if(n % i === 0){
            while(n % i === 0){
                n/=i;
                arr.push(i);
            }
        }
    }
    if(n > 1) arr.push(n);
    console.log(arr.join(" "))
}()
