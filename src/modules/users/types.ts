export type VerificationCodeState = {
  mobile: string,
  step: VerificationCodeStep,
  nextTryInSeconds: number,
  lastTry: Date | null,
  token: string | null
}

export enum VerificationCodeStep {
  Request,
  Verify
}

export interface ChangeToVerifyArg {
  nextTryInSeconds: number,
  mobile: string,
  token: string
}

export interface RequestVerificationCodeReponse {
  nextTryInSeconds: number,
  success: boolean,
  message: string,
  token: string
}

export interface VerifyVerificationCodeResponse {
  success: boolean
  message: null | string
  result: {
    name: null | string
    token: string
    isCompleted: boolean
  }
}
