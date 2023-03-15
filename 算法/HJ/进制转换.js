/**
 * 写出一个程序，接受一个十六进制的数，输出该数值的十进制表示。
 *
 *
 * 进制转换
 *      toString  可用于将整数数据转换为字符串，其中可包含一个参数toString(a)，a代表输出为a进制的字符串
 *          let a = 15;
 *          let b = 0xAA;
 *          a.toString(2)  1111
 *          a.toString(10) 15
 *          a.toString(16) f
 *          b.toString()  10进制    170
 *
 *      ParseInt 可用于将字符串转换为整形，其中可包含两个参数parseInt(a,b)，a代表被转换的对象，b代表以b进制的形式去读取，最后返回的就是对应10进制的值
 *      let a = "1111";
 *      let b = "15"
 *      parseInt(a, 2) 15
 *      parseInt(b, 16) 21
 *      parseInt(a, 19) 1111
 *
 *     !! ParseInt   ParseFloat 都是字符串方法
 *
 * 使用Number()可以进行进制转换：
 *     第一个参数是需要进行转换的数字，
 *     第二个参数是需要转换成的进制，例如2，8，16，10等
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void async function () {
    // Write your code here
    line = parseInt(await readline());
    console.log(line.toString(10))  // 不传参数也可以

    // line = await readline();
    // console.log(parseInt(line, 16))


    // console.log(Number(line, 16))
}()

