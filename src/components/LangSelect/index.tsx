import { Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { languageState } from '@/store/app'
import './index.less'

export default function LangSelect() {
  const [language, setLanguage] = useRecoilState(languageState)

  const onClick = ({ key }: { key: string }) => {
    setLanguage(key)
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="zh" disabled={language === 'zh'}>
        <span>中文</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="en" disabled={language === 'en'}>
        <span>English</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <TranslationOutlined className="lang-select-btn" />
    </Dropdown>
  )
}
