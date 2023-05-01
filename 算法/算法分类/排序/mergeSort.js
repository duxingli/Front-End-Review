let arr = [3,2,5,8,4,7,6,9,0,1];
function mergeSort(arr){
    if(arr.length > 1){
        let mid = Math.floor(arr.length/2);
        let left = mergeSort(arr.slice(0,mid));
        let right = mergeSort(arr.slice(mid));
        arr = merge(left, right);
    }
    return arr;
}

function merge(left, right){
    let i=0, j=0, result = [];
    while(i<left.length && j <right.length){
        result.push(left[i]<right[j] ? left[i++] : right[j++]);
    }
    //合并剩下的  i/j 有一个等于length
    return result.concat(i<left.length? left.slice(i): right.slice(j));
}

console.log(mergeSort(arr))