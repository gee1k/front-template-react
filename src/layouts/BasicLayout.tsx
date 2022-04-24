import './BasicLayout.less'
import { Drawer, Layout } from 'antd'
import { matchRoutes, Outlet, useLocation } from 'react-router-dom'
import { NavMenu } from '@/layouts/comps/NavMenu'
import { RouteProps, routes } from '@/router'
import NavBar from '@/layouts/comps/NavBar'
import { useRecoilState } from 'recoil'
import { settingsState } from '@/store/app'
import { useMedia, useTitle } from 'react-use'
import { useEffect } from 'react'
import { BREAKPOINT_WIDTH } from '@/constants/Media'
import logoImg from '@/assets/logo.svg'
import { useTranslation } from 'react-i18next'

export default function BasicLayout() {
  const [appSettings, setAppSettings] = useRecoilState(settingsState)
  const { t } = useTranslation()

  const location = useLocation()
  const matchList = matchRoutes(routes, location) || []

  const getRouteI18n = (key?: string) => {
    if (!key) return ''
    return t(`route.${key}`)
  }

  let title = appSettings.title
  if (matchList.length) {
    const route = matchList[matchList.length - 1].route
    const subTitle = (route as RouteProps).meta?.title
    if (subTitle) {
      title = `${getRouteI18n(subTitle)} - ${title}`
    }
  }
  useTitle(title)

  const isWide = useMedia(`(min-width: ${BREAKPOINT_WIDTH.XS}px)`)
  useEffect(() => {
    setAppSettings((prev) => ({ ...prev, collapsed: !isWide }))
  }, [isWide, setAppSettings])

  const onCloseDrawer = () => {
    setAppSettings({ ...appSettings, collapsed: true })
  }

  const sidebar = (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={isWide ? appSettings.collapsed : false}
      className="basic-layout-sider"
    >
      <div className="logo">
        <img src={logoImg} alt="" className="logo-img" />
        {appSettings.collapsed ? null : <span className="logo-text">{appSettings.title}</span>}
      </div>
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
          <Outlet />
        </Layout.Content>
        {appSettings.footer ? (
          <Layout.Footer className="basic-layout-footer">{appSettings.copyright}</Layout.Footer>
        ) : null}
      </Layout>
    </Layout>
  )
}
