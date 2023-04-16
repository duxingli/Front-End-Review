/**
 * c++  lowbit操作 找出最后一位1
 */
// int 32位
// int NumberOf1(int n) {
//     int res = 0;
//     for (int i = 0; i < 32; i ++)
//     res += n >> i & 1;//如果n的第i位是1，则res+1；否则什么也不会发生
//     return res;
// }

// 不固定次数
// int NumberOf1(int n) {
//     unsigned int x = n;
//     int res = 0;
//     while (x) res += x & 1, x >>= 1;
//     return res;
// }
// #include <iostream>
// using namespace std;
// int lowbit(int x)
// {
//     return x&(-x);
// }
// int main() {
//     int n,res=0;
//     cin >> n;
//     while(n){
//         n -= lowbit(n);
//         res ++;
//     }
//     cout<<res;
// }

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

function lowbit(x){
    return x&(-x);
}
void async function () {
    // Write your code here

    while(line = await readline()){
        let n = line.split(' ');
        let res = 0;
        while(n){
            n -= lowbit(n);
            res++;
        }
        console.log(res);
    }
}()

