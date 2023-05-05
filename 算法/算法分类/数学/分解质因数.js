function devide(n)
{
    for(let i=2; i<=n/i;i++){
        if(n%i === 0){
            let s = 0;
            while(n % i===0){
                n/=i;
                s++;
            }
            console.log(i," ",s)
        }
    }
    if(n != 1)
        console.log(n," ",1);
}

divide(36);
//  36 = 2 * 2 * 3 * 3
//2 2
//3 2