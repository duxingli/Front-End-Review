// 同 跳台阶
function Fibonacci(n)
{
    // write code here
    if(n<=2) return 1;
    let pre = 1,cur=1,i=3,result = 0;
    while(i<=n){
        result = pre + cur;
        pre = cur;
        cur = result;
        i++;
    }
    return result;
}