/**
 * 描述
 * 输入整型数组和排序标识，对其元素按照升序或降序进行排序
 *
 * 输入描述：
 * 第一行输入数组元素个数
 * 第二行输入待排序的数组，每个数用空格隔开
 * 第三行输入一个整数0或1。0代表升序排序，1代表降序排序
 *
 * 输出描述：
 * 输出排好序的数字
 * @type {Interface}
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let n = await readline();
    let arr = (await readline()).split(" ");
    let flag = parseInt(await readline());

    arr.sort((a,b)=>{
        if(flag === 0){
            return a-b;
        }else{
            return b-a;
        }
    })
    arr.forEach(item =>{
        process.stdout.write(item+" ")
    })
}()


/**
 *  JS Node 输入模板
 * @type {Interface}
 */
const rl = require("readline").createInterface({
    input: process.stdin,
    output:process.stdout
});
let inputs = []
rl.on("line",function(line){
    inputs.push(line);

}).on("close",function(){
    let n = inputs[0][0];
    let arr = inputs[1].split(" ");
    let flag = parseInt(inputs[2][0]);
    arr.sort((a,b)=>{
        if(flag === 0){
            return a-b;
        }else if(flag === 1){
            return b-a;
        }
    })
    console.log(arr.join(" "))
})



