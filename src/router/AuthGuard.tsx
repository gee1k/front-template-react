import SpinWithProgress from '@/components/SpinWithProgress'
import { useUserStore } from '@/store/user'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation()

  const token = useUserStore((state) => state.token)
  const user = useUserStore((state) => state.user)
  const getInfo = useUserStore((state) => state.getInfo)

  useEffect(() => {
    if (!user && token) {
      getInfo()
    }
  }, [token, user, getInfo])

  // 判断用户是否有权限
  if (!token) {
    // 如果没有授权，则跳转到登录页面
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // 如果没有用户信息，则需要获取用户信息
  if (!user) {
    return <SpinWithProgress />
  }

  // 如果已经授权，则直接渲染子组件
  return <>{children}</>
}
