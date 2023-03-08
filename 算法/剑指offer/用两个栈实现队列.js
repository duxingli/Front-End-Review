const stack1 = [];
const stack2 = [];
function push(node){
    stack1.push(node);
}

function pop(){
    // 栈2为空才能补充栈1的数据，否则会打乱当前的顺序
    if(stack2.length === 0){
        // 入栈 1 2 3 4 5
        while(stack1.length > 0){
            stack2.push(stack1.pop());
            // 5,4,3 2 1 push  stack2
        }
    }
    return stack2.pop() || null; // stack2 pop 1 2 3 4 5
}
