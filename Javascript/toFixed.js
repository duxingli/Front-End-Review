/**
 * 四舍五入 保留指定小数
 *  toFixed(n) : 会返回字符串，而且用 Number()转回来会损失精度
 *               浏览器兼容问题
 *
 * https://juejin.cn/post/7217773631371182117
 * https://juejin.cn/post/7094834085889048590
 *      1.05.toFixed(1) --> '1.1'
 *      1.15.toFixed(1) --> '1.1' ???
 *
 *      X : 1.05
 *      f : 1  保留小数位数
 *      n : 这一步找出的结果
 *
 *  n满足条件：
 *      整数且 n * 10^(-f)  - x 接近 0 如果这样的数找到2个，取其中较大的那个
 *          也就是 n * 10^(-f)  == x
 *
 *      n  *  0.1 = 1.05
 *      n = 10 / 11   取 11
 *
 *
 *  银行家舍入规则: 四舍六入五取偶（又称四舍六入五留双）法
 *      保留位数的后一位如果小于5，则舍去。
 *      保留位数的后一位如果大于5，则进上去。
 *      保留位数的后一位如果是5
 *      且5后面仍有数，则无论奇偶都要进入。
 *      若5后面不再有数，要根据尾数“5”的前一位决定: 如果是奇数则进入，如果是偶数则舍去。
 * 5.214 ≈ 5.21（4小于5）
 * 5.216 ≈ 为5.22（6大于5）
 * 5.2254 ≈ 5.23（5后面有数，进入）
 * 5.215 ≈ 5.22（5后面没数，前一位1是奇数，进入）
 * 5.225 ≈ 5.22（5后面没数，前一位2是偶数，舍弃）
 *
 *      不准 ???  就是浮点数精度问题导致的误差，我们可以来看看5.215到底是何方妖孽：
 * 5.215.toPrecision(17) --> '5.214999999'
 * 那么此时按照奇进偶舍的规则，第三位4小于5直接舍弃，就成了5.21。
 *
 *      0.00 + 0.01 + 0.02 + 0.03 + 0.04 + 0.05 +0.06 +0.07 + 0.08 + 0.09 盈利
 *
 *      0.00 + 0.01 + 0.02 + 0.03 + 0.04
 *      - （0.10-0.05） - （0.10-0.06） - （0.10-0.07） - （0.10-0.08） + （0.10-0.09）
 *
 *      0.00 + 0.01 + 0.02 + 0.03 + 0.04 - 0.05 - 0.04 - 0.03 - 0.02 - 0.01 = -0.05
 *      银行亏了？？
 *
 *      但是用银行家舍入规则 -> 正态分布，银行持平，不会吃亏
 *
 *  不同的浏览器实现可能会有差异!!!!
 */
// 保留一位小数： 取整+0.5

// 方法二： Math.round  不准
console.log(Math.round(321201.595 * 100) / 100) // 321201.59


// 方法三：将数字当做字符串，手动的进行小数点移位处理小数点后的第三位，如果大于等于5，就在原来的基础上 + 0.01，目前来看没有什么问题。
// 保留两位小数
function num2Fixed(num,precise) {
    const numStr = num.toString();
    if (numStr.includes('.')) {
        const numArr = numStr.split('.');
        const decimalNum = parseInt(`${numArr[1][precise]}`, 10);
        let numcArr = [];
        if (decimalNum >= 5) {
            numcArr = (num + Math.pow(10, -precise)).toString().split('.'); // 这里不放心的话可以用mathjs的方法
        } else {
            numcArr = num.toString().split('.');
        }
        return parseFloat(`${numcArr[0]}.${numcArr[1].substring(0, precise)}`);
    }
    return num;
}


console.log(num2Fixed(5.45435,2))


