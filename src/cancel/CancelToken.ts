import {CancelExecutor,CancelTokenSource,Canceler} from '../types'
import Cancel from './Cancel'

interface ResolvePromise{
  (reason?: Cancel): void
}

export default class CancelToken{
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor){
    let resolvePromise:ResolvePromise
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve as ResolvePromise
    })

    executor((message?: string) =>{
      if (this.reason) { // !防止执行多次cancel
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  static source():CancelTokenSource { // !静态方法
    let cancel!: Canceler
    const token = new CancelToken((c) => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}

/*
  !常用使用方式
  const CancelToken = axios.CancelToken;
  let cancel;
  axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
  cancel();
*/

/*
  !source使用方式，这种方式token和cancel捆绑一起了，如果多个接口请求，不知怎么区分取消。
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios.post('/user/12345', {
    name: 'new name'
  }, {
    cancelToken: source.token
  })
  source.cancel('Operation canceled by the user.');
*/