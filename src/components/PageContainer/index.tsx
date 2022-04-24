import styles from './index.module.less'
import { matchRoutes, useLocation } from 'react-router-dom'
import { RouteProps, routes } from '@/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, PageHeaderProps } from 'antd'
import { useRecoilValue } from 'recoil'
import { settingsState } from '@/store/app'

type IPageContainerProps = PageHeaderProps & {
  children: JSX.Element
  wrapperClassName?: string
  showHeader?: boolean
}

export function PageContainer({ children, wrapperClassName, showHeader = true, ...rest }: IPageContainerProps) {
  const appSettings = useRecoilValue(settingsState)
  const location = useLocation()
  const { t } = useTranslation()

  const title = useMemo(() => {
    const matchList = matchRoutes(routes, location.pathname)
    if (matchList) {
      const route = matchList[matchList.length - 1].route as RouteProps
      return route.meta?.title ? t(`route.${route.meta.title}`) : ''
    }
    return ''
  }, [t, location.pathname])

  const breadcrumbRoutes = useMemo(() => {
    const matchList = matchRoutes(routes, location.pathname)
    if (matchList) {
      return matchList.map(({ pathname, route }) => {
        const { meta } = route as RouteProps
        return {
          breadcrumbName: meta?.title ? t(`route.${meta.title}`) : '',
          path: pathname,
        }
      })
    }
    return []
  }, [location.pathname, t])

  const pageHeaderProps: PageHeaderProps = {
    title,
    ...rest,
  }
  pageHeaderProps.breadcrumb = appSettings.breadcrumb
    ? {
        routes: breadcrumbRoutes,
        ...pageHeaderProps.breadcrumb,
      }
    : undefined

  return (
    <div className={`${styles.pageContainerWrapper} ${wrapperClassName}`}>
      {showHeader && <PageHeader className="page-container-header" {...pageHeaderProps} />}
      <div className="page-container-content">{children}</div>
    </div>
  )
}
