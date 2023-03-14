/**
 * 描述
 * 输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。
 * 保证输入的整数最后一位不是 0 。
 *
 * 数据范围： 1 <= n <= 1e8
 *
 * 输入描述：
 *      输入一个int型整数
 *
 * 输出描述：
 *      按照从右向左的阅读顺序，返回一个不含重复数字的新的整数
 *
 * 示例1
 * 输入：
 * 9876673
 * 输出：
 * 37689
 */


const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let arr = line.split("").reverse()
        let list = Array.from(new Set(arr));
        console.log(list.join(""))

        // console.log([...new Set(line.split("").reverse())].join(""))

        /**
         *  类数组转数组
         *      Array.from(arrayLike)
         *      [...arrayLike]
         */
    }
}()

