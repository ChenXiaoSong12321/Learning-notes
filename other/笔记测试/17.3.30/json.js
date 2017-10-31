json

json：JavaScript Object Notation JavaScript对象表示法

与 XML 相同之处
JSON 是纯文本
JSON 具有"自我描述性"（人类可读）
JSON 具有层级结构（值中存在值）
JSON 可通过 JavaScript 进行解析
JSON 数据可使用 AJAX 进行传输

与 XML 不同之处
没有结束标签
更短
读写的速度更快
能够使用内建的 JavaScript eval() 方法进行解析
使用数组
不使用保留字

为什么使用 JSON？
对于 AJAX 应用程序来说，JSON 比 XML 更快更易使用：
使用 XML
读取 XML 文档
使用 XML DOM 来循环遍历文档
读取值并存储在变量中
使用 JSON
读取 JSON 字符串
用 eval() 处理 JSON 字符串

json.parse()

json通常用于与服务器交换数据
在接收服务器时一般是字符串。
我们可以使用json.parse()方法将数据转换为JavaScript对象。

var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');
document.getElementById("demo").innerHTML = obj.name + "：" + obj.site;

JSON.stringify()
JSON 通常用于与服务端交换数据。
在向服务器发送数据时一般是字符串。
我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。

JSON.stringify(value[, replacer[, space]])
value:
必需， 一个有效的 JSON 字符串。
replacer:
可选。用于转换结果的函数或数组。
如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。
如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。
space:
可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 有可以使用非数字，如：\t。

var obj = { "name":"runoob", "alexa":10000, "site":"www.runoob.com"};
var myJSON = JSON.stringify(obj);
document.getElementById("demo").innerHTML = myJSON;

也可以将 JavaScript 数组转换为 JSON 字符串
var arr = [ "Google", "Runoob", "Taobao", "Facebook" ];
var myJSON = JSON.stringify(arr);
document.getElementById("demo").innerHTML = myJSON;

