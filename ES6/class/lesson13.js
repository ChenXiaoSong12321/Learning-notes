// Promise
// 什么是异步
// Promise的作用
// Promise的基本用法

{
	let ajax = function(cb){
		console.log('do')
		setTimeout(function(){
			cb && cb()
		},1000)
	}
	ajax(function(){
		console.log('asyn',1)
	})

}

{
	let ajax = function(){
		console.log('do2')
		// res：执行下一步操作，rej：中断当前操作
		return new Promise(function(res,rej){
			setTimeout(function(){
				res()
			},1000)
		})	
	}

	ajax().then(function(){
		console.log('promise',2)
	})

}

{
	let ajax = function(){
		console.log('do3')
		// res：执行下一步操作，rej：中断当前操作
		return new Promise(function(res,rej){
			setTimeout(function(){
				res()
			},1000)
		})	
	}

	ajax()
		.then(function(){
			return new Promise(function(res,rej){
				setTimeout(function(){
					res()
				},2000)
			})
		})
		.then(function(){
			console.log('3')
		})
}

{
	let ajax = function(num){
		console.log('do4')
		return new Promise(function(res,rej){
			if (num >5) {
				res()
			}else{
				throw Error('wrong')
			}
		})
	}

	ajax(6)
		.then(function(){
			console.log('log',6)
		}).catch(function(err){
			console.log('catch',err)
		})
	// ajax(3)
	// 	.then(function(){
	// 		console.log('log',3)
	// 	}).catch(function(err){
	// 		console.log('catch',err)
	// 	})
}

{
	// Promise.all
	//所有图片加载完在添加到页面
	function loadImg(src){
		return new Promise((res,rej)=>{
			let img = document.createElement('img')
			img.src = src
			img.onload = function(){
				res(img)
			}
			img.onerror = function function_name(err) {
				rej(err)
			}
		})
	}
	function showImgs(imgs){
		imgs.forEach(function(img){
			document.body.appendChild(img)
		})
	}
	// 把多个Promise实例当一个Promise实例
	// all下面的数组都完成后才触发下面的方法
	Promise.all([
		loadImg('http://pic64.nipic.com/file/20150420/6215159_143018660000_2.jpg'),
		loadImg('http://img.taopic.com/uploads/allimg/120901/219077-120Z122341668.jpg'),
		loadImg('http://imgsrc.baidu.com/imgad/pic/item/03087bf40ad162d9d2fbac011bdfa9ec8a13cd92.jpg')
	])
	.then(showImgs)
}

{
	// Promise.race
	// 有一个图片加载，其余的就不加载了
	function loadImg(src){
		return new Promise((res,rej)=>{
			let img = document.createElement('img')
			img.src = src
			img.onload = function(){
				res(img)
			}
			img.onerror = function function_name(err) {
				rej(err)
			}
		})
	}

	function showImgs(img){
		let div = document.createElement('div')
		div.appendChild(img)
		document.body.appendChild(div)
	}
	// 谁先到显示谁
	Promise.race([
		loadImg('http://pic64.nipic.com/file/20150420/6215159_143018660000_2.jpg'),
		loadImg('http://img.taopic.com/uploads/allimg/120901/219077-120Z122341668.jpg'),
		loadImg('http://imgsrc.baidu.com/imgad/pic/item/03087bf40ad162d9d2fbac011bdfa9ec8a13cd92.jpg')
	])
	.then(showImgs)
}