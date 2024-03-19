import type { RouteObject } from 'react-router'

export type AppRouteProps = RouteObject & {
  children?: AppRouteProps[]
  meta?: {
    auth?: boolean
    title?: string
    icon?: JSX.Element
  }
  hidden?: boolean
}
