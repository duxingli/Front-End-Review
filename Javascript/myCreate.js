// Object.create() 示例
// const person = {
//     isHuman: false,
//     printIntroduction: function() {
//         console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
//     }
// };
// const me = Object.create(person);
// me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
// me.isHuman = true; // Inherited properties can be overwritten
// me.printIntroduction();
// Expected output: "My name is Matthew. Am I human? true"



// 手写Object.create  思路：将传入的对象作为原型
function myCreate(obj){
    function F(){};
    F.prototype = obj;
    return new F();
}

