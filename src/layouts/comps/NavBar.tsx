import { useCallback, useMemo } from 'react'
import './NavBar.less'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import LangSelect from '@/components/LangSelect'
import FullScreen from '@/components/Fullscreen'
import { useResponsive } from 'ahooks'

export default function NavBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  const responsive = useResponsive()
  const isWide = useMemo(() => {
    return responsive.XL
  }, [responsive])

  const menu = (
    <Menu
      items={[
        { key: 'profile', label: '个人资料', icon: <UserOutlined /> },
        { type: 'divider' },
        { key: 'logout', label: '退出登录', icon: <LogoutOutlined />, onClick: handleLogout },
      ]}
    ></Menu>
  )

  return (
    <div className="basic-layout-header">
      {isWide ? (
        <>
          <FullScreen />
          <Divider type="vertical" className="divider" />
        </>
      ) : null}

      <LangSelect />
      <Divider type="vertical" />
      <Dropdown overlay={menu} className="user-info">
        <Avatar src="https://joeschmoe.io/api/v1/random" className="user-avatar" />
      </Dropdown>
    </div>
  )
}
