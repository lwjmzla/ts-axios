const toString = Object.prototype.toString

export function isDate(val:any): val is Date{
  return toString.call(val) === '[object Date]'
}

// export function isObject(val:any):val is object{ // !数组也满足
//   return val !==null && typeof val === 'object'
// }

export function isPlainObject(val:any):val is object{ // !真正的普通对象
  return toString.call(val) === '[object Object]'
}

export function isFormData(val:any):val is FormData{
  return val instanceof FormData
}

export function extend<T, U>(to: T,from : U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function mergeDeep(merge1: Record<string, any>, merge2:Record<string, any>){
  const result: Record<string, any> = {}
  for (const key in merge1) {
    if (isPlainObject(merge1[key])) {
      result[key] = isPlainObject(merge2[key]) ? mergeDeep(merge1[key], merge2[key]) : merge1[key]
    } else {
      result[key] = merge2.hasOwnProperty(key) ? merge2[key] : merge1[key]
    }
  }
  const merge1Keys = Object.keys(merge1)
  // !寻找merge2中merge1没有的key，然后直接赋值
  for (const key in merge2) {
    if (!merge1Keys.includes(key)) {
      result[key] = merge2[key]
    }
  }
  return result
}