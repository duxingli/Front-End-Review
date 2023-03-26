class People{
    constructor(name) {
        this.name = name;
    }
    eat(){
        console.log(`${this.name} eat something`)
    }
}

class Student extends People{
    constructor(name, number) {
        super(name);
        this.number = number;
    }
    sayHi(){
        console.log(`姓名${this.name} 学号${this.number}`);
    }
}

class Teacher extends People{
    constructor(name,major) {
        super(name);
        this.major = major;
    }
    teach(){
        console.log(`${this.name}教授${this.major}`)
    }
}


let xialuo = new Student();
// class实际是函数 语法糖
console.log(typeof People) // function
console.log(typeof Student) // function
console.log(xialuo.__proto__)
console.log(Student.prototype)
console.log(xialuo.__proto__ === Student.prototype)


console.log(xialuo instanceof Student) // true
console.log(xialuo instanceof People )// true
console.log(xialuo instanceof Object) // true
console.log([] instanceof  Array) // true
console.log([] instanceof Object) // true
console.log({} instanceof Object) // true

// 基于原型的执行规则
// 1.获取属性 xialuo.name 或执行方法 xialuo.sayhi()时
// 2.先在自身属性和方法寻找
// 2.如果找不到则自动去_proto_中查找

// __proto__ 是隐式原型  prototype是显式原型

// Student.protptype 也有__proto__ 指向继承的原型