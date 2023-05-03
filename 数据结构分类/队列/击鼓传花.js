import deque from "./deque";

/**
 *
 * @param chengxuyuans  往打工人里面传入的数组
 * @param num 锅传的次数(在打工人里面 循环)
 */
function shuaiguoyouxi(chengxuyuans,num){
    //新建一个双向队列 锅可以两个方向转
    const dagongren = new Deque();
    //被开除的
    const firedStaff = new Deque();
    for(let i=0;i<chengxuyuans.length;i++){
        dagongren.addBack(chengxuyuans[i]);
    }
    while(dagongren.size()>1){
        for(let i=0;i<num;i++){
            dagongren.addBack(dagongren.removeFront());
            // 人不动, 花动
            // 花不动, 人动
        }
        firedStaff.addBack(dagongren.removeFront()); //锅一直在第一个位置
        //每当玩过了一圈, 那么我们就阔以挑选出一个失败者
    }
    return {
        firedStaff,
        winner:dagongren.removeFront() //剩下的一个人 为胜利者
    }
}

let dagongren = ['万章', '哒哒哒', '努力生长', '阿仁'];
function randomInt(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}
shuaiguoyouxi(dagongren,randomInt(10,20));





//单向队列
function hotPotato(chengxuyuans, num) {
    const dagongren= new Queue();
    const firedStaff = [];

    for (let i = 0; i < chengxuyuans.length; i++) {
        queue.enqueue(chengxuyuans[i]);
    }
    while (queue.size() > 1) {
        //不管剩下几个人，每一轮锅传的次数都是不变的
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        firedStaff.push(queue.dequeue());//每次淘汰一个，就删除了
    }
    return {
        firedStaff,
        winner: queue.dequeue()//把最后剩下的一个返回
    };
}