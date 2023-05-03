// has(element)：如果元素在集合中，返回 true，否则返回 false。
// add(element)：向集合添加一个新元素。
// delete(element)：从集合移除一个元素。
// clear()：移除集合中的所有元素。
// size()：返回集合所包含元素的数量。它与数组的 length 属性类似。
// values()：返回一个包含集合中所有值（元素）的数组。
// isEmpty()：判断是否为空

// 集合运算
// union并集
// intersection 交集
// difference 差集
// isSubsetOf 子集  返回布尔值
class Set{
    constructor() {
        this.items = {};
    }
    has(element){
        // 对象里是否有某个属性名(字符串)，键和名是相同的 Object.prototype.hasOwnProperty
        return Object.prototype.hasOwnProperty.call(this.items,element);
    }
    add(element){
        //有的话，就不能添加，返回false
        if(!this.has(element)){
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear(){
        this.items = {};
    }
    size(){
        return Object.keys(this.items).length;
        //第二种方式是使用一个 length 变量，每当使用 add 或 delete 方法时就控制它，就像在之
        // 前的章节中使用 LinkedList、Stack 和 Queue 类一样。

        //第三种方式是 在任何浏览器中都能执行 手动提取 items 对象的每一个属性，记录属性的个数并返回这个数
        // let count = 0;
        // for(let key in this.items) {
        //     if(this.items.hasOwnProperty(key)) {  //还是看是否有属性
        //         count++;
        //     }
        //     return count;
        // }
    }
    values(){
        //返回的是数组
        return Object.values(this.items);
        // let values = [];
        // for(let key in this.items) { // {1}
        //     if(this.items.hasOwnProperty(key)) {
        //         values.push(key); // {2}
        //     }
        // }
        // return values;
    }
    isEmpty(){
        return this.size() === 0;
    }
    toString(){
        if(this.isEmpty()){
            return ""
        }
        const values = this.values();//数组
        let objString = `${values[0]}`;
        for(let i=1;i<values.length;i++){
            objString = `${objString},${values[i].toString()}`; //toString() 没什么必要
        }
        return objString;
    }
    union(otherSet){
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    intersection(otherSet){
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallSet = otherValues;
        //单分支结构！！！
        if(otherValues.length - values.length>0){
            biggerSet = otherValues;
            smallSet = values;
        }
        smallSet.forEach(value =>{
            if(biggerSet.includes(value)){
                intersectionSet.add(value);
            }
        })
        //交集 最多把 小的集合全部 add
        return intersectionSet;
    }
    difference(otherSet){
        //this有，other没有
        const differenceSet = new Set();
        this.values().forEach(value =>{
            // if (!otherSet.has(value))
            if(!otherSet.values().includes(value)){
                differenceSet.add(value);
            }
        })
        return differenceSet;
    }
    isSubsetOf(otherSet){
        if(this.size() > otherSet.size()){
            return false;
        }
        let isSubset = true;
        this.values().every(value=>{
            if(!otherSet.has(value)){
                isSubset = false;
                return false;
            }
            return true;
        })
        // for(let i = 0 ; i<values.length;i++){
        //     if(!otherSet.has(values[i])){
        //         isSubset = false;
        //         break;
        //     }
        // }
        return isSubset;
    }
}
