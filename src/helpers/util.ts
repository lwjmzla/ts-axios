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

export function extend<T, U>(to: T,from : U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}