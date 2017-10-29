// 类和对象
// 基本语法 类的继承 静态方法 静态属性 getter setter

{
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
	}
	let v_parent = new Parent('css')
	console.log('构造函数和实例',v_parent)
}

{
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
	}

	class Child extends Parent{
		
	}

	console.log('继承',new Child())
}

{
	// 继承传递参数
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
	}
	// 子类向父类传递参数
	class Child extends Parent{
		constructor(name = 'child'){
			// 使用super一定放在第一行
			super(name)
			this.type = 'child'
		}
	}

	console.log('继承',new Child(/*'hhh'*/))
}

{
	// getter setter
	class Parent{
		constructor(name='haha'){
			this.name = name
		}

		get longName(){
			return 'abc'+this.name
		}

		set longName(value){
			this.name = value
		}
	}

	let v = new Parent()
	console.log('getter',v.longName)
	v.longName = 'hhh'
	console.log('setter', v.longName)
}

{
	// 静态方法
	class Parent{
		constructor(name='haha'){
			this.name = name

		}

		static tell(){
			console.log('tell')
		}
	}

	Parent.tell()
}

{
	// 静态属性
	class Parent{
		constructor(name='haha'){
			this.name = name

		}
		static tell(){
			console.log('tell')
		}

	}
	Parent.type = 'test'

	console.log('静态属性',Parent.type)
}