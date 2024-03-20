import { getInfo, login } from '@/api/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LoginParams, UserInfo } from '@/api/model/user.model'

export interface UserState {
  token?: string
  user?: UserInfo
  loading: boolean
  login: (payload: LoginParams) => Promise<void>
  getInfo: () => Promise<void>
  logout: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: undefined,
      user: undefined,
      loading: false,
      login: async (payload: LoginParams) => {
        const res = await login(payload)
        set((state) => ({ ...state, token: res.token }))
      },
      getInfo: async () => {
        if (get().loading) {
          return
        }
        if (!get().token) {
          throw new Error('no token')
        }
        set((state) => ({ ...state, loading: true }))
        const userInfo = await getInfo()
        set((state) => ({ ...state, user: userInfo, loading: false }))
      },
      logout: async () => {
        set((state) => ({ ...state, token: undefined, user: undefined }))
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
