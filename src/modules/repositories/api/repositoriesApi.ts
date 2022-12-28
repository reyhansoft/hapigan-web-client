import { post } from "@/modules/apiClient/baseApiClient";
import { SearchRepoistoriesResult, SearchRepositoriesPayload } from "../types";

export const searchRepositories = (payload: SearchRepositoriesPayload) =>
  post<SearchRepoistoriesResult>('/repositories', payload)