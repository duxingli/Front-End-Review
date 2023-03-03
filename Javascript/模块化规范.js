/**
 * https://www.cnblogs.com/chenwenhao/p/12153332.html
 * https://juejin.cn/post/6947598732237996040#heading-0
 *
 * AMD和require.js
 *      AMD —— 是RequireJS在推广过程中对模块定义的规范化产出，它是一个概念，RequireJS是对这个概念的实现，就好比JavaScript语言是对ECMAScript规范的实现。
 *
 * CMD和sea.js
 *      CMD —— 是SeaJS在推广过程中对模块定义的规范化产出，是一个同步模块定义，是SeaJS的一个标准，SeaJS是CMD概念的一个实现，SeaJS是淘宝团队提供的一个模块开发的js框架。
 *
 * AMD和CMD区别
 *      （1）第一个方面是在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。
 *      （2）第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。
 *
 * CommonJS
 *      NodeJS是CommonJS规范的主要实践者, CommonJS用同步的方式加载模块。在服务端，模块文件都存放在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。它有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。实际使用时，用module.exports定义当前模块对外输出的接口（不推荐直接用exports），用require加载模块
 *      module.exports导出接口，实际是导出一个对象，可以解构
 *      require导入模块会执行并缓存，再次导入会读取缓存
 *
 *      exports和module.export区别：
 *          —— exports：对于本身来讲是一个变量（对象），它不是module的引用，它是{}的引用，它指向module.exports的{}模块。只能使用.语法向外暴露变量。
            —— module.exports：module是一个变量，指向一块内存，exports是module中的一个属性，存储在内存中，然后exports属性指向{}模块。既可以使用.语法，也可以使用=直接赋值。
 *
 * ES6 Module
 *      ES6 在语言标准的层面上，实现了模块功能ESModule，完全可以取代 AMD 和 CommonJS 规范，成为浏览器和服务器通用的模块解决方案
 *      export导出的接口与其对应的值是动态绑定关系，可以获取实时的值
 *      import是编译阶段执行，具有变量提升效果，导入的是模块接口
 *      import()是动态导入，返回的promise的结果是export导出的模块接口
 *
 *
 * ES6 模块与 CommonJS 模块的差异
 *      CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 *      CommonJS 模块是运行时加载，ES6 模块是编译时输出接口(静态加载)。
 *      CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
 *      CommonJS 模块的顶层this指向当前模块，ES6 模块之中，顶层的this指向undefined。
 * 循环加载时，CommonJS会返回已经执行的部分的值，是ES6 模块是动态引用，加载变量会保存一个模块的引用。
 *
 */

/*
总结：
AMD/CMD/CommonJs 是js模块化开发的规范，对应的实现是require.js/sea.js/Node.js

CommonJs 主要针对服务端，AMD/CMD/ES Module主要针对浏览器端，容易混淆的是AMD/CMD。（顺便提一下，针对服务器端和针对浏览器端有什么本质的区别呢？服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。这里如果有其他后端语言，如java。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。）

AMD/CMD区别，虽然都是并行加载js文件，但还是有所区别，AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而CMD是懒加载，虽然会一开始就并行加载js文件，但是不会执行，而是在需要的时候才执行。

AMD/CMD的优缺点.一个的优点就是另一个的缺点， 可以对照浏览。
AMD优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件。
AMD缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑。

CMD优点：因为只有在使用的时候才会解析执行js文件，因此，每个JS文件的执行顺序在代码中是有体现的，是可控的。

CMD缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。（PS：重新看这篇文章，发现这里写的不是很准确。确切来说，JS是单线程，所有JS文件执行时间叠加在AMD和CMD中是一样的。但是CMD是使用时执行，没法利用空闲时间，而AMD是文件加载好就执行，往往可以利用一些空闲时间。这么来看，CMD比AMD的优点还是很明显的，毕竟AMD加载好的时候也未必就是JS引擎的空闲时间！）

CommonJS 和 ES Module 区别：CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

如何使用？CommonJs 的话，因为 NodeJS 就是它的实现，所以使用 node 就行，也不用引入其他包。AMD则是通过<script>标签引入require.js，CMD则是引入sea.js
*/


// AMD
// define(['./a','./b'], function(a,b){
//     //  依赖必须一开始就写好
//     a.doSomething();
//     // 此处略去 100 行
//     b.doSomething()
// ...
// })

// CMD
// define(function(require, exports, module){
//     var a = require("./a");
//     a.doSomething();
//     var b = require("./b");
//     b.doSomething();
// })

// CommonJS
// a.js
// exports.hello = function(){
//     return "hello";
// }
// module.exports.text = "hello world";
// // b.js
// var a = require("./a.js"); // {hello: function.., text: 'Hello world'}


// ESModule
// // 导出a.js
// export const year = 1958;
// export function getYear(){}
//
// const name = '剑豪'
// function getNmae (){}
// export { name, getNmae }
//
// const obj = {name: '剑豪'}
// export default obj
// export default funcion foo(){}  // 视作导出匿名函数
//
// // 导入 b.js
// import { name, getName } from './a'
// import { name: newName, getName } from './a' // 报错，import导入不能这样重命名，只能使用 as
// import { name as newName, getName } from './a' // 正确
//
// import * as obj from './a'
// const { a, getName } = obj
//
// import a, {name, getName} from './a' // default和普通导出组合导入
