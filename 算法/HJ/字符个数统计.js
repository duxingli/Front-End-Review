/**
 * 描述
 * 编写一个函数，计算字符串中含有的不同字符的个数。字符在 ASCII 码范围内( 0~127 ，包括 0 和 127 )，换行表示结束符，不算在字符里。不在范围内的不作统计。多个相同的字符只计算一次
 * 例如，对于字符串 abaca 而言，有 a、b、c 三种不同的字符，因此输出 3 。
 *
 *
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    // Write your code here
    let rem = []
    while(string = await readline()){
        string.split("").forEach((item,index) =>{
            let i = item.charCodeAt(item);
            if(!rem.includes(i) && i>=0 && i<=127){
                rem.push(i);
            }
        })
    }
    console.log(rem.length)

    // let string = await readline();
    // console.log([...new Set(string)].length)
    /**
     * [...new Set(string)]   也可以对字符串去重，返回一个数组
     */
}()
