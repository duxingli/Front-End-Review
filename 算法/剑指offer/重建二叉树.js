// function TreeNode(x) {
//     this.val = x;
//     this.left = null;
//     this.right = null;
// }
function reConstructBinaryTree(pre, vin)
{
    if(pre.length === 0){
        return null;
    }
    if(pre.length === 1){
        return new TreeNode(pre[0]);
    }
    const value = pre[0];
    const index = vin.indexOf(value);
    const vinLeft = vin.slice(0,index);
    const vinRight = vin.slice(index+1);
    // 先序第一个就是根节点  长度是index
    const preLeft = pre.slice(1,index+1);
    const preRight = pre.slice(index+1);
    const node = new TreeNode(value);
    node.left = reConstructBinaryTree(preLeft,vinLeft);
    node.right = reConstructBinaryTree(preRight,vinRight);
    return node;
}


/**
 *
 * 给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
 *
 * 输入
 * ABC
 * BAC
 * FDXEAG
 * XDEFAG
 *
 * 输出
 * BCA
 * XEDGAF
 */

// function getHRD(pre, vin){
//     // pre, vin 都是字符串
//     if(!pre){
//         return "";
//     }
//     if(pre.length === 1){
//         return pre;
//     }
//     const head = pre[0];
//     const splitIndex = vin.indexOf(head);
//     const vinLeft = vin.substring(0,splitIndex);
//     const vinRight = vin.substring(splitIndex+1);
//     const preLeft = pre.substring(1,splitIndex + 1);
//     const preRight = pre.substring(splitIndex + 1);
//     return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight)+head;
// }


