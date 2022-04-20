import { useAuth } from '@/hooks/auth'
import { memo, useEffect } from 'react'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'
import { RouteProps, routes } from '@/router'
import { UserInfoStatus } from '@/store/user'
import SpinWithProgress from '@/components/SpinWithProgress'

const RouterLoader = memo(({ children }: { children: JSX.Element | null }) => {
  const location = useLocation()

  const { getInfo, userInfoStatus } = useAuth()

  useEffect(() => {
    const loadUserInfoFunc = async () => {
      if (userInfoStatus === UserInfoStatus.Unloaded) {
        await getInfo()
      }
    }
    loadUserInfoFunc()
  }, [userInfoStatus, getInfo])

  switch (userInfoStatus) {
    case UserInfoStatus.Error:
      return <Navigate to="/login" state={{ from: location.pathname }} replace />
    case UserInfoStatus.Unloaded:
      return <SpinWithProgress />
    default:
      return <>{children}</>
  }
})
RouterLoader.displayName = 'RouterLoader'

export const RouterAuth = memo(({ children }: { children: JSX.Element | null }) => {
  const { isLogin } = useAuth()
  const location = useLocation()
  // 匹配当前层级路由树
  const matchList = matchRoutes(routes, location)

  const isNeedLogin = matchList?.some((item) => {
    const route: RouteProps = item.route
    return route.meta?.auth
  })

  if (!isNeedLogin) {
    return <>{children}</>
  }

  if (!isLogin) {
    console.log('需要登录,或者获取用户信息失败')
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <RouterLoader>{children}</RouterLoader>
})
RouterAuth.displayName = 'RouterAuth'
