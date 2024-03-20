import { menuBasePath, menuRoutes } from '.'
import { AppRouteObject } from './typing'

export type AppMenuRouteObject = AppRouteObject & {
  fullPath: string
  children?: AppMenuRouteObject[]
}

function normalizeMenuRoutes(routes: AppRouteObject[], parentPath = menuBasePath) {
  const result: AppMenuRouteObject[] = []

  for (const route of routes) {
    const path = [parentPath, route.index ? '' : route.path].join('/').replace(/\/+/g, '/')

    const item = {
      ...route,
      fullPath: path,
    } as AppMenuRouteObject

    if (route.children) {
      item.children = normalizeMenuRoutes(route.children, path)
    }

    result.push(item)
  }

  return result
}

export default function useMenu() {
  return {
    menuRoutes: normalizeMenuRoutes(menuRoutes),
  }
}
