// 对象扩展
// 新增特性
// 简洁表示法 属性表达式 扩展运算符 Object新增方法

{
	// 简洁表示法
	let o = 1,k = 2
	let es5 = {
		o:o,
		k:k
	}
	let es6 = {
		o,
		k
	}
	console.log(es5,es6)

	let es5_method = {
		hello:function () {
			console.log('hello')
		}
	}
	let es6_method = {
		hello() {
			console.log('hello')
		}
	}
	console.log(es5_method,es6_method)
}

{
	// 属性表达式
	let a = 'b'
	let es5_obj = {
		a:'c'
	}
	let es6_obj = {
		[a]:'c'
	}
	console.log(es5_obj,es6_obj)
}

{
	// 新增API
	// is
	console.log('str',Object.is('abc','abc'),'abc'==='abc')
	console.log('arr',Object.is([],[]),[]===[]) //arr false false 存储地址不同

	console.log('copy',Object.assign({a:'a'},{b:'b'})) //浅复制，不会拷贝继承的属性

	let test = {k:123,o:456}
	for(let [key,value] of Object.entries(test)){
		console.log([key,value])
	}
}

{
	// 扩展运算符
	// let {a,b,c,...d} = {a:'test',b:'kill',c:'ddd',d:'ccc'}
}

{
	
}
