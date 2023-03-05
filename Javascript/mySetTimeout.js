function mySetTimeout(fn, t){
    const timer = setInterval(()=>{
        clearInterval(timer);
        fn();
    }, t);
}
function log (){
    console.log("run");
}
mySetTimeout(log,5000);