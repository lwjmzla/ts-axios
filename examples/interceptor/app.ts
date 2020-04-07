import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptorCode = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptorCode)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
}).catch((err) => {
  console.log(err)
})


// let config = {name:'lwj'}

// let dispatchRequest = (config) => {
//   return new Promise((resolve,reject) => {
//     resolve(config);
//   })
// }

// let rejected = () => {}

// let promise = Promise.resolve(config)
// // promise.then((res) => {
// //   // !这个res 就是config
// // })
// // promise.then(dispatchRequest,rejected) // !dispatchRequest 相当于 上面注释掉的形式

// promise = promise.then((config) => {
//   return new Promise((resolve,reject) => { // !最外层的promise得到的返回值 就是 这个
//     resolve({
//       ...config,
//       age: 18
//     });
//   })
// },(err) => {
//   return Promise.reject(err);
// })

// promise = promise.then((config) => {
//   return {
//     ...config,
//     sex: 'male'
//   }
// },(err) => {
//   return Promise.reject(err);
// })

// promise.then((res) => {
//   console.log(res) // !{name: "lwj", age: 18, sex: "male"}
// }).catch((err) => {
//   console.log(err)
// })