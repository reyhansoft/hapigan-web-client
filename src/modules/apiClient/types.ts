export interface RequestConfig {
  headers?: { [key: string]: string }
  method?: string
  url?: string
  handler?: (config: any) => Promise<any>,
  params?: { [key: string]: string },
  data?: { [key: string]: string }
  withCredentials?: boolean
}

export class RequestResult {
  status = 0
  data: any

  constructor (data: any, status: number) {
    this.status = status
    this.data = data
  }

  static createFromData (data: any, status = 200): RequestResult {
    return new RequestResult(data, status)
  }
}

export type Get = (url: string, data?: any, config?: RequestConfig) => Promise<RequestResult>
export type Post = (url: string, data: any, config?: RequestConfig) => Promise<RequestResult>
export type Put = (url: string, data: any, config?: RequestConfig) => Promise<RequestResult>
export type Del = (url: string, config?: RequestConfig) => Promise<RequestResult>
export type AddHeader = (key: string, value: string) => void;
export type RemoveHeader = (key: string) => void;

export class ApiError extends Error {
  public readonly status: number
  public readonly message: string

  constructor (messages: string, status: number) {
    super(messages)
    this.name = 'ApiError'
    this.status = status
    this.message = messages
  }
}

export interface Api {
  get: Get
  post: Post
  put: Put
  del: Del
  addHeader: AddHeader
  removeHeader: RemoveHeader
}
