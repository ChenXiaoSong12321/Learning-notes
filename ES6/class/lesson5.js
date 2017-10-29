// 数值扩展

// 新增方法
// 方法调整

{
	// 不区分大小写 0b 0o
	console.log(0b111110111)
	console.log(0o767)
}

{
	// Number.isFinite()是否是数值
	console.log('15',Number.isFinite(15))
	console.log('NaN',Number.isFinite(NaN))
	console.log('1/0',Number.isFinite(1/0))
	// Number.isNaN()
	console.log( 'NaN',Number.isNaN(NaN) )
	console.log( '0', Number.isNaN(0) )
}

{
	// Number.isInteger()是否是整数
	console.log('25',Number.isInteger(25))
	console.log('25.0',Number.isInteger(25.0))
	console.log('25.1',Number.isInteger(25.1))
	console.log('25.1',Number.isInteger('25'))
}

{
	// 数值上下限
	console.log(Number.MAX_SAFE_INTEGER)
	console.log(Number.MIN_SAFE_INTEGER)
	console.log('10',Number.isSafeInteger(10))
	console.log('a',Number.isSafeInteger('a'))
}

{
	// Math.trunc()
	console.log(4.1,Math.trunc(4.1))  //4
	console.log(4.9,Math.trunc(4.9)) //4
}

{
	// 判断正负数
	console.log('-5',Math.sign(-5))	//-1
	console.log('0',Math.sign(0))	//0
	console.log('5',Math.sign(5))	//1
	console.log('50',Math.sign('50'))	//1
	console.log('faa',Math.sign('faa'))	//NaN
}

{
	// 立方根
	console.log('-1',Math.cbrt(-1))
	console.log('8',Math.cbrt(8))
}

{
	
}