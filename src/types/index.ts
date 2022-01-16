// 请求方法
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// axios请求参数接口
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  paramsSerializer?: (params: any) => string

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T // !通过泛型的方式嵌套接口  用来要求返回数据的格式
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
  // ! 类型  是 Promise<AxiosResponse> resolve值类型 AxiosResponse
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    // !拦截器用的
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  // !但拓展了Axios 就成 混合类型接口
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T> // !原本这种属于函数类型接口
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // !和上一行  相当于函数重载
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// !拦截器  axios.interceptors.request.use/eject  axios.interceptors.response.use/eject
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void // !删除拦截器
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken{ // !CancelToken的实例
  promise: Promise<Cancel>
  reason?: Cancel
}

export interface Canceler{
  (message?: string): void
}

export interface CancelExecutor{
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic { // !CancelToken的构造函数、静态方法
  new (executor: CancelExecutor): CancelToken // !CancelTokenStatic是一个构造函数
  souce(): CancelTokenSource // !CancelTokenStatic有一个静态方法souce
}

export interface Cancel { // !Cancel实例
  message?: string
}

export interface CancelStatic { // !Cancel构造函数
  new (message?: string): Cancel
}