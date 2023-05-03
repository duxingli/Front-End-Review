/*
    上海自来水来自海上

    字母：不区分大小写

    必须传入字符串
*/
import deque from "./deque";
function palindromeChecker(testString){
    if(testString === undefined ||
    testString === null ||
        //不为null 长度为0的
    testString !== null && testString.length===0){
        return false;
    }
    //双向队列
    const deque = new Deque2(); //Deque2
    const lowerString = testString.toLocaleLowerCase().split("").join("")
    //split不能用空格分隔  因为空格也算一个字符
    //统一设置大小写，去除中间空格
    let isPalindrome = true;
    for(let i=0;i<lowerString.length;i++){
        deque.addBack(lowerString.charAt(i));
    }
    while(deque.size()>1 && isPalindrome){
        let firstChar = deque.removeFront();
        let lastChar = deque.removeBack();
        isPalindrome = firstChar === lastChar
    }
    return isPalindrome;

    // while (deque.size() > 1) {
    //     firstChar = deque.removeFront();
    //     lastChar = deque.removeBack();
    //     if (firstChar !== lastChar) {
    //         return false;
    //     }
    // }
    // return true;
}

function palindromeChecker2(testString){
    //利用转为数组，利用数组原生的双向队列特性
    const lowerString = testString.toLocaleLowerCase().split('');
    let isPalindrome = true;
    while(lowerString.length>1 && isPalindrome){
        isPalindrome = lowerString.shift() === lowerString.pop();
    }
    return isPalindrome;
}
//一行代码
function palindromeChecker3(testString){
    return testString === testString.toLocaleLowerCase().split("").reverse().join("");
}





