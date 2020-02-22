// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
import {AxiosRequestConfig} from './types'
import {buildURL} from './helpers/url';
import xhr from './xhr'
function axios(config: AxiosRequestConfig):void{
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig):void{ // !这个processConfig  会对 config 进行配置
  config.url = transformURL(config)
}

function transformURL(config: AxiosRequestConfig):string{
  const {url,params} = config
  return buildURL(url,params)
}

export default axios