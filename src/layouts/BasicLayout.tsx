import './BasicLayout.less'
import { Breadcrumb, Drawer, Layout } from 'antd'
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom'
import { NavMenu } from '@/layouts/comps/NavMenu'
import { RouteProps, routes } from '@/router'
import settings from '@/settings'
import NavBar from '@/layouts/comps/NavBar'
import { useRecoilState } from 'recoil'
import { settingsState } from '@/store/app'
import { useMedia } from 'react-use'
import { useEffect } from 'react'
import { BREAKPOINT_WIDTH } from '@/constants/Media'

export default function BasicLayout() {
  const [appSettings, setAppSettings] = useRecoilState(settingsState)

  const location = useLocation()
  const matchList = matchRoutes(routes, location) || []
  const isHome = matchList[matchList.length - 1].pathname === '/'

  const onCloseDrawer = () => {
    setAppSettings({ ...appSettings, collapsed: true })
  }

  const isWide = useMedia(`(min-width: ${BREAKPOINT_WIDTH.XS})`)
  useEffect(() => {
    setAppSettings((prev) => ({ ...prev, collapsed: !isWide }))
  }, [isWide, setAppSettings])

  const sidebar = (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={isWide ? appSettings.collapsed : false}
      className="basic-layout-sider"
    >
      <div className="logo" />
      <NavMenu />
    </Layout.Sider>
  )

  return (
    <Layout className="basic-layout-container">
      {isWide ? (
        sidebar
      ) : (
        <Drawer
          visible={!appSettings.collapsed}
          onClose={onCloseDrawer}
          placement="left"
          closable={false}
          bodyStyle={{ padding: 0, display: 'flex' }}
          contentWrapperStyle={{ width: 'initial' }}
        >
          {sidebar}
        </Drawer>
      )}

      <Layout className="basic-layout">
        <NavBar />
        <Layout.Content className="basic-layout-content-wrapper">
          {!settings.breadcrumb || isHome ? null : (
            <Breadcrumb className="basic-layout-breadcrumb">
              <Breadcrumb.Item>
                <Link to="/">首页</Link>
              </Breadcrumb.Item>
              {matchList.map((t) => {
                return <Breadcrumb.Item key={t.pathname}>{(t.route as RouteProps).meta?.title}</Breadcrumb.Item>
              })}
            </Breadcrumb>
          )}
          <div className="basic-layout-content">
            <Outlet />
          </div>
        </Layout.Content>
        {settings.footer ? <Layout.Footer className="basic-layout-footer">{settings.copyright}</Layout.Footer> : null}
      </Layout>
    </Layout>
  )
}
