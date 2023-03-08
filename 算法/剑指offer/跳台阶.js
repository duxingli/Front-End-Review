// 递归
// function jumpFloor(n)
// {
//     // write code here
//     if(n <= 2) return n;
//     return jumpFloor(n-1) + jumpFloor(n-2);
// }

// 递推
function jumpFloor(n)
{
    // write code here
    if(n<=2) return n;
    let pre = 1,cur = 2,i=3,result=0;
    while(i<=n){
        result = pre + cur; // 3的result
        pre = cur;
        cur = result;
        i++;
    }
    return result;
}