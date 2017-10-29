// 数据结构
// Set WeakSet Map WeakMap

{
	let list = new Set()
	list.add(5)
	list.add(7)

	console.log('size',list.size) //2
}

{
	let arr = [1,2,3,4,5]
	let list = new Set(arr)

	console.log('size',list.size) //5
}

{
	let list = new Set()
	list.add(1)
	list.add(2)
	list.add(1)

	console.log('list',list)  //Set(2) {1, 2}

	let arr = [1,2,3,4,5,'2',3,4]
	let list2 = new Set(arr)

	console.log('unique',list2) //包括判断数据类型
}

{
	let arr = ['add','delete','clear','has']
	let list = new Set(arr)

	console.log('has',list.has('add'))
	console.log('del',list.delete('add'),list)
	list.clear()
	console.log('list',list)

}

{
	let arr = ['add','delete','clear','has']
	let list = new Set(arr)

	for(let key of list.keys()){
		console.log('keys',key)
	}
	for(let value of list.values()){
		console.log('values',value)
	}
	for(let value of list){
		console.log('values',value)
	}
	for(let [key,value] of list.entries()){
		console.log('entries',key,value)
	}

	list.forEach(function (item) {
		console.log(item)
	})
}

{
	// WeakSet只支持对象，弱引用，地址引用，没有size
	let weakList = new WeakSet()

	let arg = {}
	weakList.add(arg)
	console.log('weakList',weakList)
/*
	weakList.add(2)
	console.log('weakList',weakList)*/
}

{
	let map = new Map()
	let arr = ['123']

	map.set(arr,456)

	console.log('map',map,map.get(arr))
}

{
	let map = new Map([['a','123'],['b','456']])

	console.log('map',map)

	console.log('size',map.size)
	console.log('delete',map.delete('a'),map)
	console.log('clear',map.clear(),map)
}

{
	// 区别类似Set与WeakSet
	let weakmap = new WeakMap();

	let o = {}
	weakmap.set(o,123)
	console.log(weakmap.get(o))
}

// Map与Array对比


{
	// 数据结构横向对比：增删改查
	let map = new Map()
	let arr = []

	//增
	map.set('t',1)
	arr.push({t:1})

	console.info('map-arr',map,arr)

	// 查
	let map_exist = map.has('t')

	let arr_exist = arr.find(item=>item.t)
	console.info(map_exist,arr_exist)

	//改
	map.set('t',2)
	arr.forEach(item=>item.t?item.t=2:'')

	console.info(map,arr)

	//删
	map.delete('t')
	let index = arr.findIndex(item=>item.t)
	arr.splice(index,1)

	console.info(map,arr)
}

// Set与Array对比
{
	let set = new Set()
	let arr = []

	//增
	set.add({t:1})
	arr.push({t:1})

	console.info(set,arr)

	//查
	let set_exist = set.has({t:1}) //false，除非{t:1}地址存在
	let arr_exist = arr.find(item=>item.t)
	console.info(set_exist,arr_exist)

	// 改
	set.forEach(item=>item.t?item.t=2:'')
	arr.forEach(item=>item.t?item.t=2:'')
	console.info(set,arr)

	// 删
	set.forEach(item=>item.t?set.delete(item):'')
	let index = arr.findIndex(item=>item.t)
	arr.splice(index,1)

	console.info(set,arr)
}

// Map与Object对比
// Set与Object对比

{
	let item = {t:1}
	let map = new Map()
	let set = new Set()
	let obj = new Object()

	// 增
	map.set('t',1)
	set.add(item)
	obj['t'] = 1
	console.info(map,set,obj)

	// 查
	console.info({
		map:map.has('t'),
		set:set.has(item),
		obj:'t' in obj
	})

	//改
	map.set('t',2)
	item.t = 2
	obj['t'] =2
	console.log(map,set,obj)

	// 删
	map.delete('t')
	set.delete(item)
	delete obj['t']
	console.info(map,set,obj)
}
// 
// 总结：能使用map，如果对数据要求比较高，要保证每个数据的唯一性，使用set
		// 尽可能不使用arr和obj