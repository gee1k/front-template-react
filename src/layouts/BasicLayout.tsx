import './BasicLayout.less'
import { Breadcrumb, Layout } from 'antd'
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom'
import { NavMenu } from '@/layouts/comps/NavMenu'
import { RouteProps, routes } from '@/router'
import settings from '@/settings'
import NavBar from '@/layouts/comps/NavBar'
import { useRecoilValue } from 'recoil'
import { settingsState } from '@/store/app'

export default function BasicLayout() {
  const appSettings = useRecoilValue(settingsState)

  const location = useLocation()
  const matchList = matchRoutes(routes, location) || []
  const isHome = matchList[matchList.length - 1].pathname === '/'

  return (
    <Layout className="basic-layout-container">
      <Layout.Sider trigger={null} collapsible collapsed={appSettings.collapsed}>
        <div className="logo" />
        <NavMenu />
      </Layout.Sider>
      <Layout className="basic-layout">
        <NavBar />
        <Layout.Content className="basic-layout-content-wrapper">
          {isHome ? null : (
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
