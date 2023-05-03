let array = [3,2,5,8,4,7,6,9,0,1];
// i:outer   j:inner  第一个默认不用排序就在里面
function insertSort(arr){
    let temp;
    for(let i=1;i<arr.length; i++){
        temp = arr[i];
        let j = i;
        while(j>0 && arr[j-1] >= temp){
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = temp;
    }
}
console.log(insertSort(array),array)