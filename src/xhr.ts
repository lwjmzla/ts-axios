
  import {AxiosRequestConfig} from './types'
  import {isPlainObject} from './helpers/util'
  function xhr(config: AxiosRequestConfig){
    const {data = null,url,method = 'get',headers} = config // !这里的data是转换后的 string了
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(),url,true)

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
  }
  export default xhr