export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  roles: string[]
}
