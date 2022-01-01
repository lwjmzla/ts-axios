import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })

// axios.get('/simple/get',{
//   params: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })
axios.defaults.headers.common.test = 123
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  },
  headers: {
    'content-type': 'application/json;charset=utf-8',
    test1: '456'
  },
})

axios({
	method: 'post',
	url: '/base/post',
	data: {
		a: 1,
		b: 2
	},
  headers: {
    'content-type': 'application/json;charset=utf-8',
    test1: '456'
  },
})