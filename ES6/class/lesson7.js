// 函数扩展
// 新增特性
// 参数默认值 rest参数 扩展运算符 箭头函数 this绑定
// 尾调用

{
	function test(x,y = 'world'){
		console.log('默认',x,y)
	}
	test('hello')
	test('hello','haha')
}

{
	let x = 'test'
	function test2(x,y=x){
		console.log('作用域',x,y)
	}
	test2('kill')
	function test3(c,y=x){
		console.log('作用域',c,y)
	}
	test3('kill')
	// test2()
}

{
	function test(...arg){
		for(let v of arg){
			console.log('rest',v)
		}
	}
	test('1',2,3,4,'a ')
}

{
	console.log(...[1,2,4])
	console.log('a',...[1,2,4])
}

{
	// 箭头函数的this指向是在定义的时候而不是调用的时候
	let arrow = v => v+2 //函数名，函数参数，函数返回值
	let arrow2 = () => 2 //函数名，函数参数，函数返回值
	console.log(arrow(3))
	console.log(arrow2())
}

// 提升性能
{
	function tail(x){
		console.log('tail',x)
	}
	function fx(x){
		return tail(x)
	}
	fx(123)
}
