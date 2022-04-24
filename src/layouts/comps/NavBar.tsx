import React, { useCallback } from 'react'
import './NavBar.less'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd'
import { useRecoilState } from 'recoil'
import { settingsState } from '@/store/app'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth'
import LangSelect from '@/components/LangSelect'
import FullScreen from '@/components/Fullscreen'
import { useMedia } from 'react-use'
import { BREAKPOINT_WIDTH } from '@/constants/Media'

export default function NavBar() {
  const [settings, setSettings] = useRecoilState(settingsState)

  const navigate = useNavigate()
  const { logout } = useAuth()

  const toggleCollapsed = () => {
    setSettings((pre) => {
      return {
        ...pre,
        collapsed: !pre.collapsed,
      }
    })
  }

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  const isWide = useMedia(`(min-width: ${BREAKPOINT_WIDTH.XS}px)`)

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <span>个人资料</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <span onClick={handleLogout}>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header className="basic-layout-header">
      {React.createElement(settings.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'collapsed-trigger-btn',
        onClick: toggleCollapsed,
      })}

      <div className="right-container">
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
    </Layout.Header>
  )
}
