
import {AxiosRequestConfig,AxiosPromise,AxiosResponse} from './types'
import {isPlainObject} from './helpers/util'
import { resolve } from 'url';
function xhr(config: AxiosRequestConfig):AxiosPromise{
  return new Promise((resolve,reject) => {
    const {data = null,url,method = 'get',headers,responseType} = config // !这里的data是转换后的 string了
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(),url,true)

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        // if (request.status === 200) {
        //   var data = JSON.parse(request.responseText);
        //   resolve(data);
        // } else {
        //   // eslint-disable-next-line
        //   reject('出错了')
        // }
        const responseHeaders = request.getAllResponseHeaders()
        // console.log(responseHeaders.split('\r\n'))
        let arr = responseHeaders.split('\r\n') // !有回车 和 换行符
        !arr[arr.length-1] && arr.pop() // !最后一项值不存在就删除
        // let str = item.replace(/(^")|("*)/,'') // !去除最左最右"
        let responseHeadersObj = arr.map((item) => item.split(': ')).reduce((o:any, [k, v]) => (o[k] = v, o), {})
        // console.log(responseHeadersObj)
        let responseData = responseType && responseType !== 'text' ? request.response : request.responseText
        if (typeof responseData === 'string') {
          try {
            responseData = JSON.parse(responseData)
          } catch (e) {
            // 不管
          }
        }
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeadersObj,
          config,
          request
        }
        resolve(response)
      }
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') { // !这种相当于get情况的时候没data的，人家手动设置 也删除
      // if ((data === null || !isPlainObject(data)) && name.toLowerCase() === 'content-type') { // !
      // !相当于1.相当于get情况的时候没data的，人家手动设置 也删除  2.不是普通对象，而且手动设置了，也删除(但这里的data是string，应该用原数据)，懒得弄，还是继续老师的
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
export default xhr