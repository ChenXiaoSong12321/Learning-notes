localStorage使用总结

1、localStorage的写入
var storage=window.localStorage;
//写入a字段
storage["a"]=1;
//写入b字段
storage.a=1;
//写入c字段
storage.setItem("c",3);

2、localStorage的读取
//第一种方法读取
var a=storage.a;
console.log(a);
//第二种方法读取
var b=storage["b"];
console.log(b);
//第三种方法读取
var c=storage.getItem("c");
console.log(c);

3、删除 全部删除clear(); 键值对删除removeItem("a");

4、localStorage的键获取
var storage=window.localStorage;
storage.a=1;
storage.setItem("c",3);
for(var i=0;i<storage.length;i++){
    var key=storage.key(i);
    console.log(key);
}

5、localStorage的转化
var storage=window.localStorage;
var data={
    name:'xiecanyong',
    sex:'man',
    hobby:'program'
};

var d=JSON.stringify(data);//对象转化成json字符串

storage.setItem("data",d);
//将JSON字符串转换成为JSON对象输出
var json=storage.getItem("data");

var jsonObj=JSON.parse(json);//json字符串转化成对象

console.log(typeof jsonObj);

数字

toExponential() 方法可把对象的值转换成指数计数法。
var num = new Number(10000);
console.log (num.toExponential(1))
1.0e+4
var num = new Number(10000);
console.log (num.toExponential(2))
1.00e+4

toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
var a = 12.432;
a = a.toFixed(2);
console.log(a)
12.43

toPrecision() 方法可在对象的值超出指定位数时将其转换为指数计数法。
var num = new Number(10000);
console.log(num.toPrecision(3))
1.00e+4
var num = new Number(10000);
console.log(num.toPrecision(4))
1.000e+4

toString() 方法可把一个逻辑值转换为字符串，并返回结果
var boo = new Boolean(true)
console.log(boo.toString())
true
var boo =100
console.log(boo.toString())
100

valueOf() 方法可返回 Boolean 对象的原始值。(与toString相反)
var boo = new Boolean(false)
console.log(boo.valueOf())
false
var boo = 100
console.log(boo.valueOf())
100

字符串

charAt() 方法可返回指定位置的字符。
var str="Hello world!"
document.write(str.charAt(1))
e

charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
方法 charCodeAt() 与 charAt() 方法执行的操作相似，只不过前者返回的是位于指定位置的字符的编码，而后者返回的是字符子串。
var str="Hello world!"
document.write(str.charCodeAt(1))
101

concat() 方法用于连接两个或多个数组。
该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
var a = [1,2,3];
document.write(a.concat(4,5));
1,2,3,4,5

fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
document.write(String.fromCharCode(72,69,76,76,79))
document.write("<br />")
document.write(String.fromCharCode(65,66,67))
HELLO
ABC

indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
var str="Hello world!"
document.write(str.indexOf("Hello") + "<br />")
document.write(str.indexOf("World") + "<br />")
document.write(str.indexOf("world"))
0
-1
6

lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
var str="Hello world!"
document.write(str.lastIndexOf("Hello") + "<br />")
document.write(str.lastIndexOf("World") + "<br />")
document.write(str.lastIndexOf("world"))
0
-1
6

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。
var str="Hello world!"
document.write(str.match("world") + "<br />")
document.write(str.match("World") + "<br />")
document.write(str.match("worlld") + "<br />")
document.write(str.match("world!"))
world
null
null
world!
var str="1 plus 2 equal 3"
document.write(str.match(/\d+/g))
1,2,3

replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
var str="Welcome to Microsoft! "
str=str + "We are proud to announce that Microsoft has "
str=str + "one of the largest Web Developers sites in the world."
document.write(str.replace(/Microsoft/g, "W3School"))
Welcome to W3School! We are proud to announce that W3School
has one of the largest Web Developers sites in the world.

name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
  return word.substring(0,1).toUpperCase()+word.substring(1);}
  );
"Aaa Bbb Ccc"

slice()方法可从已有的数组中返回选定的元素。
var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"
document.write(arr + "<br />")
document.write(arr.slice(2,4) + "<br />")
document.write(arr)
George,John,Thomas,James,Adrew,Martin
Thomas,James
George,John,Thomas,James,Adrew,Martin

toLowerCase() 方法用于把字符串转换为小写。

toUpperCase() 方法用于把字符串转换为大写。

