// 解构赋值
// 分类：数组解构赋值、对象解构赋值、字符串解构赋值、
	// 布尔值解构赋值、函数参数解构赋值、数值解构赋值
// 
{
	let a,b,reset
	[a,b] = [1,2]
	console.log(a,b)
}

{
	let a,b,reset
	[a,b,...reset] = [1,2,3,4,5,6]
	console.log(a,b,reset)
}

{
	let a,b
	({a,b} = {a:1,b:2})
	console.log(a,b)
}
// 如果解构赋值没有成功配对会输出undefined
{
	let a,b,c,reset
	[a,b,c=3] = [1,2]
	console.log(a,b,c)
}

	// 适用于变量交换
{
	let a = 1,b = 2;
	// 前一句是赋值，没有分号，下一句以[],()开头会报错，
	[a,b] = [b,a]
	console.log(a,b)
}
	// 适用于函数返回值
{
	function f(){
		return [1,2]
	}
	let a,b;
	[a,b] = f()
	console.log(a,b)
}

{
	function f() {
		return [1,2,3,4,5]
	}
	let a,b;
	[a,,,b] = f()
	console.log(a,b)
}

{
	function f() {
		return [1,2,3,4,5]
	}
	let a,b;
	[a,,...b] = f()
	console.log(a,b)
}

{
	let o = {
		p:42,
		q:true
	}
	let {p,q} = o
	console.log(p,q)
}

{
	let {a=10,b=5} = {a : 3}
	console.log(a,b)
}

{
	let metaData = {
		title:'abc',
		test:[{
			title:'test',
			desc:'decription'
		}]
	}
	let {title:esTitle,test:[{title:cnTitle}]} = metaData
	console.log(esTitle,cnTitle)
}