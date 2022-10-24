import { RequestVerificationCodeReponse } from "../types"

export const requestVerificationCode = (mobile: string): RequestVerificationCodeReponse => 
  ({
    nextTryInSeconds: 60
  })
