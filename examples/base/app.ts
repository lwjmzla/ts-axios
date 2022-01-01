import axios from '../../src/index'
// import axios from 'axios'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     food: [
//       { id: 1, name: 'food1' },
//       { id: 2, name: 'food2' }
//     ]
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   headers: { // !1.相当于get情况的时候没data的，人家手动设置 也删除
//     'content-type': 'application/json;charset=utf-8'
//   },
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })
// let bak
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null,
//     bak: bak,
//     bay: 1
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

//
// axios({
//   method: 'post',
//   url: '/base/post',
//   // headers: {
//   //   'content-type': 'application/json;charset=utf-8'
//   // },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21.32])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   // headers: { // !这里不会自动删除，想自动删除需要另外处理
//   //   'content-type': 'application/json;charset=utf-8'
//   // },
//   data: arr
// })
//
// axios({
// 	method: 'post',
// 	url: '/base/post',
// 	data: {
// 		a: 1,
// 		b: 2
// 	}
// })

// axios({
// 	method: 'post',
// 	url: '/base/post',
// 	headers: {
// 		'content-type': 'application/json',
// 		'Accept': 'application/json, text/plain, */*'
// 	},
// 	data: {
// 		a: 1,
// 		b: 2
// 	}
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// // const formData = new FormData()
// // formData.append('procId', 'a1')

// axios({
// 	method: 'post',
// 	url: '/base/post',
// 	data: searchParams
// })


axios({
	method: 'post',
	url: '/base/post',
	data: {
		a: 1,
		b: 2
	}
}).then((res) => {
	console.log(res)
})

axios({
	method: 'post',
	url: '/base/post',
	responseType: 'json',
	data: {
		a: 3,
		b: 4
	}
}).then((res) => {
	console.log(res)
})


// function t1(): Promise<number> {
// 	return Promise.resolve(1)
// }

// (async () => {
// 	const v = await t1(); // 这里可以根据 Promise<number> 推断出 v 是 number 型
// })();

// interface ClockConstructor<T> {
// 	new (hour: number, minute: number): T;
// }
// interface ClockInterface {
// 	tick(): void;
// }

// function createClock(ctor: ClockConstructor<ClockInterface>, hour: number, minute: number): ClockInterface {
// 	return new ctor(hour, minute);
// }

// class DigitalClock implements ClockInterface {
// 	constructor(public h: number,public m: number) {
// 		console.log(this.h)
// 	}
// 	tick() {
// 		console.log('beep beep');
// 	}
// }
// class AnalogClock implements ClockInterface {
// 	constructor(public h: number,public m: number) {
// 		console.log(this.h)
// 	}
// 	tick() {
// 		console.log('tick tock');
// 	}
// }

// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 32);
// digital.tick()


// class Clock {
// 	currentTime: Date = new Date(); // 给默认值
// 	constructor() {
// 		console.log(this.currentTime)
// 	}
// 	tick() {
// 		console.log('tick tock');
// 	}
// }
// function createConstru<T>(ctor: { new (): T }): T { // 这种类型接口 意味着是构造函数的意思
// 	return new ctor();
// }
// createConstru<ClockInterface>(Clock);