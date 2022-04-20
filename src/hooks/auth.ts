import { userTokenState } from '@/store/user'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { setToken, removeToken } from '@/utils/auth'

export function useAuth() {
  const [token, setStateToken] = useRecoilState(userTokenState)

  const login = (token: string, expires?: Date | number) => {
    setToken(token, expires)
    setStateToken(token)
  }

  const logout = () => {
    removeToken()
    setStateToken(undefined)
  }

  const isLogin = useMemo(() => {
    return !!token
  }, [token])

  return {
    isLogin,
    login,
    logout,
  }
}
