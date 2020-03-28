import dispatchRequest from './dispatchRequest'
import {AxiosRequestConfig,AxiosPromise} from '../types'
export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise{
    return dispatchRequest(config)
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