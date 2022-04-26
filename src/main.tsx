import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.less'
import './i18n'
import { RecoilRoot } from 'recoil'

import { configResponsive } from 'ahooks'
import { BREAKPOINT_WIDTH } from './constants/Media'

configResponsive(BREAKPOINT_WIDTH)

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
