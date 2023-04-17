/**
 * 部门组织绿岛骑行团建活动。租用公共双人自行车，每辆自行车最多坐两人，做最大载重M。给出部 门每个人的体重，请问最多需要租用多少双人自行车.
 *
 * 输入描述:
 * 第一行两个数字m、n，分别代表自行车限重，部门总人数。
 * 第二行，n个数字，代表每个人的体重，体重都小于等于自行车限重m。
 * 0<m<=200
 * 0<n<=1000000
 *
 * 输出描述:
 * 最小需要的双人自行车数量。示例1 输入输出示例仅供调试，后台判题数据一般不包含示例
 *
 * 输入
 * 3 4
 * 3 2 2 1
 *
 * 输出
 * 3
 *
 *
 */
let readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let inputs = []
rl.on('line', function(line){
    // line表示的就是输入的一行
    inputs.push(line);
}).on("close",function(){
    let m = parseInt(inputs[0].split(" ")[0]);
    let n = parseInt(inputs[0].split(" ")[1]);
    let arr = inputs[1].split(" ").sort().map(item => Number(item))
    /**
     *  那么可以用两个指针，一个指向头部left，一个指向尾部right，
     *
     *  如果 w[left] + w[right] <= 车的载重，那么意味着这两个人还可以再加人，left ++ 继续判断直到总重量 >车的载重
     *
     *  如果w[left] + w[right] > 车的载重，那么意味着最重的人，加上最轻的人都会超载，只能他一个人骑，right -- 。
     *
     */
    let min_count = 0;
    console.log(arr)
    let i = 0,j = n-1;
    while(i < j){
        if(arr[i] + arr[j] <= m){
            i++  // i加的同时，也相当于j 减少，车辆数-1
        }
        j--;
        min_count++;// j遍历的移动后 单独需要一个
    }
    if(i === j){
        min_count++;
    }
    console.log(min_count)
})

