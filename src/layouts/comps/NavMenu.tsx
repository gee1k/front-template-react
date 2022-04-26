import { Menu, MenuProps } from 'antd'
import { RouteProps, routes } from '@/router'
import { Link, matchRoutes, RouteMatch, useLocation } from 'react-router-dom'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { settingsState } from '@/store/app'

const INDEX_ROUTE_KEY = 'index'

function genKey(route: RouteProps, parentPath?: string): string {
  return [parentPath, route.index ? INDEX_ROUTE_KEY : route.path].join('/').replaceAll('//', '/')
}

function genPath(route: RouteProps, parentPath?: string): string {
  return [parentPath, route.index ? '' : route.path].join('/').replaceAll('//', '/')
}

function getSelectedKey(matchList: RouteMatch[]): string[] {
  const lastMatch = matchList[matchList.length - 1]
  const key = (lastMatch.route as RouteProps).index ? `${lastMatch.pathname}${INDEX_ROUTE_KEY}` : lastMatch.pathname

  return [key]
}

function normalizeRoutes(routes?: RouteProps[]): RouteProps[] {
  return routes?.filter((route) => !route.hidden) || []
}

export const NavMenu = memo(() => {
  const { t } = useTranslation()
  const appSettings = useRecoilValue(settingsState)

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectKeys] = useState<string[]>([])
  const isMount = useRef(true)

  const location = useLocation()
  useEffect(() => {
    const matchList = matchRoutes(routes, location)
    if (matchList) {
      if (isMount.current) {
        const pathnameList = matchList.map((item) => item.pathname)
        const keys = pathnameList.slice(0, -1)
        setOpenKeys(keys)
      }

      setSelectKeys(getSelectedKey(matchList))
    }

    isMount.current = false
  }, [location])

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  const convertMenuItems = useCallback(
    (routes: RouteProps[], parentPath?: string): MenuProps['items'] => {
      return routes.map((route) => {
        const key = genKey(route, parentPath)
        const pathname = genPath(route, parentPath)

        const title = route.meta?.title ? t(`route.${route.meta.title}`) : ''

        const children = normalizeRoutes(route.children)
        const hasChildren = children.length > (appSettings.flatMenu ? 1 : 0)
        if (hasChildren) {
          return {
            key,
            label: title,
            icon: route.meta?.icon,
            children: convertMenuItems(children, pathname),
          }
        } else if (children.length === 1) {
          const child = children[0]
          const childKey = genKey(child, pathname)
          const childPathname = genPath(child, pathname)
          const title = child.meta?.title ? t(`route.${child.meta.title}`) : ''

          return {
            key: childKey,
            label: <Link to={childPathname}>{title}</Link>,
            icon: child.meta?.icon,
          }
        } else {
          return {
            key,
            label: <Link to={pathname}>{title}</Link>,
            icon: route.meta?.icon,
          }
        }
      })
    },
    [appSettings.flatMenu, t],
  )

  const menuItems = useMemo(() => {
    return convertMenuItems(normalizeRoutes(routes))
  }, [convertMenuItems])

  return (
    <Menu
      className="nav-menu"
      mode="inline"
      theme="dark"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      inlineIndent={16}
      items={menuItems}
    ></Menu>
  )
})
NavMenu.displayName = 'NavMenu'
