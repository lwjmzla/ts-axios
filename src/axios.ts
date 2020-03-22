// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
import {AxiosInstance} from './types' // !混合类型
import Axios from './core/Axios'

// import dispatchRequest from './core/dispatchRequest'
// function getAxios(): AxiosInstance {
//   let axiosInstance = dispatchRequest as AxiosInstance; // eslint读不懂这形式的类型断言 改成：function(start: number) {} as Counter;
//   let axios = new Axios()
//   axiosInstance.get = axios.get;
//   axiosInstance.post = axios.post;
//   return axiosInstance;
// }
// export default getAxios()

function createInstance():AxiosInstance {
  let context = new Axios()
  let axiosInstance = Axios.prototype.request.bind(context) // !bind不会立即调用  .bind(context)其实就是 制定类型为 new Axios()才有  get post方法
  axiosInstance.get = context.get; // todo  这个待优化
  axiosInstance.post = context.post;
  return axiosInstance
}

const axios = createInstance()
export default axios
