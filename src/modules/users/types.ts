import { BaseApiResult } from "../apiClient/types"

export type VerificationCodeState = {
  mobile: string,
  step: VerificationCodeStep,
  nextTryInSeconds: number,
  lastTry: Date | null,
  token: string | null
}

export type UserState = {
  id: string,
  isInited: boolean,
  isAuthenticated: boolean,
  name: string,
  isCompleted: boolean,
  username: string
}

export type SetAuthenticatedUserModel = {
  id: string,
  name: string,
  username: string,
  isCompleted: boolean
}

export type MeResult = {
  success: boolean
  message: null | string
  result: {
    id: string,
    isAuthenticated: boolean
    token: null | string
    name: null | string
    username: null | string
    isCompleted: boolean
    expirationDateTime: Date
  }
}

export type CompleteRegistrationRequest = {
  username: string,
  displayName: string,
  password: string
}

export type LogInRequest = {
  username: string,
  password: string,
  isPersistent: boolean
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

export interface RequestVerificationCodeReponse extends BaseApiResult {
  nextTryInSeconds: number,
  token: string
}

export interface VerifyVerificationCodeResponse extends BaseApiResult {
  result: {
    id: string
    username: string
    name: null | string
    token: string
    isCompleted: boolean,
    expirationDateTime: Date
  }
}
