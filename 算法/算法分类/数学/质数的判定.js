// 试除法
function isPrime(n)
{
    if(n<2) return false;
    for(let i=2; i<=n/i; i++){
        if(n%i === 0)
            return false;
    }
    return true;
}
// 30
// 1 30
// 2 15
// 3 10
// 5 6