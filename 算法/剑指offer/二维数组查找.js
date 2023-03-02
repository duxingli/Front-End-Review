function Find(target,array){
    let i = array.length -1;
    let j = 0;
    // 左下角坐标
    return compare(target, array, i, j);
}
function compare(target, array, i, j){
    if(array[i] === undefined || array[i][j] === undefined){
        return false;
    }
    const temp = array[i][j];
    if(target === temp){
        return true;
    }else if(target > temp){
        return compare(target, array, i, j+1);
    }else{
        return compare(target, array, i-1, j);
    }
}

// 二分查找
// function binarySearch(data, arr, start, end){
//     if(start > end){
//         return -1;
//     }
//     var mid = Math.floor((start+end)/2);
//     if(data === arr[mid]){
//         return mid;
//     }else if(data < arr[mid]){
//         return binarySearch(data,arr,start,mid-1);
//     }else{
//         return binarySearch(data,arr,mid+1,right);
//     }
// }