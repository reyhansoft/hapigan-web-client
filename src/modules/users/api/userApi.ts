import { get } from "@/modules/apiClient/baseApiClient";
import { MeResult } from "../types";

export const getMe = () => get<MeResult>('/user/me')