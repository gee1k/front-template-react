import { memo, useEffect } from 'react'
import { matchRoutes, Navigate, useLocation } from 'react-router-dom'
import { AppRouteProps } from './typing'
import { useUserStore } from '@/store/user'
import SpinWithProgress from '@/components/SpinWithProgress'
import { routes } from './config'

const RouterLoader = memo(({ children }: { children: JSX.Element | null }) => {
  const location = useLocation()
  const token = useUserStore((state) => state.token)
  const user = useUserStore((state) => state.user)

  const getInfo = useUserStore((state) => state.getInfo)

  useEffect(() => {
    const loadUserInfoFunc = async () => {
      if (token && !user) {
        await getInfo()
      }
    }
    loadUserInfoFunc()
  }, [token, user, getInfo])

  return token ? (
    user ? (
      <>{children}</>
    ) : (
      <SpinWithProgress />
    )
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  )
})
RouterLoader.displayName = 'RouterLoader'

export const AuthGuard = memo(({ children }: { children: JSX.Element | null }) => {
  const token = useUserStore((state) => state.token)
  const location = useLocation()
  // 匹配当前层级路由树
  const matchList = matchRoutes(routes, location)

  const isNeedLogin = matchList?.some((item) => {
    const route: AppRouteProps = item.route
    return route.meta?.auth
  })

  if (!isNeedLogin) {
    return <>{children}</>
  }

  if (!token) {
    console.log('需要登录,或者获取用户信息失败')
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <RouterLoader>{children}</RouterLoader>
})
AuthGuard.displayName = 'RouterAuth'
