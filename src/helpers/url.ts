import {isDate,isPlainObject} from './util'

// 对URL进行编码
function encode(val: string): string {
  // return val
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url:string,params?:any):string{
  if(!params){
    return url
  }
  const parts:string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if(val === null || typeof val === 'undefined'){
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key = key + '[]'   // ! foo: ['bar', 'baz']  url 是 /base/get?foo[]=bar&foo[]=baz'。
    } else {
      values = [val]
    }

    values.forEach((val) => { // !这里其实params[key]  为数组 的才需要遍历多个  ，其他的只有一次遍历
      if (isDate(val)) {
        // val = (val as Date).toISOString()
        val = val.toISOString()
      } else if(isPlainObject(val)) {
        // !这个val 也有可能是数组的  例如 params[key]为  [[1],[2]]   在这里还是直接JSON.stringify掉
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let newUrl:string
  const markIndex = url.indexOf('#')
  if (markIndex !== -1) {
    url = url.slice(0,markIndex)  // ! url: '/base/get#hash',丢弃 url 中的哈希标记
  }
  if (url.indexOf('?') === -1) { // !没有?
    newUrl = parts.length ? url + '?' + parts.join('&') : url
  } else { // ! 有 ?
    newUrl = parts.length ? url + '&' + parts.join('&') : url
  }
  return newUrl
}