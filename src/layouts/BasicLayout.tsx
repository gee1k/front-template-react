import './BasicLayout.less'
import ProLayout, { MenuDataItem, ProSettings, SettingDrawer } from '@ant-design/pro-layout'
import { ReactDOM, useCallback, useMemo, useState } from 'react'
import { RouteProps, routes } from '@/router'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Route } from '@ant-design/pro-layout/lib/typings'
import NavBar from '@/layouts/comps/NavBar'
import defaultSettings from '@/defaultSettings'

const flatMenu = true

function genPath(route: RouteProps, parentPath?: string): string {
  return [parentPath, route.index ? '' : route.path].join('/').replaceAll('//', '/')
}

function normalizeRoutes(routes?: RouteProps[]): RouteProps[] {
  return routes?.filter((route) => !route.hidden) || []
}

export default function BasicLayout() {
  const { t } = useTranslation()
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(defaultSettings)

  const location = useLocation()
  const navigate = useNavigate()

  const convertMenuItems = useCallback(
    (routes: RouteProps[], parentPath?: string): Route[] => {
      return routes.map((route) => {
        const pathname = genPath(route, parentPath)

        const title = route.meta?.title ? t(`route.${route.meta.title}`) : ''

        const children = normalizeRoutes(route.children)
        const hasChildren = children.length > (flatMenu ? 1 : 0)
        if (hasChildren) {
          return {
            path: pathname,
            name: title,
            icon: route.meta?.icon,
            routes: convertMenuItems(children, pathname),
          }
        } else if (children.length === 1) {
          const child = children[0]
          const childPathname = genPath(child, pathname)
          const title = child.meta?.title ? t(`route.${child.meta.title}`) : ''

          return {
            path: childPathname,
            name: title,
            icon: child.meta?.icon,
          }
        } else {
          return {
            path: pathname,
            name: title,
            icon: route.meta?.icon,
          }
        }
      })
    },
    [t],
  )

  const menuItems = useMemo(() => {
    return convertMenuItems(normalizeRoutes(routes))
  }, [convertMenuItems])

  return (
    <div className="basic-layout-container">
      <ProLayout
        route={{
          path: '/',
          routes: menuItems,
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item: MenuDataItem & { isUrl: boolean; onClick?: () => void }, dom: ReactDOM) => (
          <a
            onClick={() => {
              navigate(item.path || '/')
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => <NavBar></NavBar>}
        logo={false}
        title={defaultSettings.title}
        {...settings}
      >
        <Outlet />
      </ProLayout>
      <SettingDrawer
        pathname={location.pathname}
        enableDarkTheme
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting)
        }}
        disableUrlParams={false}
      />
    </div>
  )
}
