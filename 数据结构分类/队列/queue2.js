/*
    单向队列2  队列方向不变
    FIFO: 先进先出
        数据仓库里面, 在尾部增加新元素, 在顶部移除元素
        enqueue: 向队列尾部添加一个或是多个新的项  as push
        isEmpty: 判断是否为空
        dequeue: 移除队列的第一项(就是最前面的那个), 并返回删除的元素  as shift
        peek: 返回队列的第一项, !!! lowestCount
        (当前情况下, 最早添加的, 也是会被最先删除的那个)
        isEmpty: 判断是否为空
        size: 队列的数据的个数 (rear -  front)
        clear:
        toString:
        forEach
        迭代器:
*/
export default class Queue2{
    //不同
    constructor() {
        this.count = 0; //count是数目
        this.items = {};
    }
    //只有入队是相同的
    // enqueue(element){
    //     this.items[this.count] = element;
    //     this.count++;
    // }
    enqueue(...eles){
        for(let i=0,len=eles.length;i<len;i++){
            this.items[this.count++] = eles[i]
        }
    }
    isEmpty() {
        return !this.count;
    }
    dequeue(){
        if(this.isEmpty()){
            return undefined;
        }
        const result = this.items[0];
        for(let i=0;i<this.count-1;i++){
            this.items[i] = this.items[i+1];
        } //数据左移删除队首 并返回
        delete this.items[this.count-1]; //删除最后一个重复值
        this.count--;
        return result;
    }
    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[0];
    }
    clear(){
        this.count = 0;
        this.items = {};
    }
    size(){
        return this.count;
    }
    toString(){
        if(this.isEmpty()){
            return "";
        }
        // let objString = '';
        // for(let i = 0; i < this.count; i++){
        //     objString = `${objString},${this.items[i]}`
        // }
        // return objString.slice(1);
        let objString = `${this.items[0]}`;
        for(let i=1; i<this.count;i++){
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }
    forEach(cb){
        for(let i=0;i<this.count;i++){
            cb(this.items[i],i,this);// 回调函数 元素 下标 和这个实例
        }
    }
    [Symbol.iterator](){
        let self = this;
        let index = 0;
        return{
            next(){
                if(index<self.count){
                    return{
                        value:self.items[index++],
                        done:false,
                    }
                }else{
                    return{
                        value:undefined,
                        done:true
                    }
                }
            }
        }
    }
}
let queue = new Queue2();

queue.enqueue("hello");
queue.enqueue("world");
queue.enqueue("hah", "nihao");