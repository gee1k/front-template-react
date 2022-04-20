declare namespace ApiUser {
  interface LoginPayload {
    username: string
    password: string
  }

  interface LoginResponse {
    token: string
    token_name: string
    token_type: string
    expires_in: number
  }

  interface UserInfo {
    username: string
    password: string
  }
}
