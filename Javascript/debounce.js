// 函数防抖是指在事件被触发至少 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这样一来，只有最后一次操作能被触发。 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
function debounce(fn,delay){
    //声明接收定时器的变量
    let timer = null;
    return function(...args){
        // ... 将args 变为数组可以使用apply
        // 清空定时器
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
        //因为箭头函数里的this指向上层作用域的this,所以这里可以直接用this，不需要声明其他的变量来接收
            fn.apply(this, args);
        }, delay)
    }
}
// 处理函数
function handle() {
    console.log(Math.random());
}
// 滚动事件
window.addEventListener('scroll', debounce(handle,2000));











