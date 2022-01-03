import axios, {AxiosTransformer} from '../../src/index'

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

axios.interceptors.request.use(config => {
  console.log(1)
  config.headers['AUTH-TOKEN'] = 'token';
  config.data.currentUserId = 'currentUserId';
  return config
})

axios.interceptors.response.use(res => {
  console.log(4)
  res.data.c = 3
  return res
})

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   },
//   headers: {
//     'content-type': 'application/json;charset=utf-8',
//     test1: '456'
//   },
// })

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
  // !局限只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest: [function (data, headers) {
    console.log(2)
    data.transformRequest = 'transformRequest'
    headers['transformRequest'] = 'transformRequest';
    return data;
  },...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [ // !局限在只可以拦截data，不可以拦截status
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      console.log(3)
      data.transformResponse = 'transformResponse'
      return data;
    }
  ],
}).then((res) => {
  console.log(res.data)
}).catch((err) => {
  console.log(err)
})

// !执行顺序如下
// !axios.interceptors.request.use  
// !axios.defaults.transformRequest 
// !axios.defaults.transformResponse
// !axios.interceptors.response.use 
