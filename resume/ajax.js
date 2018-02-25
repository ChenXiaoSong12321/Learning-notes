/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */

function ajax(opt={}){
	opt.method = opt.method.toUppercase()
	opt.url = opt.url || ''
	opt.async =opt.async || true
	opt.data = opt.data || null
	opt.success = opt.success || function (){}
	let xmlHttp = XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
	
	let params = new Set()
	for(let [key,value] of opt.data.entries()){
		params.add(`${key}=${value}`)
	}
	let postData = [...params].join('&')
	if (opt.method === 'POST') {
		xmlHttp.open(opt.method,opt.url,opt.async)
		xmlHttp.setRequestHeader('content-Type','application/x-www-form-urlencoded;charset=utf-8')
		xmlHttp.send(postData)
	}else if(opt.method === 'GET'){
		xmlHttp.open(opt.method,opt.url+'?'+postData,opt.async)
		xmlHttp.send(null)
	}
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
			opt.success(xmlHttp.responseText)
		}
	}
}

// 使用
// ajax({
    // method: 'POST',
    // url: 'test.php',
    // data: {
        // name1: 'value1',
        // name2: 'value2'
    // },
    // success: function (response) {
        // console.log(response)；
    // }
// });