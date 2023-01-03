import { ApiError, RequestConfig, SecureRequestHandlerType } from "@/modules/apiClient/types"
import wait from "@/services/common/wait"
import { getMe } from "../api/userApi"

type Token = {
  token: string
  expirationDateTime: Date
}
let _token: null | Token = null 
let _isRenewingToken = false

export const secureRequestHandler: SecureRequestHandlerType = async (config: RequestConfig, tokenRequired: boolean) => {
  if (_token === null) {
    // ?
    if (tokenRequired) {
      throw new ApiError("Unauthorized access", -1)
    } else {
      return {
        ...config
      }
    }
  }
  if (new Date() > _token!.expirationDateTime) {
    // token is expired
    if (!_isRenewingToken) {
      _isRenewingToken = true
      try{
        const { success, result } = await getMe()
        if (success && result.isAuthenticated) {
          _token = {
            token: result.token || '',
            expirationDateTime: result.expirationDateTime
          }
        } else {
          _token = null
        }
        // set token
        _isRenewingToken = false
      } catch (e) {
        _isRenewingToken = false
        if (e instanceof ApiError) {
          throw new ApiError(e.message, e.status)
        } else {
          throw new ApiError("Failed to get access token", -1)
        }
      }
    } else {
      while(_isRenewingToken) {
        await wait(10)
      }
      return await secureRequestHandler(config, tokenRequired)
    }
  }
  return {
    ...config,
    headers: {
      Authorization: `bearer ${_token!.token}`
    }
  }
}

export const setToken = (token: Token) => {
  _token = token
}
