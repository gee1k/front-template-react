import { getToken } from '@/utils/auth'
import { atom, selector } from 'recoil'

export const userState = atom<{ token: string | undefined; userInfo: ApiUser.UserInfo | undefined }>({
  key: 'userState',
  default: {
    token: getToken(),
    userInfo: undefined,
  },
})

export const userTokenState = selector<string | undefined>({
  key: 'userTokenState',
  get: ({ get }) => get(userState).token,
  set: ({ set }, newValue) =>
    set(userState, (currentState) => {
      return {
        ...currentState,
        token: newValue as string,
      }
    }),
})

export const userInfoState = selector<ApiUser.UserInfo | undefined>({
  key: 'userInfoState',
  get: ({ get }) => get(userState).userInfo,
  set: ({ set }, newValue) =>
    set(userState, (currentState) => {
      return {
        ...currentState,
        userInfo: newValue as ApiUser.UserInfo,
      }
    }),
})
