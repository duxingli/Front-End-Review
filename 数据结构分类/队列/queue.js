/*
    单向队列 从左到右
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
        迭代器:
*/
export default class Queue{
    constructor() {
        this.front = 0;
        this.rear = 0;
        this.items = {};
    }
    // enqueue(element){
    //     this.items[this.rear] = element;
    //     this.rear++;
    // }
    enqueue(...eles){
        for(let i=0,len=eles.length;i<len;i++){
            this.items[this.rear++] = eles[i]
        }
    }
    isEmpty() {
        // return this.size() === 0;
        // return !this.size();
    }
    dequeue(){
        if(this.isEmpty()){
            return undefined;
        }
        const result = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return result;
    }
    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.front];
    }
    clear(){
        this.items = {};
        this.rear = 0;
        this.front = 0;
    }
    size(){
        return this.rear - this.front;
    }
    forEach(cb){
        for(let i=this.front;i<this.rear;i++){
            cb(this.items[i],i,this);
        }
    }
    [Symbol.iterator](){
        let self = this;
        let index = this.front;
        return{
            next(){
                if(index < self.rear){
                    return{
                        value:self.items[index++],
                        done:false
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
    toString(){
        if(this.isEmpty()){
            return "";
        }
        let objString = `${this.items[this.front]}`;
        for(let i=this.front+1; i<this.rear;i++){
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }
}
let queue = new Queue();

queue.enqueue("hello");
queue.enqueue("world");
queue.enqueue("hah", "nihao");