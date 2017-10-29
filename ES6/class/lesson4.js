// 字符串扩展
// 字符串新增特性
// Unicode表示法、便利接口、模板字符串、新增方法（10种）

{
	console.log('a',`\u0061`)
	console.log('s',`\u20BB7`) // 当成两个字符

	console.log('s',`\u{20BB7}`)
} 

{
	let s = '𠮷' 
	console.log('length',s.length) //2
	console.log('0',s.charAt(0))
	console.log('1',s.charAt(1))
	console.log('at0',s.charCodeAt(0))
	console.log('at1',s.charCodeAt(1))

	let s1 = '𠮷a'
	console.log('length',s1.length)
	console.log('code0',s1.codePointAt(0))
	console.log('code0',s1.codePointAt(0).toString(16))
	console.log('code1',s1.codePointAt(1))
	console.log('code2',s1.codePointAt(2))
}

{
	console.log(String.fromCharCode('0x20bb7'))
	console.log(String.fromCodePoint('0x20bb7'))
}

{
	let str = '\u{20bb7}abc'
	for (let i = 0; i < str.length; i++) {
		console.log('es5' , str[i])
	}
	for (let code of str) {
		console.log('es6',code)
	}
}

{
	let str = 'string'
	console.log('includes',str.includes('s'))
	// console.log('includes',str.includes('h'))
	console.log('start',str.startsWith('str'))
	console.log('end',str.endsWith('ing'))
}

{
	let str = 'abc'
	console.log(str.repeat(5))
}

{
	let name = 'list'
	let info = 'hello world'
	let m = `i am ${name},${info}`
	console.log(m)
}

{
	//第一个参数，长度，不足则用第二个参数补上
	console.log('1'.padStart(2,'0'))
	console.log('1'.padEnd(2,'0'))
}

{
	let user = {
		name:'list',
		info : 'hello world'
	}
	abc`i am ${user.name},${user.info}`
	console.log(abc`i am ${user.name},${user.info}`)
	function abc(s,v1,v2){
		console.log(s,v1,v2)
		return s+v1+v2
	}
	// 1防止xss攻击
	// 2多语言
}

{
	console.log(String.raw`hi\n${1+2}`) //对\进行转义
	console.log(`hi\n${1+2}`)
}
