import { RequestVerificationCodeReponse, VerifyVerificationCodeResponse } from "../types"

export const requestVerificationCode = (mobile: string): RequestVerificationCodeReponse => 
  ({
    nextTryInSeconds: 60
  })

export const verifyVerificationCode = (mobile: string, code: string): VerifyVerificationCodeResponse => ({
  isAuthenticated: true,
  name: 'username',
  token: 'token'
})