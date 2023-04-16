const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let obj = {
        "a": 2,
        "b": 2,
        "c": 2,
        "d": 3,
        "e": 3,
        "f": 3,
        "g": 4,
        "h": 4,
        "i": 4,
        "j": 5,
        "k": 5,
        "l": 5,
        "m": 6,
        "n": 6,
        "o": 6,
        "p": 7,
        "q": 7,
        "r": 7,
        "s": 7,
        "t": 8,
        "u": 8,
        "v": 8,
        "w": 9,
        "x": 9,
        "y": 9,
        "z": 9,
    }
    while (str = await readline()) {
        let res = "";
        for (let i = 0; i < str.length; i++) {
            let key = str[i];
            let code = str[i].charCodeAt()
            if (code >= 97 && code <= 122) {
                res += obj[key];
            }
            else if (code >= 65 && code <= 90) {
                let key2 = String.fromCharCode(code+1+32)
                if(key === "Z"){
                    res += "a"
                }else{
                    res += key2
                }
            }else if(parseInt(key) >=0 &&  parseInt(key)<=9){
                res += key
            }
        }
        console.log(res);
    }
}()
