// let和const
// 块级作用域let，定义常量const
// let声明的变量只在自己所在的{}有效
// es6强制开启严格模式，===es5中use strict
// let不能重复声明
// const定义的变量不能修改(指针指向)
// const定义的变量必须赋值
function test(){
	// let a = 1
	// console.log(a) 
	// for (let i = 0; i < 3; i++) {
		// console.log(i)
	// }
	// console.log(i)
	let a = 1
	// let a = 2
}
test()
// console.log(a)

function last(){
	const PI = 3.14159265354
	const k = {
		a:1
	}
	console.log(PI)
	k.b = 4
	console.log(k)
	// PI = 3
}
last()
