import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

export type AppRouteProps = {
  meta?: {
    title?: string
    icon?: JSX.Element
  }
  hidden?: boolean
}

type IndexAppRouteObject = IndexRouteObject & AppRouteProps

type NonIndexAppRouteObject = NonIndexRouteObject &
  AppRouteProps & {
    children?: AppRouteObject[]
  }

export type AppRouteObject = IndexAppRouteObject | NonIndexAppRouteObject
