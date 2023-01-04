import { get, post, spost } from "@/modules/apiClient/baseApiClient";
import { BaseApiResult, SecureLevel } from "@/modules/apiClient/types";
import { CompleteRegistrationRequest, LogInRequest, MeResult } from "../types";

export const getMe = () => get<MeResult>('/account/me', {}, {
  withCredentials: true
}, SecureLevel.Anonymous)

export const completeRegistration = (payload: CompleteRegistrationRequest) =>
  spost<MeResult>('/account/complete-registration', payload)

export const logIn = (payload: LogInRequest) => 
  post<MeResult>('/account/login', payload, {
    withCredentials: true
  })