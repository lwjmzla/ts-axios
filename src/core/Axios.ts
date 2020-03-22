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
}