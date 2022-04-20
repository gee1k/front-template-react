import './index.less'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  let from = '/'
  if (location.state) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from = (location.state as any).from
  }

  const onFinish = async (values: ApiUser.LoginPayload) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await login(values)
      setLoading(false)
      navigate(from)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2 className="login-title">{t('login.title')}</h2>
        <Form
          name="normal_login"
          className="login-form"
          size="large"
          initialValues={{ username: '', password: '' }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: t('login.errors.requiredUsername') }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('login.labels.username')} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: t('login.errors.requiredPassword') }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('login.labels.password')}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              {t('login.action')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
