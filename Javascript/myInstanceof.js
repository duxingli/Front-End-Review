// function myInstanceof(l, r){
//    let left = l.__proto__;
//    let right = r.prototype;
//    while(true){
//        if(left === null) return false;
//        if(left === right) return true;
//        left = left.__proto__
//    }
// }

function myInstanceof(left, right){
    //getPrototypeOf 是标准方法
    let proto = Object.getPrototypeOf(left),
        prototype = right.prototype;
    while(true){
        if(proto === null) return false;
        if(proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
function Person() {}
function Person2() {}
const usr = new Person();
const usr2 = new Person2();
console.log(myInstanceof(usr, Person));
console.log(myInstanceof(usr, Person2));
console.log(myInstanceof(usr, Object));