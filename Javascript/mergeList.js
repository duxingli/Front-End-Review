// merge({1: 12}, {a: 1234}, {b: 333, a: "覆盖前面的"})
/**
 *  合并一层对象
     {
        1: 12,
        a: "覆盖前面的",
        b: 333
    }
 */


function merge(target){
    for(let i=1,j=arguments.length; i<j; i++){
     //从第二个数开始合并
        let source = arguments[i] || {};
        for(let prop in source){
            if(source.hasOwnProperty(prop)){
                if(source[prop] !== undefined){
                    target[prop] = source[prop];
                }
            }
        }
    }
    return target;
}

merge({1: 12}, {a: 1234}, {b: 333, a: "覆盖前面的"})
// arr3 = [...arr1,...arr2]

