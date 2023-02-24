const data = [1, 2, 3, 0, 0, 0, 5, 2, 0, 1, 0, 0, 2];
//去除三个及以上相邻的0
//返回结果：[1,2,3,5,2,0,1,0,0,2]

function test(arr){
    if(!Array.isArray(arr)){
        return
    }
    for(let i=0; i<arr.length;i++){
        if(arr[i] === 0){
            let j = i+1;
            let count = 1;
            while(arr[j++] === 0){
                count++;
            }
            if(count >= 3){
                arr.splice(i, count);
            }
        }
    }
    console.log(arr);
    return arr;
}
test(data)