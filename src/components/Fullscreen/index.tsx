import { useState, useEffect } from 'react'
import screenFull from 'screenfull'
import { message, Tooltip } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import './index.less'
import { useTranslation } from 'react-i18next'

const click = () => {
  if (!screenFull.isEnabled) {
    message.warning('you browser can not work')
    return false
  }
  screenFull.toggle()
}

export default function FullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { t } = useTranslation()

  const change = () => {
    setIsFullscreen(screenFull.isFullscreen)
  }

  useEffect(() => {
    screenFull.isEnabled && screenFull.on('change', change)
    return () => {
      screenFull.isEnabled && screenFull.off('change', change)
    }
  }, [])

  const title = isFullscreen ? t('nav.exitFullscreen') : t('nav.fullscreen')
  return (
    <div className="fullScreen-container">
      <Tooltip placement="bottom" title={title}>
        {isFullscreen ? <FullscreenExitOutlined onClick={click} /> : <FullscreenOutlined onClick={click} />}
      </Tooltip>
    </div>
  )
}
