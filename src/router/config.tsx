import { useAuth } from '@/hooks/auth'
import { FC, useCallback, useEffect, useState } from 'react'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'
import { routes, RouteProps } from '@/router'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/store/user'
import { getInfo } from '@/api/auth'
import ProgressBar from '@/components/ProgressBar'

const RouterLoader: FC = ({ children }) => {
  const location = useLocation()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [userInfoError, setUserInfoError] = useState(false)

  const loadUserInfoFunc = useCallback(async () => {
    if (!userInfo) {
      try {
        const res = await getInfo()
        setUserInfo(res)
      } catch {
        setUserInfoError(true)
      }
    }
  }, [userInfo, setUserInfoError, setUserInfo])

  useEffect(() => {
    loadUserInfoFunc()
  }, [loadUserInfoFunc])

  if (userInfoError) {
    // 跳转到登录  state保存源路由
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (!userInfo) {
    return <ProgressBar />
    // return (
    //   <Spin
    //     tip="Loading..."
    //     size="large"
    //     wrapperClassName="app-container"
    //     style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    //   ></Spin>
    // )
  } else {
    return <>{children}</>
  }
}

export const RouterAuth: FC = ({ children }) => {
  const { isLogin } = useAuth()
  const location = useLocation()
  // 匹配当前层级路由树
  const mathchs = matchRoutes(routes, location)

  // 建议打个断点这里调一下，matchs是返回的层级路由
  // 第一个元素为根路由 最后一个元素为当前路由
  // 所以我们从前往后匹配
  const isNeedLogin = mathchs?.some((item) => {
    const route: RouteProps = item.route

    // 没有配置字段的直接返回
    if (!route.meta) return false
    // 返回是否需要登录
    return route.meta.auth
  })

  if (!isNeedLogin) {
    return <>{children}</>
  }

  if (!isLogin) {
    console.log('需要登录,或者获取用户信息失败')
    // 跳转到登录  state保存源路由
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <RouterLoader>{children}</RouterLoader>
}
