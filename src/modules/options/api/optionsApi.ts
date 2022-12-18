import { get } from "@/modules/apiClient/baseApiClient";

export const getOptions = () => get<{ [key: string]: any }>('/options')
