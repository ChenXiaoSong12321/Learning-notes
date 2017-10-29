// 模块化
// export import

// export let A = 123

// export function test(){
// 	console.log('test')
// }

// export class Hello{
// 	test(){
// 		console.log('class')
// 	}
// }

let A = 123

function test(){
	console.log('test')
}

class Hello{
	test(){
		console.log('class')
	}
}

export default {
	A,test,Hello
}