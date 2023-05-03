
let array = [3,2,5,8,4,7,6,9,0,1];


// 简单选择排序
// function selectSort(arr){
//     let n = arr.length;
//     for(let i=0; i<n-1; i++){
//         for(let j=i+1; j<n; j++){
//             if(arr[i] > arr[j]){
//                 [arr[i], arr[j]] = [arr[j], arr[i]]
//             }
//         }
//     }
// }


/**
 * 直接选择排序   找最值
 * 1、在未排序序列中找到最小(大)元素，存放到排序序列的起始位置。
 * 2、再从剩余未排序元素中继续寻找最小(大)元素，然后放到已排序序列的末尾。
 * 3、重复第二步，直到所有元素均排序完毕
 *
 */
function selectSort(arr){
    let n = arr.length;
    for(let i=0; i<n-1; i++){
        // 定义当前的最小值下标
        let minIndex = i;
        // 最小值下标的值和后面的值逐个比较，找出这里的最小值下标
        for(let j=i+1; j<n; j++){
            if(arr[minIndex] > arr[j]){
                minIndex = j;
            }
        }
        //if可以没有  j--->minIndex
        // 若后面能找到比最小值下标的值更小的值，那么交换两个元素，否则最小值下标的值就是当前的最小值，无需交换元素
        if(i !== minIndex){
            [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
        }
    }
}

console.time("选择排序的时间");
selectSort(array);
console.timeEnd("选择排序的时间");
//冒泡排序的时间: 0.591ms
console.log(array)