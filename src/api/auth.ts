import request from '@/utils/request'

export function login(data: ApiUser.LoginPayload) {
  return request<ApiUser.LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function getInfo() {
  return request<ApiUser.UserInfo>({
    url: '/auth/info',
    method: 'get',
  })
}
