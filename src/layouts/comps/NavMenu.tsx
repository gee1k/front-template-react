import { Menu } from 'antd'
import { RouteProps, routes } from '@/router'
import { Link, matchRoutes, RouteMatch, useLocation } from 'react-router-dom'
import { memo, useEffect, useRef, useState } from 'react'
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

  const menuRoutes = normalizeRoutes(routes)

  return (
    <Menu
      className="nav-menu"
      mode="inline"
      theme="dark"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
    >
      {menuRoutes.map((route) => (
        <NavMenuItem key={route.path} route={route} />
      ))}
    </Menu>
  )
})
NavMenu.displayName = 'NavMenu'

const NavMenuItem = memo(({ route, parentPath }: { route: RouteProps; parentPath?: string }) => {
  const appSettings = useRecoilValue(settingsState)
  const { t } = useTranslation()

  const key = genKey(route, parentPath)
  const path = genPath(route, parentPath)

  const title = route.meta?.title ? t(`route.${route.meta.title}`) : ''

  const children = normalizeRoutes(route.children)

  const hasChildren = children.length > (appSettings.flatMenu ? 1 : 0)
  if (hasChildren) {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Menu.SubMenu eventKey={key} title={title} icon={route.meta?.icon}>
        {children.map((child) => (
          <NavMenuItem key={path + child.path} route={child} parentPath={path} />
        ))}
      </Menu.SubMenu>
    )
  } else if (appSettings.flatMenu && children.length === 1) {
    return <NavMenuItem route={children[0]} parentPath={path} />
  } else {
    return (
      <Menu.Item eventKey={key} icon={route.meta?.icon}>
        <Link to={path}>{title}</Link>
      </Menu.Item>
    )
  }
})
NavMenuItem.displayName = 'NavMenuItem'
