// 数组扩展
// 数组新增特性
// Array.from Array.of copyWithin find\findIndex 
// fill entries\keys\values includes

{
	let arr = Array.of(3,4,7,9,11)
	console.log('arr',arr)

	let empty = Array.of()
	console.log('empty',empty)
}

{
	let arr = document.querySelectorAll('p')
	let pArr = Array.from(arr)
	pArr.forEach(function(item){
		console.log(item.textContent)
	})
	// 类似map
	console.log(Array.from([1,3,5],function(item){
		return item*2
	}))
}

{
	// fill()
	console.log('fill-7',[1,'a',undefined].fill(7))
	console.log('fill,pos',['a','b','c','d','e'].fill(7,1,3)) //从第一个到第三个位置截止
	//fill,pos ["a", 7, 7, "d", "e"]
}

{
	for(let index of ['1','c','ks'].keys()){
		console.log('keys',index)
	}
	for(let value of ['1','c','ks'].values()){
		console.log('value',value)
	}
	for(let [index,value] of ['1','c','ks'].entries()){
		console.log('key,value',index,value)
	}
}

{
	console.log([1,2,3,4,5].copyWithin(0,2,4)) //[4, 2, 3, 4, 5]
}

{
	// 只知道第一个符合条件的
	console.log([1,2,3,4,5,6].find(function(item){
		return item>3
	}))
	console.log([1,2,3,4,5,6].findIndex(function(item){
		return item>3
	}))
}

{
	console.log('number',[1,2,NaN].includes(1))
	console.log('number',[1,2,NaN].includes(NaN))
}

