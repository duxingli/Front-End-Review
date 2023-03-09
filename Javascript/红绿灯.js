//模拟异步请求资源
/**
 * 我们可以通过while循环让红绿灯不间断循环，
 * 接着我们使用for await语法可以让红绿灯异步切换成同步的改变
 * @param target
 */
function loadSource(target){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(target.color);
        },target.delay)
    })
}
// 核心的红绿灯逻辑
async function lightTransform(lights){
    while(true){
        for(let i=0; i<lights.length; i++){
            let res = await loadSource(lights[i])
            console.log(res);
        }
    }
}



lightTransform([
    {color:"red",delay:1000},
    {color:"green",delay:2000},
    {color:"yellow",delay:3000}
])
