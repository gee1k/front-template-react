import request from '@/utils/request'
import { LoginParams, LoginResult, UserInfo } from './model/user.model'

export function login(params: LoginParams) {
  return request<LoginResult>({
    url: '/login',
    method: 'POST',
    data: params,
  })
}

export function getInfo() {
  return request<UserInfo>({
    url: '/user/info',
    method: 'GET',
  })
}
