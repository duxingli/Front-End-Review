//提取出url 里的参数并转成对象
function getUrlParams(url){
    let obj = {};
    let str = url.split("?")[1].split("&");
    for(let i=0;i<str.length; i++){
        let key = str[i].split("=")[0];
        let value = str[i].split("=")[1];
        obj[key] = value;
    }
    return obj;
}
const url = "http://131.41.230.135:81/baseUser/pageQuery?page=1&pageSize=5"
getUrlParams(url)


/**实现一个方法，完成拼接 URL和对应URL所需参数
 * https://www.zhihu.com/question/21861899
 * encodeURI和encodeURIComponent
 *
 * encodeURIComponent会把 http:// 编码成 http%3A%2F%2F 而encodeURI却不会。
 *      如果你需要编码整个URL，然后需要使用这个URL，那么用encodeURI。
 *      当你需要编码URL中的参数的时候，那么encodeURIComponent是最好方法
 * */

function getParam(url, params) {
    var arr = [];
    if(typeof params === 'object'){
        for(var param in params){
            arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
        }
        arr = arr.join('&');    //将拼接成功的字符串数组继续赋给arr数组
    }
    console.log(`${url}?${arr}`);
    return `${url}?${arr}`;
}
getParam('https://youngzhang08.github.io', {date: '2018-08-12', article: 'myMVVM'});
'https://youngzhang08.github.io?date=2018-08-12&article=myMVVM'

