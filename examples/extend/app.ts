import axios from '../../src/index'

axios('/extend/post',{
	method: 'post',
	data: {
		msg: 'hi'
	}
})

axios({
	url: '/extend/post',
	method: 'post',
	data: {
		msg: 'hi'
	}
})

axios.request({
	url: '/extend/post',
	method: 'post',
	data: {
		msg: 'hello'
	}
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })

interface FnMore{ 
	(name: string): string; 
	(age: number,name?: string): string;
}
// !上面2种情况跟(name:string, age?: number): string对比，这个name是必传的，age是选传的,所以很直观搞定了
// !但需求只要name或 要age + name?  所以才要函数重载，大家第一个参数都是必传，只是意义不一样，因此函数传入的第一个参数 可能是name或者age

let fn: FnMore = (age: number | string,name?: string): string => {
	if (typeof age === 'number') {
		return age + (name ? name: '')
	} else {
		name = age
		return name
	}
}
console.log(fn('lwj'))

interface ResponseData<T = any>{
	code: number,
	result: T, // !一般这里就不用泛型了，比较随意就好
	message: string
}
interface User{
	name: string,
	age: number
}
function axiosGet<T = any>(url:string) {
	return axios.get<ResponseData<T>>(url) // !通过泛型的方式嵌套接口
	// return axios<ResponseData<T>>(url)
}
axiosGet<User>('/extend/user').then((res) => {
	console.log(res.data.message)
	console.log(res.data.code)
	console.log(res.data.result)
	console.log(res.data.result.name)
	console.log(res.data.result.age)
})
