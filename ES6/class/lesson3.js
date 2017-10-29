// 正则扩展
// 正则新增特性：构造函数的变化 正则的扩展
	// ui修饰符 y修饰符 s修饰符

{
	let reg = new RegExp('abc','i')
	let reg1 = new RegExp(/abc/i)
	let reg2 = /abc/i

	console.log(reg.test('abc123'))
	console.log(reg1.test('abc123'))
	console.log(reg2.test('abc123'))

	let reg3 = new RegExp(/abc/ig,'i')
	// es6允许第二个参数i覆盖第一个参数后的ig
	// .flags获取修饰符
	console.log(reg3.flags)
}
// y修饰符
{
	let s = 'bbb__bbbb_b'
	let reg = /b+/g
	let reg2 = /b+/y
	// exec()返回一个数组，其中存放匹配的结果。如果未找到匹配，
	// 则返回值为 null。
	// 如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。
	// 此数组的第 0 个元素是与正则表达式相匹配的文本，
	// 第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），
	// 第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
	// 除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。
	// input 属性则存放的是被检索的字符串 string。
	// 我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。
	// 但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。
	// 它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。
	// 当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。
	// 就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。
	// 当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
	console.log('one',reg.exec(s),reg2.exec(s))
	console.log('two',reg.exec(s),reg2.exec(s))
	// g:全局匹配，从上一次匹配的位置继续寻找，直到找到匹配的位置开始
	// y:全局匹配，必须从下一个字符匹配成功才算
	
	console.log(reg.sticky,reg2.sticky)
}
// u修饰符
// 识别unicode编码
// 如果Unicode大于两个字节，必须加u
// .不能识别两个字节及以上的,回车符、换行符、行分隔符、段分隔符
{
	console.log('u1',/^\uD83D/.test('\uD83D\uDC2A')) 
	console.log('u2',/^\uD83D/u.test('\uD83D\uDC2A')) 

	console.log(/\u{61}/.test('a'))
	console.log(/\u{61}/u.test('a'))

	console.log(`\u{20BB7}`)
	let s = '𠮷'
	console.log('u',/^.$/.test(s))
	console.log('u-1',/^.$/u.test(s))

	console.log('test',/𠮷{2}/.test('𠮷𠮷'))
	console.log('test2',/𠮷{2}/u.test('𠮷𠮷'))
}