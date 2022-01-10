import { setTimeout } from 'timers'
import axios from '../../src/index'
const CancelToken = axios.CancelToken

axios.defaults.headers.common.test = 123

const instance = axios.create({
  headers: {
    name: 'lwj',
    'content-type': 'application/json;charset=utf-8',
  }
})
instance.interceptors.request.use(config => {
  console.log(1)
  config.headers['AUTH-TOKEN'] = 'token';
  config.data.currentUserId = 'currentUserId';
  return config
})

instance.interceptors.response.use(res => {
  console.log(4)
  res.data.c = 3
  return res
})

let cancel

instance({
	method: 'post',
	url: '/base/post',
	data: {
		a: 1,
		b: 2
	},
  headers: {
  },
  cancelToken: new CancelToken((c) => {
    cancel = c
  })
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})

cancel('ajax cancel')

