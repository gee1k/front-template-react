import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { Spin } from 'antd'

export default function SpinWithProgress() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])

  return (
    <Spin
      tip="Loading..."
      size="large"
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    ></Spin>
  )
}
