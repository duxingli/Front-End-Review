/**
 *
 * @param anyMethod
 */
function perform(anyMethod, wrappers){
    return function(){
        wrappers.forEach(wrapper => wrapper.initialize() )
        anyMethod()
        wrappers.forEach(wrapper => wrapper.close() )
    }
}
let newFn = perform(function(){
    console.log("say");
},[{
    // wrapper1
    initialize(){
        console.log("beforeSay")
    },
    close(){
        console.log("close");
    }
},{
    // wrapper2
    initialize(){
        console.log("beforeSay")
    },
    close(){
        console.log("close");
    }
}])
newFn();
// beforeSay
// beforeSay
// say
// close
// close