// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
import {AxiosRequestConfig} from './types'
import {buildURL} from './helpers/url';
import {transformRequest} from './helpers/data'
import {processHeaders} from './helpers/headers'
import xhr from './xhr'
function axios(config: AxiosRequestConfig):void{
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig):void{ // !这个processConfig  会对 config 进行配置
  config.url = transformURL(config)
  config.headers = transformHeaders(config) // !有先后顺序 比data先
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig):string{
  const {url,params} = config
  return buildURL(url,params)
}

function transformRequestData(config: AxiosRequestConfig):any{
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig):any{
  const {headers ={},data} = config
  return processHeaders(headers,data)
}

export default axios