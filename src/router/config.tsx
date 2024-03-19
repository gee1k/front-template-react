import React, { Suspense } from 'react'
import { AppRouteProps } from './typing'
import Login from '@/views/Login'
import SpinWithProgress from '@/components/SpinWithProgress'

function lazyLoad(Comp: React.LazyExoticComponent<() => JSX.Element>): React.ReactNode {
  return (
    <Suspense fallback={<SpinWithProgress />}>
      <Comp />
    </Suspense>
  )
}

export const routes: AppRouteProps[] = [
  {
    path: '/login',
    element: <Login />,
    hidden: true,
  },
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/views/Home'))),
    meta: {
      auth: true,
    },
  },
]
