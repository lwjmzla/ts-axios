// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { AxiosInstance, AxiosRequestConfig } from './types' // !混合类型
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

// import dispatchRequest from './core/dispatchRequest'
// function getAxios(): AxiosInstance {
//   let axiosInstance = dispatchRequest as AxiosInstance; // eslint读不懂这形式的类型断言 改成：function(start: number) {} as Counter;
//   let axios = new Axios()
//   axiosInstance.get = axios.get;
//   axiosInstance.post = axios.post;
//   return axiosInstance;
// }
// export default getAxios()

function createInstance(defaults: AxiosRequestConfig): AxiosInstance {
  let context = new Axios(defaults)
  let axiosInstance = Axios.prototype.request.bind(context) // !bind不会立即调用  .bind(context)其实就是 指定类型     new Axios()才有  get post方法
  // !let axiosInstance = Axios.prototype.request as AxiosInstance // !这样ts不报错
  // !上面一行 是一个函数，而且有函数重载 有2种传参方式
  extend(axiosInstance, context)
  return axiosInstance as AxiosInstance
}

const axios = createInstance(defaults)
export default axios
