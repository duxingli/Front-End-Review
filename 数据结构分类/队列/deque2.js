/*
    双向队列  其实很好用数组模拟
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
export default class Deque2{
    //不同
    constructor() {
        this.count = 0; //count是数目
        this.items = {};
    }
    //只有入队是相同的
    // addBack(element){
    //     this.items[this.count] = element;
    //     this.count++;
    // }
    addBack(...eles){
        for(let i=0,len=eles.length;i<len;i++){
            this.items[this.count++] = eles[i]
        }
    }
    isEmpty() {
        return !this.count;
    }
    removeFront(){
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
    peekFront(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[0];
    }
    //新增的三个
    // addFront(element){
    //     for(let i=this.count;i>0;i--){
    //         this.items[i] = this.items[i-1];
    //     }
    //     this.items[0] = element;
    //     this.count++;
    // }
    addFront(...eles){
        //按顺序来说 不是unshift
        // for(let e=0,len=eles.length;e<len;e++){
        //     for(let i=this.count;i>0;i--){
        //         this.items[i] = this.items[i-1];
        //     }
        //     this.items[0] = eles[e];//e  //一个是eles[0]
        //     this.count++;
        // }

        //优化 两个for循环
        // 1 2 3 4
        // 9 8 7 1 2 3 4
        // let len = eles.length;
        // for(let i=this.count-1+len;i>len-1;i--){
        //     this.items[i] = this.items[i-len]
        //     //给 eles挪出 len的空位 从len开始赋新值
        // }
        // for(let j=0;j<len;j++){
        //     this.items[j] = eles[len-j-1];
        // }
        // this.count+=len;

        //unshift
        // for(let len=eles.length,e=len-1;e>=0;e--){
        //     for(let i=this.count;i>0;i--){
        //         this.items[i] = this.items[i-1];
        //     }
        //     this.items[0] = eles[e];//e  //一个是eles[0]
        //     this.count++;
        // }

        //优化 两个for循环
        let len = eles.length;
        for(let i=this.count-1+len;i>len-1;i--){
            this.items[i] = this.items[i-len] //给 eles挪出 len的空位 从len开始赋新值
        }
        for(let j=0;j<len;j++){
            this.items[j] = eles[j];
        }
        this.count+=len;
    }
    removeBack(){
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peekBack(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count-1]
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
