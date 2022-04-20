import { getToken } from '@/utils/auth'
import { atom } from 'recoil'

export enum UserInfoStatus {
  Unloaded = 'unloaded',
  Loaded = 'loaded',
  Error = 'error',
}

export const userTokenState = atom<string | undefined>({
  key: 'userTokenState',
  default: getToken(),
})

export const userInfoState = atom<ApiUser.UserInfo | undefined>({
  key: 'userInfoState',
  default: undefined,
})

export const userInfoStatusState = atom<UserInfoStatus>({
  key: 'userInfoStatusState',
  default: UserInfoStatus.Unloaded,
})
