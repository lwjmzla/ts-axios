import dispatchRequest from './dispatchRequest'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse, ResolvedFn, RejectedFn } from '../types'
import InterceptorManager from './interceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig> // !这里是class
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(), // !只实例化了一次，每次 axios.interceptors.request.use  里面 的this.interceptors都push
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    // !这里url是any因为要应对2种情况 case1. axios.request 只能传config，因此用url来接收传入的config
    // !case2.  axios('url', config)   这个url就是string
    // todo  判断这个url的类型
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url as AxiosRequestConfig
    }

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // !其实this.interceptors.request.interceptors 就可以拿到数组，不设为private，而且注意interceptor不能为null 为null的是被删掉了
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor) // !有多个 axios.interceptors.request.use 拦截器的话  原本顺序  1、2   执行的顺序 为 2、1
    })
    // !其实this.interceptors.response.interceptors 就可以拿到数组，不设为private
    this.interceptors.response.forEach(interceptor => {
      // !这个顺序没变
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()! // !非空断言   	删除并返回数组的第一个元素。
      promise = promise.then(resolved, rejected) // ! request拦截器 - 自己的dispatchRequest - response拦截器
    }
    // return dispatchRequest(config)
    return promise // !其实最终拦截完  很可能 结构 有可能不是  AxiosPromise的 所以这里 提醒是对的
    // return promise as AxiosPromise  // !这样ts不报错
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'get'
    }
    return dispatchRequest(config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'post',
      data
    }
    return dispatchRequest(config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'delete'
    }
    return dispatchRequest(config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'head'
    }
    return dispatchRequest(config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'options'
    }
    return dispatchRequest(config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'put',
      data
    }
    return dispatchRequest(config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {}
    config = {
      ...config,
      url,
      method: 'patch',
      data
    }
    return dispatchRequest(config)
  }
}
