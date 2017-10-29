// Proxy和Reflect

{
	let obj = {
		time:'2017-10-19',
		name:'net',
		_r:123
	}
	// 映射obj,对读写进行干涉
	let monitor = new Proxy(obj,{
		// 拦截对象属性的读取
		get(target,key){
			return target[key].replace('2017','2018')
		},
		// 拦截对象设置属性
		set(target,key,val){
			if (key === 'name') {
				return target[key] =val
			}else{
				return target[key]
			}
		}, //只允许修改name
		//拦截key in obj操作
		has(target,key){
			if (key === 'name') {
				return target[key]
			}else{
				return false
			}
		},
		// 拦截删除
		deleteProperty(target,key){
			if (key.indexOf('_')>-1) {
				delete target[key]
				return true
			}else{
				return target[key]
			}
		},
		// 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNmaes
		ownKeys(target){
			return Object.keys(target).filter(item=>item!='time')
		}
	})

	console.log(monitor.time)  //2018-10-19
	monitor.time = '2018'
	console.log(monitor.time)  //2018-10-19
	monitor.name = 'www'
	console.log(monitor.name)  //www

	console.log('has','name' in monitor,'time' in monitor)

	// delete monitor.time;
	// console.log('delete',monitor)

	// delete monitor._r;
	// console.log('delete',monitor)

	console.log('ownKeys',Object.keys(monitor))
}

{
	let obj = {
		time:'2017-10-19',
		name:'net',
		_r:123
	}

	console.log('Reflect',Reflect.get(obj,'time'))
	Reflect.set(obj,'name','hhh')
	console.log('set',obj)
	console.log('has',Reflect.has(obj,'name'))
}

{
	function validator(target,validator){
		return new Proxy(target,{
			_validator:validator,
			set(target,key,value,proxy){
				if (target.hasOwnProperty(key)) {
					let va = this._validator[key]
					if (!!va(value)) {
						return Reflect.set(target,key,value,proxy)
					}else{
						throw Error (`不能设置${key}为${value}`)
					}
				}else{
					throw Error(`${key} 不存在`)
				}
			}
		})
	}

	const personValidators = {
		name(val){
			return typeof val === 'string'
		},
		age(val){
			return typeof val === 'number' && val>18
		}
	}

	class Person{
		constructor(name,age){
			this.name = name
			this.age = age
			return validator(this,personValidators)
		}
	}

	const person = new Person('css',24)

	console.log(person)

	// person.name =58
	// console.log(person)
	person.name = 'haha'
	console.log(person)
}