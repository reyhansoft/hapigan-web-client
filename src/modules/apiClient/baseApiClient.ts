import axios from 'axios'

import { RequestConfig, RequestResult, ApiError, Api, SecureRequestHandlerType } from './types'

let baseUrl = BASE_URL

const normalizeUrl = (url: string) => {
  while(url.startsWith('/')) {
    url = url.substring(1)
  }
  return url
}

function getUrl(baseUrl: string, url: string): string {
  if (!/^((http|ws|https):\/\/).*/.test(url)) {
    return baseUrl + normalizeUrl(url)
  }
  return url
}

const headers: { [key: string]: string } = {}

let secureRequestHandler: SecureRequestHandlerType = (config: RequestConfig) =>
  new Promise((resolve, reject) => resolve(config))

function request(config: RequestConfig) {

  config.headers = config.headers || {}
  for (let key in headers) {
    if (config.headers[key] === undefined) {
      config.headers[key] = headers[key]
    }
  }

  if (config.method !== 'get') {
    config.headers = Object.assign(config.headers, { 'Content-Type': 'application/json' })
  }

  const handler = typeof config.handler === 'function' ? config.handler : axios
  delete config.handler

  return handler(config as any)
    .then((response: any) => {
      return RequestResult.createFromData(response.data)
    })
    .catch((error: any) => {
      let status = 0
      let errorMessage = 'Cannot connect to server'

      if (error.response && error.response.status !== null) {
        status = error.response.status
        errorMessage = error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Unexcepted error occured'
      }
      throw new ApiError(errorMessage, status)
    })
}

export async function get<T> (url: string, data: any = {}, config?: RequestConfig) : Promise<T> {
  return (
    await request({
      method: 'get',
      url: getUrl(baseUrl, url),
      params: data,
      ...config
    })
  ).data as T
}

export async function sget<T> (url: string, data: any = {}, config?: RequestConfig) : Promise<T> {
  return (
    await request(
      await secureRequestHandler({
        method: 'get',
        url: getUrl(baseUrl, url),
        params: data,
        ...config
      })
    )
  ).data as T
}

export async function post<T>(url: string, data: any, config?: RequestConfig): Promise<T> {
  return (
    await request({
      method: 'post',
      url: getUrl(baseUrl, url),
      data,
      ...config
    })
  ).data as T
}

export async function spost<T>(url: string, data: any, config?: RequestConfig): Promise<T> {
  return (
    await request(
      await secureRequestHandler({
        method: 'post',
        url: getUrl(baseUrl, url),
        data,
        ...config
      })
    )
  ).data as T
}

export const put = (url: string, data: any, config?: RequestConfig) =>
  request({
    method: 'put',
    url: getUrl(baseUrl, url),
    data,
    ...config
  })
export const del = (url: string, config?: RequestConfig) =>
  request({
    method: 'delete',
    url: getUrl(baseUrl, url),
    ...config
  })
export const addHeader = (key: string, value: string) => {
  headers[key] = value
}
export const removeHeader = (key: string) => {
  delete headers[key]
}
export const setBaseUrl = (newBaseUrl: string) => {
  baseUrl = newBaseUrl
}

export const setSecureRequestHandler = (srh: SecureRequestHandlerType) => {
  secureRequestHandler = srh
}