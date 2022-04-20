import './App.css'
import { HashRouter } from 'react-router-dom'
import AppRouterRoot from '@/router'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.less'
import moment from 'moment'
import { useRecoilValue } from 'recoil'
import { languageState } from '@/store/app'
import { useEffect } from 'react'
import i18n from './i18n'
import { Locale } from 'antd/es/locale-provider'

import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import 'moment/dist/locale/zh-cn'
import 'moment/dist/locale/es-us'

const ANT_LOCALE: Record<string, Locale> = {
  zh: zhCN,
  en: enUS,
}

function App() {
  const language = useRecoilValue(languageState)
  useEffect(() => {
    i18n.changeLanguage(language)
    moment.locale(language)
  }, [language])

  return (
    <ConfigProvider locale={ANT_LOCALE[language]}>
      <HashRouter>
        <AppRouterRoot />
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
