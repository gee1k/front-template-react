import { createHashRouter } from 'react-router-dom'
import { LazyExoticComponent, ReactNode, Suspense, lazy } from 'react'
import { AppRouteObject } from './typing'
import Login from '@/views/Login'
import SpinWithProgress from '@/components/SpinWithProgress'
import BasicLayout from '@/layouts/BasicLayout'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { AuthGuard } from './AuthGuard'

function lazyLoad(Comp: LazyExoticComponent<() => JSX.Element>, auth = false): ReactNode {
  return auth ? (
    <AuthGuard>
      <Suspense fallback={<SpinWithProgress />}>
        <Comp />
      </Suspense>
    </AuthGuard>
  ) : (
    <Suspense fallback={<SpinWithProgress />}>
      <Comp />
    </Suspense>
  )
}

export const menuBasePath = '/'
export const menuRoutes: AppRouteObject[] = [
  {
    index: true,
    element: lazyLoad(lazy(() => import('@/views/Home'))),
    meta: { title: 'route.home', icon: <HomeRoundedIcon /> },
  },
  {
    path: 'dashboard',
    element: lazyLoad(lazy(() => import('@/views/About'))),
    meta: { title: 'route.dashboard', icon: <HomeRoundedIcon /> },
  },
  {
    path: 'menu',
    element: lazyLoad(lazy(() => import('@/views/About'))),
    meta: { title: 'route.dataManagement', icon: <HomeRoundedIcon /> },
    children: [
      {
        path: 'sub',
        element: lazyLoad(lazy(() => import('@/views/About'))),
        meta: { title: 'route.user', icon: <HomeRoundedIcon /> },
      },
      {
        path: 'sub1',
        element: lazyLoad(lazy(() => import('@/views/About'))),
        meta: { title: 'route.role', icon: <HomeRoundedIcon /> },
      },
    ] as AppRouteObject[],
  },
]

export const routes: AppRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: menuBasePath,
    element: (
      <AuthGuard>
        <BasicLayout />
      </AuthGuard>
    ),
    children: menuRoutes,
  },
]

export const router = createHashRouter(routes)
