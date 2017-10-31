js定义类的六种方式详解

1、工厂模式

function Car() {
	var ocar = new Object;
	ocar.color="blue";
	ocar.doors = 4;
	ocar.showColor = function () {
		document.write(this.color)
	};
	return ocar;
}
var car1 = Car();
var car2 = Car();

调用此函数时将创建新对象，并赋予它所有的属性和方法。使用此函数可以创建2个属性完全相同的对象。当然可以通过给它传递参数来改版这种方式。

function Car(color,door) {
	var ocar =new Object;
	ocar.color = color;
	ocar.doors = door;
	ocar.showColor = function () {
		document.write(this.color)
	};
	return ocar;
}
var var1 = Car("red",4);
var car2 = Car("blue",4);
car1.showColor();
car2.showColor();

现在可以通过函数传递不同参数来得到具有不同值得对象。
之前，每次调用函数Car()都要创建showcolor()，意味着每个对象都有一个自己的showcolor()方法。
但是事实上，每个对象都共享了同一个函数。虽然可以在函数外定义方法，然后通过将函数的属性指向该方法。

2、构造函数模式

function Car(color,door) {
	this.color = color;
	this.doors = doors;
	this.showColor = function () {
		alert(this.color)
	};
}
var car1 = new Car("red",4);
var car2 = new Car("blue",4);

可以看到构造函数方式在内部没有创建对象，是用this关键字。因为在调用构造函数时已经创建了对象，而在函数内部只能用this来访问对象属性。
现在用new来创建对象，但是同工厂模式一样。每次调用都会为对象创建自己的方法。

3、原型方法
该方法利用了对象的prototype属性。首先用空函数创建类名，然后所有的属性和方法都被赋予prototype属性。

function Car(){}
Car.prototype.color =  "red";
Car.prototype.doors =  "4";
Car.prototype.showColor =  function () {
	alert(this.color);
}
var car1 = new Car();
var car2 = new Car();

在这段代码中，首先定义了一个空函数，然后通过prototype属性来定义对象的属性。调用该属性时，原型的所有属性都会立即赋予要创建的对象，
所有该函数的对象存放的都是指向showColor()的指针，语法上起来都属于同一个对象。
但是这个函数没有参数，不能通过传递参数来初始化属性，必须要在对象创建后才能改变属性的默认值。
原型方式有个很严重的问题就是当属性指向的是对象时，如数组，
function Car(){
}
Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.arr = new Array(“a”,”b”);
Car.prototype.showColor = function(){
alert(this.color);
}
var car1 = new Car();
var car2 = new Car();
car1.arr.push(“cc”);
alert(car1.arr); //output:aa,bb,cc
alert(car2.arr); //output:aa,bb,cc
这里由于数组的引用值，Car的两个对象指向的都是同一个数组，所以当在car1添加值后，在car2中也可以看到。

4、混合构造函数/原型方式
可以像其他程序设计语言一样创建对象，是用构造函数定义对象的非函数属性，用原型方式定义对象的方法

function Car(color,door) {
	this.color = color;
	this.doors = door;
	this.arr = new Array("aa","bb");
}
Car.prototype.showColor(){
	alert(this.color);
}

var car1 = new Car("red",4);
var car2 = new Car("blue",4);

car1.arr.push("cc");

alert(car1.arr);//aa,bb,cc
alert(car2.arr);//aa,bb

使用最广泛的方法。

5、动态原型方式
动态原型的方式同混合的构造函数/原型方式原理相似。唯一的区别就是赋予对象方法的位置。

function Car(color, door) {
	this.color = color;
	this.doors = door;
	this.arr = new Array(“aa”, ”bb”);
	if (typeof Car._initialized == “undefined”) {
		Car.prototype.showColor = function() {
			alert(this.color);
		};
		Car._initialized = true;
	}
}

动态原型方式是使用一个标志来判断是否已经给原型赋予了方法。这样可以保证该方法只创建一次

6、混合工厂方式
它的目的师创建假构造函数，只返回另一种对象的新实例。

function Car() {
	var ocar = new Object();
	ocar.color = “red”;
	ocar.doors = 4;
	ocar.showColor = function() {
		alert(this.color)
	};
	return ocar;
}

与工厂方式所不同的是，这种方式使用new运算符。