import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

export default function ProgressBar() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])

  return <></>
}
