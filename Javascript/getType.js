function getType(value){
    // 判断数据是 null 的情况
    if(value === null){
        return value+ "";
    }
    // 判断数据是引用类型的情况
    if(typeof value === "object"){
        // '[object Object]' 或者 '[object Array]'等
        let valueClass = Object.prototype.toString.call(value),
            type = valueClass.split(" ")[1].split("");
            // 第二个split 转数组后删除最后一个]，再join("")转字符串转小写
        type.pop();
        return type.join("").toLowerCase();
    }else{
        // 判断数据是基本数据类型的情况和函数的情况
        return typeof value;
    }
}


