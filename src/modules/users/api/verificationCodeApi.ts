import { RequestVerificationCodeReponse, VerifyVerificationCodeResponse } from "../types"
import { post } from '@/modules/apiClient/baseApiClient'

export const requestVerificationCode = (mobile: string): Promise<RequestVerificationCodeReponse> => 
  post('/user/mobile/send_verification_code', {
    mobile
  })

export const verifyVerificationCode = (mobile: string, code: string): VerifyVerificationCodeResponse => ({
  isAuthenticated: true,
  name: 'username',
  token: 'token'
})