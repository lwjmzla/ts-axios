import {CancelExecutor} from '../types'

interface ResolvePromise{
  (reason?: string): void
}

export default class CancelToken{
  promise: Promise<string>
  reason?: string

  constructor(executor: CancelExecutor){
    let resolvePromise:ResolvePromise
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve as ResolvePromise
    })

    executor((message?: string) =>{
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}