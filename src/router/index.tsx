import React, { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import Error404 from '@/views/Error/Error404'
import Login from '@/views/Login'
import BasicLayout from '@/layouts/BasicLayout'
import { RouterAuth } from '@/router/config'
import { HomeOutlined } from '@ant-design/icons'
import SpinWithProgress from '@/components/SpinWithProgress'

function lazyLoad(Comp: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode {
  return (
    <Suspense fallback={<SpinWithProgress />}>
      <Comp />
    </Suspense>
  )
}

export interface RouteProps extends RouteObject {
  meta?: {
    auth?: boolean
    title?: string
    icon?: JSX.Element
  }
  hidden?: boolean
  children?: RouteProps[]
}

export const routes: RouteProps[] = [
  {
    path: '/login',
    element: <Login />,
    hidden: true,
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: lazyLoad(React.lazy(() => import('@/views/Home'))),
        meta: { title: 'home', auth: true, icon: <HomeOutlined /> },
      },
    ],
  },
  {
    path: '/test',
    element: <BasicLayout />,
    meta: { title: 'home', auth: true, icon: <HomeOutlined /> },
    children: [
      {
        index: true,
        element: lazyLoad(React.lazy(() => import('@/views/Home'))),
        meta: { title: 'home', auth: true, icon: <HomeOutlined /> },
      },
      {
        path: 'dfada',
        element: lazyLoad(React.lazy(() => import('@/views/Home'))),
        meta: { title: 'home', auth: true, icon: <HomeOutlined /> },
      },
    ],
  },
  {
    path: '*',
    hidden: true,
    element: <Error404 />,
  },
]

export default function AppRouterRoot() {
  const element = useRoutes(routes)
  return <RouterAuth>{element}</RouterAuth>
}
