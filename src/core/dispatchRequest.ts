import {AxiosRequestConfig,AxiosPromise} from '../types'
import {buildURL,isAbsoluteURL,combineURL} from '../helpers/url';
// import {transformRequest} from '../helpers/data'
// import {processHeaders} from '../helpers/headers'
import xhr from './xhr'
import transform from './transform'
function dispatchRequest(config: AxiosRequestConfig):AxiosPromise{
  processConfig(config)
  return xhr(config).then((res) => {
    res.data = transform(res.data,res.headers,config.transformResponse) // !为transformResponse时，headers没用
    return res
  })
}

function processConfig(config: AxiosRequestConfig):void{ // !这个processConfig  会对 config 进行配置
  config.url = transformURL(config)
  // config.headers = transformHeaders(config) // !有先后顺序 比data先
  // config.data = transformRequestData(config)
  config.data = transform(config.data,config.headers,config.transformRequest) // !headers直接通过对象引用的方式修改，不需要返回值
}

function transformURL(config: AxiosRequestConfig):string{
  let {url,params,paramsSerializer, baseURL} = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!,params,paramsSerializer) // !非空断言
}

// function transformRequestData(config: AxiosRequestConfig):any{
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig):any{
//   const {headers ={},data} = config
//   return processHeaders(headers,data)
// }

export default dispatchRequest