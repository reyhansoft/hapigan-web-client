import { RequestVerificationCodeReponse, VerifyVerificationCodeResponse } from "../types"
import { post } from '@/modules/apiClient/baseApiClient'

export const requestVerificationCode = (phoneNumber: string): Promise<RequestVerificationCodeReponse> => 
  post('/user/phone/send_verification_code', {
    phoneNumber
  })

export const verifyVerificationCode = (phoneNumber: string, code: string, token: string): Promise<VerifyVerificationCodeResponse> =>
  post('/user/phone/verify', {
    phoneNumber,
    code,
    token
  })