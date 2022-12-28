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

export type SearchRepoistoriesResult = {
  hasMore: boolean,
  repositories: Array<Repository>
}

export type SearchRepositoriesPayload = {
  onlyMyRepositories: boolean,
  query: string | null,
  start: number
}
