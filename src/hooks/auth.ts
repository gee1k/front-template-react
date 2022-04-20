import { userInfoState, UserInfoStatus, userInfoStatusState, userTokenState } from '@/store/user'
import { useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { removeToken, setToken } from '@/utils/auth'
import { getInfo as getInfoApi, login as loginApi } from '@/api/auth'

export function useAuth() {
  const [token, setStateToken] = useRecoilState(userTokenState)
  const [, setUserInfo] = useRecoilState(userInfoState)
  const [userInfoStatus, setUserInfoStatus] = useRecoilState(userInfoStatusState)

  const login = useCallback(
    async (userInfo: ApiUser.LoginPayload) => {
      setUserInfo(undefined)

      const ret = await loginApi(userInfo)
      setToken(ret.token, ret.expires_in)
      setStateToken(ret.token)

      setUserInfoStatus(UserInfoStatus.Unloaded)

      return ret
    },
    [setStateToken, setUserInfo, setUserInfoStatus],
  )

  const getInfo = useCallback(async () => {
    try {
      const info = await getInfoApi()
      setUserInfo(info)
      setUserInfoStatus(UserInfoStatus.Loaded)
      return info
    } catch {
      setUserInfoStatus(UserInfoStatus.Error)
    }
  }, [setUserInfo, setUserInfoStatus])

  const logout = useCallback(() => {
    removeToken()
    setStateToken(undefined)
    setUserInfoStatus(UserInfoStatus.Unloaded)
  }, [setStateToken, setUserInfoStatus])

  const isLogin = useMemo(() => {
    return !!token
  }, [token])

  return {
    login,
    getInfo,
    logout,
    isLogin,
    userInfoStatus,
  }
}
