// Symbol
// es6中新的数据类型
// Symbol概念
// Symbol语法

{
	// 声明
	let a1 = Symbol()
	let a2 = Symbol()
	console.log(a1===a2)
	let a3 = Symbol.for('a3')
	let a4 = Symbol.for('a3')
	console.log(a3===a4)	
}

{
	let a1 = Symbol.for('abc')
	let obj = {
		[a1]:'123',
		'abc':456,
		'c':678
	}
	// 不会造成属性冲突
	console.log(obj)
	// for in 与let of 拿不到属性
	for(let [key,value] of Object.entries(obj)){
		console.log('let of',key,value)
	}
	Object.getOwnPropertySymbols(obj).forEach(function(item,index){
		console.log(obj[item])
	})
	Reflect.ownKeys(obj).forEach(function(item,index){
		console.log('ownKeys',item,obj[item])
	})
}