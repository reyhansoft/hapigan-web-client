import { BaseApiResult } from "../apiClient/types"

export type VerificationCodeState = {
  mobile: string,
  step: VerificationCodeStep,
  nextTryInSeconds: number,
  lastTry: Date | null,
  token: string | null
}

export type UserState = {
  isInited: boolean,
  isAuthenticated: boolean,
  name: string,
  isCompleted: boolean
}

export type SetAuthenticatedUserModel = {
  name: string,
  isCompleted: boolean
}

export type MeResult = {
  isAuthenticated: boolean
  token: null | string
  name: null | string
  isCompleted: boolean
  expirationDateTime: Date
}

export type CompleteRegistrationRequest = {
  name: string,
  password: string
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
    name: null | string
    token: string
    isCompleted: boolean,
    expirationDateTime: Date
  }
}
