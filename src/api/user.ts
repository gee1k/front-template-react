import request from '@/utils/request'
import { LoginParams, LoginResult, UserInfo } from './model/user.model'
import { sleep } from 'radash'

export function login(params: LoginParams): Promise<LoginResult> {
  console.log('login', params)
  return sleep(3000).then(() => {
    return {
      token: '123456',
    }
  })
}

export function login2(params: LoginParams) {
  return request<LoginResult>({
    url: '/login',
    method: 'POST',
    data: params,
  })
}

export function getInfo(): Promise<UserInfo> {
  console.log('getInfo')
  return sleep(1000).then(() => {
    return {
      id: 1,
      username: 'admin',
      nickname: '管理员',
      avatar: 'https://avatars.githubusercontent.com/u/29736613?v=4',
      roles: ['admin'],
    }
  })
}

export function getInfo2() {
  return request<UserInfo>({
    url: '/user/info',
    method: 'GET',
  })
}
