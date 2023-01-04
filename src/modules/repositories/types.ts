import { BaseApiResult } from "../apiClient/types"

export type Repository = {
  id: number,
  parentId: number,
  name: string,
  title: string,
  creationDateTime: string,
  visibility: RepositoryVisibiliy,
  membersCount: number,
  postsCount: number,
  members: Array<RepositoryMember>,
  description: string
}

export type RepositoryVisibiliy = {
  id: number
  name: string
}

export type RepositoryMember = {
  member: Member,
  type: number,
  joinDateTime: string
}

export type Member = {
  id: number,
  userName: string,
  profile: Profile
}

export type Profile = {
  displayName: string
}

export interface SearchRepoistoriesResult extends BaseApiResult {
  hasMore: boolean,
  repositories: Array<Repository>
}

export type SearchRepositoriesPayload = {
  memberId: string | null,
  query: string | null,
  start: number,
  allowedActions: Array<string>
}

export type CreateRepositoryPayload = {
  name: string,
  title: string,
  description: string,
  parentId: string | null,
  visibility: number
}

export interface CreateRepositoryResult extends BaseApiResult {

}
