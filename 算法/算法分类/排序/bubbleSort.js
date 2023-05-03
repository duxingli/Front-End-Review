let array = [3,2,5,8,4,7,6,9,0,1];

function bubbleSort(arr){
    let n = arr.length;
    for(let i=0; i<n-1; i++){
        for(let j=0; j<n-i-1; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
}

console.time("冒泡排序的时间");
bubbleSort(array);
console.timeEnd("冒泡排序的时间");
//冒泡排序的时间: 0.591ms
console.log(array)