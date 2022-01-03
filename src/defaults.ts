import {AxiosRequestConfig} from './types'
import {transformRequest,transformResponse} from './helpers/data'
import {processHeaders} from './helpers/headers'

const defaults:AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  // !只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  transformRequest: [function (data, headers) {
    processHeaders(headers,data)
    return transformRequest(data);
  }],
  transformResponse: [function (data) {
    return transformResponse(data);
  }],
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach((method) => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults