// （1）使用数组 sort 方法对数组元素随机排序，让 Math.random() 出来的数与 0.5 比较，如果大于就返回 1 交换位置，如果小于就返回 -1，不交换位置。

// function randomSort(){
//     return Math.random()>0.5?-1:1;
// }
//  缺点：每个元素被派到新数组的位置不是随机的，原因是 sort() 方法是依次比较的。


// （2）随机从原数组抽取一个元素，加入到新数组
// function randomSort(arr){
//     var result = [];
//     while(arr.length > 0){
//         var randomIndex = Math.floor(Math.random()*arr.length);
//         //randomIndex  0 ~ length-1
//         result.push(arr[randomIndex]);
//         // push完 删除原数组对应的值
//         arr.splice(randomIndex, 1);
//     }
//     return result;
// }


// （3）随机交换数组内的元素（洗牌算法类似） 通过交换原地乱序

// function randomSort(arr){
//     var index,
//         randomIndex,
//         temp,
//         len = arr.length;
//     for(index = 0; index<len; index++){
//         // 获取 index ~ length-1 的下标
//         randomIndex = Math.floor(Math.random() * (len - index)) + index;
//         temp = arr[index];
//         arr[index] = arr[randomIndex];
//         arr[randomIndex] = temp;
//     }
//     return arr;
// }

// es6

function randomSort(arr){
    let length = arr.length;
    if(!Array.isArray(arr) || length<=1) return;
    for(let index = 0;index <length-1;index++){
        let randomIndex = Math.floor(Math.random() * (length-index)) + index;
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
    return arr;
}
