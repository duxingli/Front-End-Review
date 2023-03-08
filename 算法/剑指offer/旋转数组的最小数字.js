/**
 * (1)`array[mid] > array[high]`:
 * 出现这种情况的`array`类似`[3,4,5,6,0,1,2]`，此时最小数字一定在mid的右边。
 * `low = mid + 1`
 *
 * (2)`array[mid] == array[high]`:
 * 出现这种情况的`array`类似 `[1,0,1,1,1] `或者`[1,1,1,0,1]`，此时最小数字不好判断在mid左边还是右边,这时只好一个一个试 。
 * `high = high - 1`
 *
 * (3)`array[mid] < array[high]`:
 * 出现这种情况的`array`类似`[2,2,3,4,5,6,6]`,此时最小数字一定就是`array[mid]`或者在`mid`的左边。因为右边必然都是递增的。
 * `high = mid`
 */
function minNumberInRotateArray(arr)
{
    let len = arr.length;
    if(len == 0)  return 0;
    let low = 0, high = len - 1;
    while(low < high) {
        let mid = low + Math.floor((high-low)/2);
        if(arr[mid] > arr[high]) {
            low = mid + 1;
        } else if(arr[mid] == arr[high]) {
            high = high - 1;
        } else {
            high = mid;
        }
    }
    return arr[low];
}

// 二分查找 下标
// function binarySearch(data, arr, start, end){
//     if(start > end){
//         return -1;
//     }
//     let mid = start +Math.floor((end - start)/2);
//     if(data === arr[mid]){
//         return mid;
//     }else if(data < arr[mid]){
//         return binarySearch(data, arr, start, mid-1)
//     }else{
//         return binarySearch(data, arr, mid+1, end)
//     }
// }