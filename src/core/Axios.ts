import dispatchRequest from './dispatchRequest'
import {AxiosRequestConfig,AxiosPromise,AxiosResponse,ResolvedFn,RejectedFn} from '../types'
import InterceptorManager from './interceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>  // !这里是class
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
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise{
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

    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]
  
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
  
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
  
    let promise = Promise.resolve(config)
  
    while (chain.length) {
      const { resolved, rejected } = chain.shift()! // !非空断言
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'get'
    }
    return dispatchRequest(config)
  }

  post(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'post',
      data
    }
    return dispatchRequest(config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'delete'
    }
    return dispatchRequest(config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'head'
    }
    return dispatchRequest(config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'options'
    }
    return dispatchRequest(config)
  }

  put(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise{
    config = config || {}
    config = {
      ...config,
      url,
      method: 'put',
      data
    }
    return dispatchRequest(config)
  }
  patch(url: string,data?:any, config?: AxiosRequestConfig): AxiosPromise{
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