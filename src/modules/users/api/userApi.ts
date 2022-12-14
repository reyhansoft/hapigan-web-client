import { get, spost } from "@/modules/apiClient/baseApiClient";
import { BaseApiResult } from "@/modules/apiClient/types";
import { CompleteRegistrationRequest, MeResult } from "../types";

export const getMe = () => get<MeResult>('/account/me', {}, {
  withCredentials: true
})

export const completeRegistration = (payload: CompleteRegistrationRequest) => spost<BaseApiResult>('/account/complete-registration', payload)