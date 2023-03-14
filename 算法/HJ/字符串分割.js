/**
 * 描述
 * •输入一个字符串，请按长度为8拆分每个输入字符串并进行输出；
 *
 * •长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。
 *
 * 输入描述：
 * 连续输入字符串(每个字符串长度小于等于100)
 *
 * 输出描述：
 * 依次输出所有分割后的长度为8的新字符串
 */


const rl = require("readline").createInterface({
    input: process.stdin,
    output:process.stdout
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    line = await readline()
    while(line.length%8 !== 0){
        line += "0";
    }
    for(let i=0;i<(line.length/8); i++){
        // console.log 换行
        rl.output.write(line.slice(i*8,(i*8)+8)+"\n")
    }

    // for(let i=0;i<line.length; i+=8){
    //     console.log(line.slice(i,i+8))
    // }
}()
