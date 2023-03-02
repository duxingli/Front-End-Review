// function replaceSpace(str){
//     return str.split(" ").join("%20");
// }

function replaceSpace(str){
    // \s： 匹配任意的空白符 等价于[\t\n\r\v\f ]，包含了空格和等价于空格得内容（空格 制表符 回车 换行 垂直换行 换页）
    return str.replace(/\s/g,"%20");
}

// 允许出现多个空格，多个空格用一个`20%`替换：
// str.replace(/\s+/g,"%20");
