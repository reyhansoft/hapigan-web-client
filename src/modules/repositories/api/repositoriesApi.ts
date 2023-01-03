import { post, spost } from "@/modules/apiClient/baseApiClient";
import { CreateRepositoryPayload, CreateRepositoryResult, SearchRepoistoriesResult, SearchRepositoriesPayload } from "../types";

export const searchRepositories = (payload: SearchRepositoriesPayload) =>
  post<SearchRepoistoriesResult>('/repositories', payload)

export const createRepository = (payload: CreateRepositoryPayload) =>
  spost<CreateRepositoryResult>('/repository', payload)
