// (1) 首先，从数组中选择一个值作为主元（pivot），也就是数组中间的那个值。
// (2) 创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值。移
//  动左指针直到我们找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后
//  交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元
//  之前，而比主元大的值都排在主元之后。这一步叫作划分（partition）操作。
// (3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的
//  子数组）重复之前的两个步骤，直至数组已完全排序。

let array = [3,2,5,8,4,7,6,9,0,1];
// 最简单的一种是选择数组的第一个值（最左边的值）。然而，研究表明对于几乎已排序的数组，这不是一个好的选择，它将导致该算法的最差表现。另外一种方式是随机选择数组的一个值或是选择中间的值。

// function quickSort(arr){
//     if(arr.length === 0){
//         return [];
//     }
//     let less = [];
//     let greater = [];
//     let pivot = arr[0];
//     for(let i=1; i<arr.length; i++){
//         if(arr[i] < pivot){
//             less.push(arr[i]);
//         }else{
//             greater.push(arr[i])
//         }
//     }
//     return quickSort(less).concat(pivot, quickSort(greater));
// }

// var sortArray = function(arr) {
//     shuffle(arr)
//     quickSort(arr, 0, arr.length - 1);
//     return arr;
// };
// function quickSort(arr, left, right) {
//     if (left >= right) {
//         return;
//     }
//     const mid = partition(arr, left, right);
//     quickSort(arr, left, mid - 1);
//     quickSort(arr, mid + 1, right);
// }
// function partition(arr, left, right) {
//     const pivot = arr[left];
//     let i = left + 1;
//     let j = right;
//     while (i < j) {
//         while (i < j && arr[i] <= pivot) {
//             i++;
//         }
//         while (i < j && arr[j] >= pivot) {
//             j--;
//         }
//         if (i < j) {
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//             i++;
//             j--;
//         }
//     }
//     if (i === j && arr[j] > pivot) {
//         j--;
//     }
//     if (j !== left) {
//         [arr[left], arr[j]] = [arr[j], arr[left]];
//     }
//     return j;
// }




function sortArray(arr) {
    // 为了避免出现耗时的极端情况，先随机打乱
    shuffle(arr);
    // 排序整个数组（原地修改）
    sort(arr, 0, arr.length - 1);
    return arr;
}
function sort(arr,  left,  right) {
    if (left >= right) {
        return;
    }
    // 对 arr[left..right] 进行切分
    // 使得 arr[left..mid-1] <= arr[mid] < arr[mid+1..right]
    let mid = partition(arr, left, right);

    sort(arr, left, mid - 1);
    sort(arr, mid + 1, right);
}
// 对 arr[left..right] 进行切分
function partition(arr, left, right) {
    let pivot = arr[left];
    // 关于区间的边界控制需格外小心，稍有不慎就会出错
    // 我这里把 i, j 定义为开区间，同时定义：
    // [left, i) <= pivot；(j, right] > pivot
    // 之后都要正确维护这个边界区间的定义
    let i = left + 1, j = right;
    // 当 i > j 时结束循环，以保证区间 [left, right] 都被覆盖
    while (i <= j) {
        while (i < right && arr[i] <= pivot) {
            i++;
            // 此 while 结束时恰好 arr[i] > pivot
        }
        while (j > left && arr[j] > pivot) {
            j--;
            // 此 while 结束时恰好 arr[j] <= pivot
        }
        if (i >= j) {
            break;
        }
        // 此时 [left, i) <= pivot && (j, right] > pivot
        // 交换 arr[j] 和 arr[i]
        [arr[i], arr[j]] = [arr[j], arr[i]]
        // 此时 [left, i] <= pivot && [j, right] > pivot
    }
    // 最后将 pivot 放到合适的位置，即 pivot 左边元素较小，右边元素较大
    [arr[left], arr[j]] = [arr[j], arr[left]]
    return j;
}

function shuffle(arr){
    let length = arr.length;
    if(!Array.isArray(arr) || length<=1) return;
    for(let index = 0;index <length-1;index++){
        let randomIndex = Math.floor(Math.random() * (length-index)) + index;
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
    return arr;
}