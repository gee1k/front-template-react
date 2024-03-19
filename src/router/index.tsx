import { useRoutes } from 'react-router'
import { AuthGuard } from './AuthGuard'
import { routes } from './config'

export default function AppRouterRoot() {
  const element = useRoutes(routes)
  return <AuthGuard>{element}</AuthGuard>
}
