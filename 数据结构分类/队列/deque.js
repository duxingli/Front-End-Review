/*
    双向队列
    FIFO: 先进先出
        数据仓库里面, 在尾部增加新元素, 在顶部移除元素
        addBack -->  enqueue: 向队列尾部添加一个或是多个新的项  as push
        removeFront --> dequeue: 移除队列的第一项(就是最前面的那个), 并返回删除的元素  as shift
        peekFront --> peek: 返回队列的第一项, (当前情况下, 最早添加的, 也是会被最先删除的那个)
        isEmpty: 判断是否为空
        size: 队列的数据的个数
        clear:
        toString:
        迭代器:

        双向队列新增的：  从右到左的队列
        addFront:  从结果上看 只移动了 rear
        removeBack:
        peekBack: this.items[this.rear-1];
*/
export default class Deque{
    constructor() {
        this.front = 0;
        this.rear = 0;
        //从front 到 rear-1是数据  使得rear-front是数目！！！
        this.items = {};
    }
    isEmpty() {
        return this.size() === 0;
        // return !this.size();
    }
    //dequeue -->removeFront
    removeFront(){
        if(this.isEmpty()){
            return undefined;
        }
        const result = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return result;
    }
    //enqueue --> addBack
    // addBack(element){
    //     this.items[this.rear] = element;
    //     this.rear++;
    // }
    addBack(...eles){
        for(let i=0,len=eles.length;i<len;i++){
            this.items[this.rear++] = eles[i]
        }
    }
    peekFront(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.front];
    }
    //新增的 3个 !!!
    // addFront(element){
    //     if(this.isEmpty()){
    //         this.addBack(element);
    //     }else if(this.front > 0){
    //         //数据前面至少有一个空位 直接填值
    //         this.front--;
    //         this.items[this.front] = element;
    //     }else{
    //         //数据从0开始，前面没有空位，挪出空位
    //         //数据后移一位
    //         for(let i=this.rear;i>0;i--){
    //             this.items[i] = this.items[i-1];
    //         }
    //         this.rear++;
    //         //把数据移动的重复值 用新值覆盖
    //         this.items[0] = element;
    //     }
    // }
    addFront(...eles){
        //与deque2.js 一样
        //数据从0开始，前面没有空位，挪出空位
        //数据后移一位
        // 1 2 3 4
        // 7 8 9 1 2 3 4
        let len = eles.length;
        for(let i=this.size()-1+len;i>len-1;i--){
            this.items[i] = this.items[i-len]
        }
        for(let j=0;j<len;j++){
            this.items[j] = eles[j]; //eles[len-1-j]
        }
        this.rear+=len;
        // 优化，直接移动eles的长度
    }
    removeBack(){
        if(this.isEmpty()){
            return undefined;
        }
        //删除  this.items[this.rear-1];  返回值 rear--
        this.rear--;
        const result = this.items[this.rear];
        delete this.items[this.rear];
        return result;
    }
    peekBack(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.rear-1];
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