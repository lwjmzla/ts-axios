import axios,{ AxiosError } from '../../src/index'
axios({
	method: 'get',
	url: '/error/get1'
}).then((res) => {
	console.log(res)
}).catch((e) => {
	console.dir(e)
	console.log(e)
})

axios({
	method: 'get',
	url: '/error/get'
}).then((res) => {
	console.log(res)
}).catch((e) => {
	console.log(e)
})

setTimeout(() => {
	axios({
		method: 'get',
		url: '/error/get'
	}).then((res) => {
		console.log(res)
	}).catch((e) => {
		console.log(e)
	})
}, 5000)

axios({
	method: 'get',
	url: '/error/timeout',
	timeout: 2000
}).then((res) => {
	console.log(res)

}).catch((e:AxiosError) => {
	console.dir(e)
	console.log(e.message)
	// console.log(e.message)
	console.log(e.config)
	// console.log(e.code)
	// console.log(e.request)
	// console.log(e.isAxiosError)
})

// class FooError extends Error {
// 	constructor(m: string) {
// 			super(m);
// 			// Set the prototype explicitly.
// 			Object.setPrototypeOf(this, FooError.prototype);  //!少了这个 调不了方法。。。
// 	}
// 	sayHello() {
// 			return "hello " + this.message;
// 	}
// }

// let footErr = new FooError('bug')
// console.log((new FooError('bug')) instanceof FooError)