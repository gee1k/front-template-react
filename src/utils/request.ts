import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/auth'
import { useMatch } from 'react-router-dom'
import { message, Modal } from 'antd'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
})
// request interceptor
instance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = getToken() || ''
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const data = response.data
    if (!data.code || data.code < 200 || data.code >= 400) {
      return Promise.reject({ message: data.message, code: data.code })
    }
    return data
  },
  (error) => {
    const response = error.response

    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401: // token失效
      case 403: {
        // 没有权限
        const match = useMatch({ path: '/login', end: true })
        if (match) {
          Modal.confirm({
            className: 'transparent-modal',
            title: '没有权限',
            content: '登录信息已过期，是否重新登录？',
            onOk() {
              // await store.dispatch('user/logout')
              // await router.push('/login')
            },
          })
        }
        return Promise.reject({ message: '没有权限' })
      }
      case 500:
        if (response?.data?.detail) {
          return Promise.reject({ message: response?.data?.detail })
        }
        // 服务端错误
        break
      case 503:
        // 服务端错误
        break
      default:
        break
    }
    return Promise.reject(response?.data || { message: error.message })
  },
)

interface BaseResponse<T> {
  code: number
  data: T
  message?: string
}

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance
      .request<T, BaseResponse<T>, T>(config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((reason: Error) => {
        console.log(reason)
        message.error(reason.message || '系统错误')
        reject(reason)
      })
  })
}

export default request
