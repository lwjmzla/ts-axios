import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  // private interceptors: (Interceptor<T> | null)[] //!也可以
  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    // !resolved rejected 最外面调用时传入进来。
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    // !其实没错的，想去除的话 直接复制接口 进来
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
