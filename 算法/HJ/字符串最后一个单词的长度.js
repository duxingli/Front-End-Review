const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        let arr = line.split(' ');
        console.log(arr[arr.length-1].length)
    }
}()



const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.on('line',(line)=>{
    const arr = line.split(' ');
    console.log(arr[arr.length-1].length)
})
