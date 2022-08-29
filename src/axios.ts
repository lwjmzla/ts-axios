import { AxiosInstance, AxiosRequestConfig, AxiosStatic, CancelTokenStatic } from './types' // !混合类型
import Axios from './core/Axios'
import { extend, mergeDeep, isPlainObject } from './helpers/util'
import defaults from './defaults'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(defaults: AxiosRequestConfig): AxiosStatic {
  let context = new Axios(defaults)
  let axiosInstance = Axios.prototype.request.bind(context) // !bind不会立即调用  .bind(context)其实就是 指定类型     new Axios()才有  get post方法
  // !let axiosInstance = Axios.prototype.request as AxiosInstance // !这样ts不报错
  // !上面一行 是一个函数，而且有函数重载 有2种传参方式
  extend(axiosInstance, context)
  return axiosInstance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config: AxiosRequestConfig = {}): AxiosInstance {
  if (isPlainObject(config.headers)) {
    const common = {} as Record<string, any>
    const headers = config.headers as Record<string, any>
    for (const key in headers) {
      common[key] = headers[key]
    }
    config.headers = { common } // !把外面传入的config的headers放到common里
  }
  // !createInstance参数里的config.headers是未处理过的那种，就是defaults.headers，所以传入的config.headers需要转换
  return createInstance(mergeDeep(this.defaults, config))
}

//axios.CancelToken = CancelToken as unknown as CancelTokenStatic // !as unknown as作用相当于强制转换类型吧
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios

// !执行顺序如下
// !axios.interceptors.request.use
// !axios.defaults.transformRequest
// !axios.defaults.transformResponse
// !axios.interceptors.response.use
