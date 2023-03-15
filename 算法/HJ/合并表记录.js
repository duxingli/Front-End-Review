/**
 * 描述
 * 数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。
 *
 * 输入描述：
 * 先输入键值对的个数n（1 <= n <= 500）
 * 接下来n行每行输入成对的index和value值，以空格隔开
 *
 * 输出描述：
 * 输出合并后的键值对（多行）
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    // Write your code here
    let n = await readline();
    let obj = {}
    while(n--){
        let tokens = (await readline()).split(" ");
        let a = parseInt(tokens[0]);
        let b = parseInt(tokens[1]);
        if(obj[a]){
            obj[a] += b;
        }else{
            obj[a] = b;
        }
    }
    for(let i in obj){
        console.log(`${i} ${obj[i]}`)
    }
}()
